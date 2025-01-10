/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import icons from "@/constants/icons";
import {
  getUserDecks,
  changeUserName,
  signOut,
  getCurrentUser,
} from "@/lib/appwrite";
import Modal from "react-native-modal";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import useAppwrite from "@/lib/useAppwrite";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import DangerButton from "@/components/buttons/DangerButton";
import FormInput from "@/components/buttons/FormInput";
import DeckListHome from "@/components/DeckListHome";

export default function Home() {
  const { user, setUser } = useGlobalContext();

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const { data: decks, refetch } = useAppwrite(() => getUserDecks(user.$id));
  const [refreshing, setRefreshing] = useState(false);
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching current user:", error);
        router.replace("/login"); // Navigate to the login screen if not authenticated
      }
    };

    checkUser();
  }, []);

  interface User {
    $id: string;
    username: string;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        console.log("Refetching decks after 5 seconds...");
        refetch();
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, [refetch])
  );

  const handleLogout = async () => {
    try {
      await signOut();
      Alert.alert("Logged Out", "You have been logged out.");
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Failed to log out.");
    }
  };

  const handleChangeUsername = async () => {
    try {
      if (newUsername.trim() === "") {
        setConfirmation("Please write a new username.");
        return;
      } else if (newUsername === user.username) {
        setConfirmation("Please write a different username.");
        return;
      }
      await changeUserName(user.$id, newUsername);
      setConfirmation("Username changed successfully!");
      setNewUsername("");
      await refetch();
      setUser((prevUser: User) => ({ ...prevUser, username: newUsername }));
    } catch (error) {
      console.error("Error updating username:", error);
      Alert.alert("Error", "Failed to update username");
    }
  };

  useEffect(() => {
    if (settingsVisible) {
      setNewUsername("");
      setConfirmation(
        "Tip: Keep it simple and unique—usernames help you stand out."
      );
    }
  }, [settingsVisible]);

  return (
    <LinearGradient
      colors={["#7C3AED", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.3 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 mx-5 mt-5">
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-5">
          <Image source={icons.LogoTop} style={styles.icon} />
          <TouchableOpacity
            className="p-2"
            onPress={() => setSettingsVisible(true)}
          >
            <Ionicons name="settings-outline" size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-3xl font-SegoeuiBlack text-white mb-5">
            Hello, {user.username} 👋
          </Text>
        </View>

        {/* Streak and Stats Section */}
        <View className="flex-row justify-between mb-5">
          <View className="bg-layer2 border-2 border-layer3 justify-center rounded-xl p-5 flex-2 mr-2">
            <Text className="text-xl font-SegoeuiBold text-white">Streak</Text>
            <Text className="text-2xl font-SegoeuiBold text-white">🔥 7</Text>
          </View>
          <View className="bg-layer2 border-2 border-layer3 rounded-xl p-5 flex-1 ml-2">
            <Text className="text-xl font-SegoeuiBold text-white">
              Today you reviewed:
            </Text>
            <Text className="text-2xl font-SegoeuiBold text-white mt-1">
              📈 21
            </Text>
          </View>
        </View>

        {/* AI Creation Section */}
        <View className="mb-5">
          <Text className="text-xl font-SegoeuiBold text-white mb-3">
            Get started
          </Text>
          <TouchableOpacity /* onPress={() => router.push(`/learn/${randomDeckId}`)}  */className="rounded-2xl overflow-hidden border-2 border-secondaryBG">
            <LinearGradient
              colors={["#A65EE6", "#000000"]}
              start={{ x: 2, y: 4 }}
              end={{ x: 0, y: 2 }}
              className="rounded-lg"
            >
              <View className="flex flex-row justify-between items-center px-6">
                <Text className="text-xl text-white font-Segoeui py-7">
                  Study for today
                </Text>
                <Image source={icons.ArrowTopRight} style={styles.iconArrow} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-xl font-SegoeuiBold text-white mb-3">
            Review your decks
          </Text>
        </View>

        {/* Deck List */}
        <View className="flex-1 w-full bg-layer2 border-2 border-layer3 rounded-xl p-1">
          <FlatList
            className="flex-1 rounded-lg w-full"
            horizontal={true}
            contentContainerStyle={{ paddingBottom: 20 }}
            data={decks as { deckName: string; $id: string }[]}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <DeckListHome
                deckName={item.deckName}
                deckId={item.$id}
              />
            )}
            ListEmptyComponent={() => (
              <Text className="text-center text-white mt-5">
                No decks available
              </Text>
            )}
            /*             refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } */
          />
        </View>
      </SafeAreaView>

      {/* Settings Modal */}
      <Modal
        isVisible={settingsVisible}
        onBackdropPress={() => setSettingsVisible(false)}
        onSwipeComplete={() => setSettingsVisible(false)}
        onBackButtonPress={() => setSettingsVisible(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="rounded-3xl bg-layer2 w-full p-5">
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-xl font-SegoeuiBold text-white">
                Settings
              </Text>
              <TouchableOpacity onPress={() => setSettingsVisible(false)}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View className="mb-3">
              <Text className="text-lg font-Segoeui text-white mb-2">
                Change Username
              </Text>
              <Text className="text-secondary bg-layer3 p-2 rounded-lg mt-1 mb-2">
                Personalize your profile by updating your display name. This is
                how it will appear throughout the app.
              </Text>
              <FormInput
                value={newUsername}
                placeholder="Enter new username"
                handleChangeText={setNewUsername}
              />
              <Text className="text-secondary mb-5">{confirmation}</Text>
              <PrimaryButton
                title="Save Changes"
                onPress={handleChangeUsername}
              />
              <DangerButton title="Log out" onPress={handleLogout} />
              <View className="flex flex-row justify-evenly mt-5">
                <Text className="font-Segoeui text-secondary w-1/2">
                  Terms of service
                </Text>
                <Text className="font-Segoeui text-secondary w-1/3">
                  Privacy Policy
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = {
  icon: {
    width: 100,
    height: 28,
  },
  iconArrow: {
    width: 45,
    height: 45,
  },
};
