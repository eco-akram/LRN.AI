import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link, router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { StatusBar } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function WelcomeScreen() {
  const { isLoading, isLoggedIn } = useGlobalContext();

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
          <Link
            className="text-gray-300 font-light text-sm"
            href={
              "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcute-cat&psig=AOvVaw054OEy7zh1J_qx7iy4ygeO&ust=1734643699801000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCODUg7-hsooDFQAAAAAdAAAAABAE"
            }
          >
            Privacy policy
          </Link>
          <Text className="text-gray-300 font-light text-sm mx-3">|</Text>
          <Link
            className="text-gray-300 font-light text-sm"
            href={
              "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcute-cat&psig=AOvVaw054OEy7zh1J_qx7iy4ygeO&ust=1734643699801000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCODUg7-hsooDFQAAAAAdAAAAABAE"
            }
          >
            Terms of service
          </Link>
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
