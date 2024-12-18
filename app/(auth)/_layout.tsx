import { Stack } from "expo-router";
import React from "react";

//TODO: Delete this layout, and make the index main

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
    </Stack>
  );
}
