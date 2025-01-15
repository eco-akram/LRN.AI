import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, View } from "react-native";
import "react-native-reanimated";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";

import "../global.css";
import GlobalProvider from "../context/GlobalProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ModalProvider } from "@/context/ModalContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("black");
  }, []);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Segoeui: require("../assets/fonts/segoeui.otf"),
    SegoeuiBold: require("../assets/fonts/segoeuiBold.otf"),
    SegoeuiBlack: require("../assets/fonts/segoeuiBlack.otf"),
    SegoeuiLight: require("../assets/fonts/segoeuiLight.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  NavigationBar.setPositionAsync("absolute");
  NavigationBar.setBackgroundColorAsync("#ffffff01");

  return (
    <GestureHandlerRootView>
      <GlobalProvider>
        <ModalProvider>
          <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
<Stack.Screen
  name="(learn)"
  options={{ headerShown: false, animation: "fade" }}
/>
<Stack.Screen
  name="(auth)"
  options={{ headerShown: false, animation: "fade" }}
/>
<Stack.Screen
  name="index"
  options={{ headerShown: false, animation: "fade" }}
/>
<Stack.Screen
  name="privacyPolicy"
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="termsOfService"
  options={{ headerShown: false }}
/>
<Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
        </ModalProvider>
      </GlobalProvider>
    </GestureHandlerRootView>
  );
}