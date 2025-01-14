import { Stack } from "expo-router";

export default function AdvancedLearnLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]" />
      <Stack.Screen name="studyCards" />
    </Stack>
  );
}
