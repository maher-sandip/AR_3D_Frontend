import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  current: number;
  total: number;
  label?: string;
};

const ProgressBar: React.FC<Props> = ({ current, total, label }) => {
  const percent = Math.round((current / total) * 100);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.percent}>{percent}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center", gap: 6 },
  label: { color: "#fff", fontSize: 14, fontWeight: "500" },
  track: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  percent: { color: "#fff", fontSize: 12 },
});

export default ProgressBar;