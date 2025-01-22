import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { StatusBar } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function WelcomeScreen() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  /*   useEffect(() => {
    async function loadAssets() {
      await Asset.loadAsync(require("@/assets/shadergradient.gif"));
      setIsAssetLoaded(true);
    }
    loadAssets();
  }, []); */

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Image
        contentFit="cover"
        source={require("@/assets/shadergradient.gif")}
        placeholder="U2QZJbV[00~qWBj@fQj@ozWBR5f6"
        style={styles.background}
      />
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center">
          <Image
            source={require("@/assets/images/Logo-top-p.png")}
            style={styles.logo}
          />
        </View>

        <View className="flex-1 justify-end mx-3">
          <Text className="text-sm text-center mb-8 text-gray-300 font-semibold text-pretty">
            Welcome to LRN.AI, your ultimate learning companion! Created by
            Akram and Lukas, our app uses AI to provide personalized learning
            experiences. Join our community and start your journey towards
            success today!
          </Text>
          <TouchableOpacity
            className="w-full rounded-xl flex justify-center items-center bg-white p-3 mb-3 mt-3"
            onPress={() => router.push("/login")}
          >
            <Text className="text-black">Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full rounded-xl flex justify-center items-center border border-white p-3 mb-4"
            onPress={() => router.push("/register")}
          >
            <Text className="text-white">Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center align-middle items-center mx-3 mb-3 mt-4">
          <TouchableOpacity
            hitSlop={20}
            onPress={() => router.replace("/privacyPolicy")}
          >
            <Text className="text-gray-300 font-light text-sm">
              Privacy policy
            </Text>
          </TouchableOpacity>
          <Text className="text-gray-300 font-light text-sm mx-3">|</Text>
          <TouchableOpacity
            hitSlop={20}
            onPress={() => router.replace("/privacyPolicy")}
          >
            <Text className="text-gray-300 font-light text-sm">
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  logo: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
  },
});
//TODO: POLISH HERE
