import { Image, StyleSheet, Platform, TouchableOpacity } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { Text } from "react-native";
import { Button } from "react-native";
import { Link } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "@/components/PrimaryButton";
import Video from "react-native-video";

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-400">
      <Video
        source={require("@/assets/shadergradient.webm")} // Adjust the path to your video file
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        resizeMode="cover"
        repeat
        muted
      />

      <View className="flex-1 justify-end mx-3">
        <Text className="text-sm text-center mb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitati
        </Text>
        <PrimaryButton title="Login" onPress={() => {}} />
        <Link href="/register">
          <Button title="Register" onPress={() => {}} />
        </Link>
      </View>
    </SafeAreaView>
  );
}
