import { StyleSheet, Image, Platform } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Decks() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text>Test text</Text>
      <Button title="Test button"></Button>
    </SafeAreaView>
  );
}
