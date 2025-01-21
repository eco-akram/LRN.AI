import { Alert, Image, Platform, StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { router } from "expo-router";
import { useState } from "react";
import SubmitButton from "@/components/buttons/SubmitButton";
import { KeyboardAvoidingView } from "react-native";

import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function LoginScreen() {
  const { setUser, setIsLoggedIn, isLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();

      setUser(result);
      setIsLoggedIn(true);
      console.log("isLoggedIn:", isLoggedIn);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error while creating user, submit function", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/Logo-icon.png")}
            style={styles.logo}
          />
        </View>

        <View className="flex-1 mx-3 justify-center">
          <View className="mb-5">
            <Text className="text-white text-center font-bold text-2xl">
              Log in to your account
            </Text>
          </View>

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
            title="Continue"
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <Text
            className="text-cyan-500 text-center font-semibold"
            onPress={() => router.replace("/register")}
          >
            Create an account
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    flex: 1,
    //position: "absolute",
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 50,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

//TODO: POLISH HERE, AND CHANGE THE GRADIENT, MAKE COLOURS EASYLI CHANGABLE
