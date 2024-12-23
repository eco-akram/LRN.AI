import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import SubmitButton from "@/components/SubmitButton";

export default function RegisterScreen() {
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = () => {};

  return (
    <LinearGradient
      colors={["transparent", "rgba(245,40,145, 1)", "rgba(50,50,50, 1)"]} // Define your gradient colors
      locations={[0.5, 0.6, 0.7]} // Adjust the locations to control the gradient spread
      style={styles.background}
    >
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 justify-center">
          <Image
            source={require("@/assets/images/Logo-icon.png")}
            style={styles.logo}
          />
        </View>

        <View className="flex-1 mx-3 justify-center">
          <View className="mb-5">
            <Text className="text-white text-center font-bold text-2xl">
              Create an account, it's free!
            </Text>
          </View>

          <FormField
            value={form.username}
            placeholder="Username"
            underText="Please enter your username"
            otherStyles="mb-4 mt-4"
            handleChangeText={(e) =>
              setform({
                ...form,
                username: e,
              })
            }
          />

          <FormField
            value={form.email}
            placeholder="Email"
            underText="Please enter your email"
            otherStyles="mb-4 mt-4"
            handleChangeText={(e) =>
              setform({
                ...form,
                email: e,
              })
            }
          />

          <FormField
            value={form.password}
            placeholder={"Password"}
            underText="Don't share your password with anyone else."
            handleChangeText={(e) =>
              setform({
                ...form,
                password: e,
              })
            }
            otherStyles="mb-4"
          />
        </View>

        <View className="flex-1 justify-end mx-3 mb-5">
          <SubmitButton
            title="Sign up to LERN.AI"
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <Text
            className="text-cyan-500 text-center font-semibold"
            onPress={() => router.replace("/login")}
          >
            Already have an account? Log in
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
  },
  logo: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
  },
});

//TODO: POLISH HERE, AND CHANGE THE GRADIENT, MAKE COLOURS EASYLI CHANGABLE
