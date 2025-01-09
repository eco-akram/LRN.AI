import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import { useState } from "react";
import SubmitButton from "@/components/buttons/SubmitButton";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";

import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function RegisterScreen() {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);

      //SOMETHING HERE LATER
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error while creating user, submit function");
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
  buttonContainer: {
    marginHorizontal: 12, // Equivalent to mx-3
    marginBottom: 20, // Equivalent to mb-5
    marginTop: 20, // Equivalent to mt-5
  },
  logoContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
