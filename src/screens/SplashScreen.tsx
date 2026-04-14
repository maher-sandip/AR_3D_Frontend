import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Splash">;
};

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>⬡</Text>
      </View>
      <Text style={styles.title}>RealityScan</Text>
      <Text style={styles.subtitle}>3D Model Scanner</Text>
      <ActivityIndicator
        color="#4CAF50"
        size="small"
        style={{ marginTop: 40 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: { fontSize: 48, color: "#4CAF50" },
  title: { fontSize: 32, fontWeight: "700", color: "#fff" },
  subtitle: { fontSize: 16, color: "#888" },
});

export default SplashScreen;