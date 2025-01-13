import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";

export function HelloWave() {
  const rotationAnimation = useSharedValue(0);

  const startAnimation = () => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 750, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 750, easing: Easing.inOut(Easing.ease) }),
      ),
      5, // Run the animation 4 times
      false // Do not reverse the animation
    );
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <TouchableOpacity onPress={startAnimation}>
      <Animated.View style={animatedStyle}>
        <Text style={styles.text}>👋</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});