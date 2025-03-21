/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
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
import { changeUserName, signOut, getCurrentUser } from "@/lib/appwrite";
import Modal from "react-native-modal";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import DangerButton from "@/components/buttons/DangerButton";
import FormInput from "@/components/buttons/FormInput";
import DeckListHome from "@/components/home/DeckListHome";
import Loading from "@/components/Loading";
import SuccessModal from "@/components/modals/SuccessModal";
import UserStatistics from "@/components/home/UserStatistics";

import { useDeckContext } from "@/context/DeckProvider";

export default function Home() {
  const { user, setUser } = useGlobalContext();

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const [visible, setVisible] = useState(false);

  const { decks, refetchDecks, loading } = useDeckContext();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        /*         console.error("Error fetching current user:", error);
         */ router.replace("/login");
      }
    };

    checkUser();
  }, []);

  interface User {
    $id: string;
    username: string;
  }

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        console.log("Refetching decks after 5 seconds...");
        refetchDecks();
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, [refetchDecks])
  );

  const handleLogout = async () => {
    try {
      await signOut();
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

  const handlePress = () => {
    router.push("/(learn)/(advancedLearn)/[id]");
  };

  if (loading) {
    return <Loading />;
  }

  /*   console.log(decks.map((deck) => deck.$id)); */

  return (
    <LinearGradient
      colors={["#7C3AED", "#0A0A0A"]}
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
        <UserStatistics />

        {/* Smart Study Mode */}
        <View className="mb-5">
          <Text className="text-xl font-SegoeuiBold text-white mb-3">
            Smart Study Mode
          </Text>
          <TouchableOpacity
            onPress={handlePress}
            className="rounded-2xl overflow-hidden border-2 border-secondaryBG"
          >
            <LinearGradient
              colors={["#A65EE6", "#000000"]}
              start={{ x: 2, y: 4 }}
              end={{ x: 0, y: 2 }}
              className="rounded-lg"
            >
              <View className="flex flex-row justify-between items-center px-6">
                <Text className="text-xl text-white font-Segoeui py-7">
                  Review Multiple Decks
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
            data={decks}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <DeckListHome
                deckName={item.deckName}
                deckId={item.$id}
                cardCount={item.cardCount}
                status={item.status}
              />
            )}
            ListEmptyComponent={() => (
              <Text className="text-center text-secondary mt-5">
                No decks available
              </Text>
            )}
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
              <TouchableOpacity
                hitSlop={20}
                onPress={() => setSettingsVisible(false)}
              >
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
                <TouchableOpacity
                  hitSlop={20}
                  onPress={() => router.replace("/privacyPolicy")}
                >
                  <Text className="font-Segoeui text-secondary">
                    Terms of service
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  hitSlop={20}
                  onPress={() => router.replace("/privacyPolicy")}
                >
                  <Text className="font-Segoeui text-secondary">
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <SuccessModal
        title="Yay! 🎉"
        subtitle="You have completed all your decks."
        onClose={() => setVisible(false)}
        isVisible={visible}
      />
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
