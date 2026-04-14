import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>RealityScan</Text>
        <Text style={styles.subtitle}>
          Point your camera at any object to create a 3D model
        </Text>
      </View>

      {/* Info Cards */}
      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardIcon}>📸</Text>
          <Text style={styles.cardTitle}>Auto Capture</Text>
          <Text style={styles.cardText}>
            App captures 20 photos automatically
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardIcon}>⚙️</Text>
          <Text style={styles.cardTitle}>3D Processing</Text>
          <Text style={styles.cardText}>
            Backend converts photos to GLB model
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardIcon}>🔮</Text>
          <Text style={styles.cardTitle}>View in 3D</Text>
          <Text style={styles.cardText}>
            Rotate and inspect your 3D model
          </Text>
        </View>
      </View>

      {/* Tips */}
      <View style={styles.tipsBox}>
        <Text style={styles.tipsTitle}>Tips for best results</Text>
        <Text style={styles.tip}>✅ Move slowly around the object</Text>
        <Text style={styles.tip}>✅ Keep good lighting</Text>
        <Text style={styles.tip}>✅ Plain background works best</Text>
        <Text style={styles.tip}>✅ Cover all angles (top + sides)</Text>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Scanner")}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>▶  Start Scanning</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    padding: 24,
    justifyContent: "space-between",
  },
  header: { marginTop: 40, alignItems: "center", gap: 10 },
  title: { fontSize: 28, fontWeight: "700", color: "#fff" },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    lineHeight: 22,
  },
  cards: { flexDirection: "row", gap: 10 },
  card: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  cardIcon: { fontSize: 24 },
  cardTitle: { fontSize: 12, fontWeight: "600", color: "#fff" },
  cardText: { fontSize: 11, color: "#666", textAlign: "center" },
  tipsBox: {
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 18,
    gap: 8,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  tipsTitle: { color: "#4CAF50", fontWeight: "600", marginBottom: 4 },
  tip: { color: "#aaa", fontSize: 13 },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});

export default HomeScreen;