import { Image, StyleSheet, Platform } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome to Gay ass app</Text>
      </View>
      <Text>
        This is a blank project with a few example screens to help you get
        started.
      </Text>
      <HelloWave />
    </SafeAreaView>
  );
}
