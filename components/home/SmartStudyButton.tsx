import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import icons from "../../constants/icons";
import { getUserCards, getUserDecks } from "@/lib/appwrite";
import SuccessModal from "../modals/SuccessModal";
import { router } from "expo-router";
import Loading from "../Loading";

interface SmartStudyButtonProps {
  userId: string;
}

const SmartStudyButton: React.FC<SmartStudyButtonProps> = ({ userId }) => {
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const handleReviewIncompleteDeck = async () => {
    try {
      setLoading(true);

      const allDecks = await getUserDecks(userId);
      const incompleteDecks = [];

      for (const deck of allDecks) {
        const cards = await getUserCards(deck.$id);
        const hasIncompleteCards = cards.some((card) => !card.status); // Check for at least one incomplete card

        if (hasIncompleteCards) {
          incompleteDecks.push(deck); // Add deck to incomplete decks if it has incomplete cards
        }
      }

      if (incompleteDecks.length === 0) {
        setVisible(true);
        setLoading(false);
        return;
      }

      const randomDeck =
        incompleteDecks[Math.floor(Math.random() * incompleteDecks.length)]; // Select random incomplete deck

      router.push({
        pathname: "/(learn)/[id]",
        params: { id: randomDeck.$id }, // Pass the deckId as id
      });
    } catch (error) {
      console.error("Error selecting random deck:", error);
      Alert.alert("Error", "Failed to start review for incomplete deck.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <TouchableOpacity
        onPress={handleReviewIncompleteDeck}
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
              Review Incomplete Decks
            </Text>
            <Image source={icons.ArrowTopRight} style={styles.iconArrow} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <SuccessModal
        title="Yay! 🎉"
        subtitle="You have completed all your decks."
        onClose={() => setVisible(false)}
        isVisible={false}
      />
    </View>
  );
};

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

export default SmartStudyButton;
