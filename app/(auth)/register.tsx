import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image,
  Text,
  Platform,
} from "react-native";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import SubmitButton from "@/components/buttons/SubmitButton";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateInputs = () => {
    const newErrors = { username: "", email: "", password: "" };
    let isValid = true;

    // Username validation
    if (!form.username) {
      newErrors.username = "Username is required.";
      isValid = false;
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
      isValid = false;
    }

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
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
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
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Failed to create user. Please try again.",
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
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 50,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/Logo-icon.png")}
              style={styles.logo}
            />
          </View>

          <View className="flex-1 mx-3 justify-items-start">
            <View className="mb-5">
              <Text className="text-white text-center font-bold text-2xl">
                Create an account, it's free!
              </Text>
            </View>

            <FormField
              value={form.username}
              placeholder="Username"
              underText={errors.username || "Please enter your username."}
              underTextStyle={[
                styles.underText,
                errors.username && styles.errorText,
              ]}
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
              underText={errors.email || "Please enter your email."}
              underTextStyle={[
                styles.underText,
                errors.username && styles.errorText,
              ]}
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
              underText={
                errors.password || "Don't share your password with anyone else."
              }
              underTextStyle={[
                styles.underText,
                errors.password && styles.errorText,
              ]}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  password: e,
                })
              }
              otherStyles="mb-4"
            />
          </View>
        </ScrollView>

        <View className="mx-3 mb-5 mt-2">
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
    color: "#f43f5e",
  },
});
