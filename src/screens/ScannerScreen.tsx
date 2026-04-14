import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { uploadFrames } from "../services/api";
import { CONFIG } from "../constants/config";

import CaptureGuide from "../components/CaptureGuide";
import ProgressBar from "../components/ProgressBar";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Scanner">;
};

type Status = "idle" | "scanning" | "processing" | "uploading" | "error";

const ScannerScreen: React.FC<Props> = ({ navigation }) => {
  const camera = useRef<Camera>(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");

  const [status, setStatus] = useState<Status>("idle");
  const [capturedCount, setCapturedCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const photosRef = useRef<string[]>([]);

  useEffect(() => {
    if (!hasPermission) requestPermission();
    return () => stopCapture();
  }, []);

  const stopCapture = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startScan = useCallback(async () => {
    if (!camera.current) return;

    setStatus("scanning");
    setCapturedCount(0);
    photosRef.current = [];

    intervalRef.current = setInterval(async () => {
      if (photosRef.current.length >= CONFIG.TOTAL_PHOTOS) {
        stopCapture();
        await processPhotos(photosRef.current);
        return;
      }

      try {
        const photo = await camera.current!.takePhoto({
          flash: "off",
        });
        photosRef.current.push(photo.path);
        setCapturedCount(photosRef.current.length);
      } catch (e) {
        console.warn("Capture error:", e);
      }
    }, CONFIG.CAPTURE_INTERVAL_MS);
  }, []);

  const processPhotos = async (photos: string[]) => {
    try {
      setStatus("processing");

      const result = await uploadFrames(photos, (percent) => {
        setStatus("uploading");
        setUploadProgress(percent);
      });

      if (result.success && result.glbUrl) {
        navigation.replace("Viewer", {
          glbUrl: result.glbUrl
        });
      } else {
        throw new Error("No GLB URL returned");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      Alert.alert(
        "Failed",
        "Could not create 3D model. Make sure backend is running.",
        [{ text: "Try Again", onPress: () => setStatus("idle") }]
      );
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.whiteText}>Camera permission needed</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#4CAF50" />
        <Text style={styles.whiteText}>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Camera */}
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={status === "idle" || status === "scanning"}
        photo={true}
      />

      {/* Dark overlay */}
      <View style={styles.overlay}>

        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              stopCapture();
              navigation.goBack();
            }}
            style={styles.backBtn}
          >
            <Text style={styles.backText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>
            {status === "idle" && "Ready to scan"}
            {status === "scanning" && `Capturing ${capturedCount} / ${CONFIG.TOTAL_PHOTOS}`}
            {status === "processing" && "Creating 3D model..."}
            {status === "uploading" && `Uploading ${uploadProgress}%`}
            {status === "error" && "Something went wrong"}
          </Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Center guide */}
        {(status === "idle" || status === "scanning") && (
          <View style={styles.center}>
            <CaptureGuide isCapturing={status === "scanning"} />
          </View>
        )}

        {/* Processing indicator */}
        {(status === "processing" || status === "uploading") && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.processingText}>
              {status === "processing"
                ? "Building 3D model from your photos..."
                : "Uploading to server..."}
            </Text>
          </View>
        )}

        {/* Bottom controls */}
        <View style={styles.bottomBar}>

          {/* Progress bar when scanning */}
          {status === "scanning" && (
            <ProgressBar
              current={capturedCount}
              total={CONFIG.TOTAL_PHOTOS}
              label="Auto capturing..."
            />
          )}

          {/* Upload progress */}
          {status === "uploading" && (
            <ProgressBar
              current={uploadProgress}
              total={100}
              label="Uploading frames..."
            />
          )}

          {/* Start button */}
          {status === "idle" && (
            <TouchableOpacity
              style={styles.scanBtn}
              onPress={startScan}
              activeOpacity={0.8}
            >
              <Text style={styles.scanBtnText}>▶  Start Scan</Text>
            </TouchableOpacity>
          )}

          {/* Stop button */}
          {status === "scanning" && (
            <TouchableOpacity
              style={[styles.scanBtn, styles.stopBtn]}
              onPress={() => {
                stopCapture();
                if (photosRef.current.length > 5) {
                  processPhotos(photosRef.current);
                } else {
                  setStatus("idle");
                }
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.scanBtnText}>⏹  Stop & Process</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  backText: { color: "#fff", fontSize: 16 },
  topTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  bottomBar: {
    padding: 30,
    gap: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  scanBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
  },
  stopBtn: { backgroundColor: "#f44336" },
  scanBtnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
  processingText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  whiteText: { color: "#fff", fontSize: 16, marginBottom: 16 },
  btn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontWeight: "600" },
});

export default ScannerScreen;