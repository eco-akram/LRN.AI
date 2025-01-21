import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import SubmitButton from "@/components/buttons/SubmitButton";
import { router } from "expo-router";

import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function LoginScreen() {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateInputs = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submit = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();

      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid credentials. Please try again.",
      }));
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
            underText={errors.email || "Please enter your email."}
            underTextStyle={[
              styles.underText,
              errors.email && styles.errorText,
            ]}
            otherStyles="mb-4 mt-4"
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
          />

          <FormField
            value={form.password}
            placeholder="Password"
            underText={errors.password || "Enter your password."}
            underTextStyle={[
              styles.underText,
              errors.password && styles.errorText,
            ]}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: "" }));
              }
            }}
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
  underText: {
    color: "#848484",
  },
  errorText: {
    color: "#f43f5e", // Red for errors
  },
});
