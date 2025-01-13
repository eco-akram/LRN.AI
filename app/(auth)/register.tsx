import React, { useState } from "react";
import {  Image, Platform, View, Text, KeyboardAvoidingView, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import SubmitButton from "@/components/buttons/SubmitButton";
import { createUser } from "../../lib/appwrite";
import { Query, Databases } from "react-native-appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { appwriteConfig, databases } from "../../lib/appwrite";
import { BlurView } from 'expo-blur';



export default function RegisterScreen() {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isPasswordStrong = (password: string) => {
    // Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const isEmailUnique = async (email: string) => {
    try {
      const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("email", email)]
      );
      return result.documents.length === 0;
    } catch (error) {
      console.error("Error checking email uniqueness:", error);
      throw new Error("Failed to check email uniqueness.");
    }
  };

  const submit = async () => {
    setErrorMessage(null);

    // Validate form fields
    if (!form.username || !form.email || !form.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!isPasswordStrong(form.password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const emailAvailable = await isEmailUnique(form.email);
      if (!emailAvailable) {
        setErrorMessage("This email is already registered. Please use a different email.");
        return;
      }

      // If all validations pass, create the user
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      setErrorMessage("Error while creating user. Please try again.");
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
      <SafeAreaView className="flex-1">
        
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-end items-center">
            <Image
              source={require("@/assets/images/Logo-icon.png")}
              className="w-20 h-20 mb-12"
            />
          </View>

          <View className="flex-1 mx-4 justify-start">
            <Text className="text-white text-center font-bold text-2xl mb-6">
              Create an account, it's free!
            </Text>

            {errorMessage && (
              <View className="bg-red-200 border border-red-500 rounded-md p-4 mb-6">
                <Text className="text-red-700 font-semibold text-center">
                  {errorMessage}
                </Text>
              </View>
            )}

            <FormField
              value={form.username}
              placeholder="Username"
              underText="Please enter your username"
              otherStyles="mb-4 mt-4"
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  username: e,
                })
              }
            />

            <FormField
              value={form.email}
              placeholder="Email"
              underText="Please enter your email"
              otherStyles="mb-4"
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
              otherStyles="mb-4"
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  password: e,
                })
              }
            />
          </View>
        </ScrollView>

        <View className="mx-4 mb-5 mt-2">
          <SubmitButton
            title="Sign up to LRN.AI"
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <Text
            className="text-[#9d52ff] text-center font-semibold mt-3"
            onPress={() => router.replace("/login")}
          >
            Already have an account? Log in
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </View>
    </BlurView>
    </ImageBackground>
  
  );
}