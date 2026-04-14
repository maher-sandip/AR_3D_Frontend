import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

type Props = {
  isCapturing: boolean;
};

const CaptureGuide: React.FC<Props> = ({ isCapturing }) => {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isCapturing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.08,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulse.stopAnimation();
      pulse.setValue(1);
    }
  }, [isCapturing]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.circle, { transform: [{ scale: pulse }] }]}
      />
      <Text style={styles.text}>
        {isCapturing
          ? "Move slowly around the object"
          : "Position object in center"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 12 },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderStyle: "dashed",
    backgroundColor: "rgba(76,175,80,0.05)",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
});

export default CaptureGuide;