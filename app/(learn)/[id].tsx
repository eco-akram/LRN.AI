import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getUserCards } from "@/lib/appwrite";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ErrorModal from "@/components/modals/ErrorModal";
import Loading from "@/components/Loading";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import DangerButton from "@/components/buttons/DangerButton";
import IncorrectButton from "@/components/buttons/IncorrectButton";
import CorrectButton from "@/components/buttons/CorrectButton";
import icons from "@/constants/icons";

interface Card {
  cardId: string;
  frontText: string;
  backText: string;
  status: boolean;
}

const ReviewDeck = () => {
  const router = useRouter();
  const { id: deckId } = useLocalSearchParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isEmptyDeck, setIsEmptyDeck] = useState(false);
  const [isReviewComplete, setIsReviewComplete] = useState(false); // Track review completion
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      if (!deckId) {
        setIsEmptyDeck(true);
        setLoading(false);
        return;
      }

      try {
        const fetchedCards = await getUserCards(deckId);
        if (fetchedCards.length === 0) {
          setIsEmptyDeck(true);
          setLoading(false);
        } else {
          setCards(
            fetchedCards.map((card) => ({
              cardId: card.$id,
              frontText: card.frontText ?? "No question provided",
              backText: card.backText ?? "No answer provided",
              status: card.status ?? false,
            }))
          );
          setLoading(false);
          setIsEmptyDeck(false); // Reset empty deck state when cards are set
          setCurrentIndex(0); // Start from the first card
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [deckId]);

  const handleNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      setIsReviewComplete(true); // Show completion modal when review is done
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (isEmptyDeck) {
    return (
      <View className="flex-1 justify-center items-center bg-black p-5">
        <ErrorModal
          title="No Cards Available"
          subtitle="This deck has no cards. Please add cards before reviewing."
          isVisible={true}
          onClose={() => router.back()} // Go back to the previous screen
        />
      </View>
    );
  }

  if (isReviewComplete) {
    return (
      <View className="flex-1 justify-center items-center bg-black p-5">
        <ErrorModal
          title="Review Complete"
          subtitle="You have finished reviewing this deck."
          isVisible={true}
          onClose={() => router.back()} // Navigate back after review
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="m-5 flex-1">
        {/* HEADER */}
        <View className="flex-row items-center justify-between mb-5">
          <Text className="font-SegoeuiBlack text-white text-2xl">
            DECK NAME
          </Text>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </View>

        {/* CARD CONTAINER */}
        <View className="flex-1 justify-center items-center">
          <View className=" p-5 rounded-xl w-full max-w-md justify-center items-center">

            {/* CARD */}
            <LinearGradient
              colors={["#1B1C1D", "#0A0A0A"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0.6 }}
              style={styles.gradient}
            >
              <View className=" p-5 h-96 rounded-lg min-w-72 justify-center">
                <Text className="text-white text-xl font-Segoeui text-center">
                  {showAnswer
                    ? cards[currentIndex]?.backText
                    : cards[currentIndex]?.frontText}
                </Text>
              </View>
            </LinearGradient>
            {/* COUNT */}
            <Text className="text-secondary font-SegoeuiBold text-center text-base mt-5">
              Card {currentIndex + 1} of {cards.length}
            </Text>
            {/* BUTTON */}
            <PrimaryButton
              title={showAnswer ? "Next Card" : "Show Answer"}
              onPress={() =>
                showAnswer ? handleNextCard() : setShowAnswer(true)
              }
            />
            <View className="flex-row justify-between mt-5 w-full gap-7 space-x-3">
              <View className="flex-1">
                <IncorrectButton
                  title="Incorrect"
                  onPress={() => console.log("Incorrect")}
                />
              </View>
              <View className="flex-1">
                <CorrectButton
                  title="Correct"
                  onPress={() => console.log("Correct")}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReviewDeck;

const styles = StyleSheet.create({
  gradient: {
    borderColor: "#37383A",
    borderWidth: 2,
    padding: 16,
    borderRadius: 10, // Make the corners rounded
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
