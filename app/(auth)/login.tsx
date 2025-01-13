import React, { useState } from "react";
import { Image, Platform, View, Text, KeyboardAvoidingView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import SubmitButton from "@/components/buttons/SubmitButton";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { BlurView } from 'expo-blur';

export default function LoginScreen() {
  const { setUser, setIsLoggedIn, isLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async () => {
    if (!form.email || !form.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null); // Clear previous error messages

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();

      setUser(result);
      setIsLoggedIn(true);
      console.log("isLoggedIn:", isLoggedIn);

      router.replace("/home");
    } catch (error) {
      setErrorMessage("Please check if you input the correct email and password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ImageBackground
            source={require('@/assets/images/background.png')}
            style={{ flex: 1 }}
            resizeMode="cover"
          >
          <BlurView intensity={50} style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
    <SafeAreaView className="flex-1 ">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 justify-end items-center">
          <Image
            source={require("@/assets/images/Logo-icon.png")}
            className="w-20 h-20 mb-12"
          />
        </View>

        <View className="flex-1 mx-4 justify-center">
          <Text className="text-white text-center font-bold text-2xl mb-6">
            Log in to your account
          </Text>

          {errorMessage && (
            <View className="bg-red-200 border border-red-500 rounded-md p-4 mb-6">
              <Text className="text-red-700 font-semibold text-center">
                {errorMessage}
              </Text>
            </View>
          )}

          <FormField
            value={form.email}
            placeholder="Email"
            underText="Please enter your email"
            otherStyles="mb-4 mt-4"
            handleChangeText={(e) =>
              setForm({
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
              setForm({
                ...form,
                password: e,
              })
            }
            otherStyles="mb-4"
          />
        </View>

        <View className="flex-1 justify-end mx-4 mb-5">
          <SubmitButton
            title="Continue"
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <Text
            className="text-[#9d52ff] text-center font-semibold mt-3"
            onPress={() => router.replace("/register")}
          >
            Create an account
          </Text>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </BlurView>
    </ImageBackground>
  );
}