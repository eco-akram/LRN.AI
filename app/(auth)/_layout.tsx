import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect, Stack } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import { enableScreens } from "react-native-screens";
enableScreens();

export default function AuthLayout() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ animation: "fade" }} />
        <Stack.Screen name="register" options={{ animation: "fade" }} />
      </Stack>
    </View>
  );
}
