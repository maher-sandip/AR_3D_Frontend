import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Viewer">;
  route: RouteProp<RootStackParamList, "Viewer">;
};

const ViewerScreen: React.FC<Props> = ({ navigation, route }) => {
  const { glbUrl } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.backBtn}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>3D Model Ready</Text>
        <View style={{ width: 70 }} />
      </View>

      {/* Success card */}
      <View style={styles.card}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={styles.successTitle}>Model Created!</Text>
        <Text style={styles.successSubtitle}>
          Your 3D GLB model has been generated successfully
        </Text>
      </View>

      {/* GLB URL box */}
      <View style={styles.urlBox}>
        <Text style={styles.urlLabel}>GLB File URL</Text>
        <Text style={styles.urlText} numberOfLines={3}>
          {glbUrl}
        </Text>
        <TouchableOpacity
          style={styles.openBtn}
          onPress={() => Linking.openURL(glbUrl)}
        >
          <Text style={styles.openBtnText}>Open GLB File</Text>
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>What's next?</Text>
        <Text style={styles.infoText}>
          ✅ GLB saved to your backend server{"\n"}
          ✅ Can be uploaded to Supabase{"\n"}
          ✅ View in any 3D viewer app{"\n"}
          ✅ Use in your restaurant AR menu
        </Text>
      </View>

      {/* Scan again */}
      <TouchableOpacity
        style={styles.scanAgainBtn}
        onPress={() => navigation.replace("Scanner")}
        activeOpacity={0.8}
      >
        <Text style={styles.scanAgainText}>🔄  Scan Another Object</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 24,
  },
  backBtn: { padding: 8 },
  backText: { color: "#4CAF50", fontSize: 15, fontWeight: "600" },
  title: { color: "#fff", fontSize: 18, fontWeight: "700" },
  card: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#4CAF50",
    marginBottom: 16,
  },
  successIcon: { fontSize: 48 },
  successTitle: { color: "#4CAF50", fontSize: 22, fontWeight: "700" },
  successSubtitle: { color: "#888", fontSize: 14, textAlign: "center" },
  urlBox: {
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 16,
  },
  urlLabel: { color: "#666", fontSize: 12 },
  urlText: { color: "#fff", fontSize: 13, lineHeight: 20 },
  openBtn: {
    backgroundColor: "#1a3a1a",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  openBtnText: { color: "#4CAF50", fontWeight: "600" },
  infoBox: {
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 24,
  },
  infoTitle: { color: "#fff", fontWeight: "600", marginBottom: 6 },
  infoText: { color: "#888", fontSize: 13, lineHeight: 24 },
  scanAgainBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
  },
  scanAgainText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});

export default ViewerScreen;