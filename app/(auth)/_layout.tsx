import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import { enableScreens } from "react-native-screens";
enableScreens();

//TODO: Delete this layout, and make the index main

export default function AuthLayout() {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ animation: "fade" }} />
        <Stack.Screen name="register" options={{ animation: "fade" }} />
      </Stack>
    </View>
  );
}
