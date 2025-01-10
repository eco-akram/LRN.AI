import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getUserCards } from "@/lib/appwrite";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ErrorModal from "@/components/modals/ErrorModal";

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

  useEffect(() => {
    const fetchCards = async () => {
      if (!deckId) {
        setIsEmptyDeck(true);
        return;
      }

      try {
        const fetchedCards = await getUserCards(deckId);
        if (fetchedCards.length === 0) {
          setIsEmptyDeck(true);
        } else {
          setCards(
            fetchedCards.map((card) => ({
              cardId: card.$id,
              frontText: card.frontText ?? "No question provided",
              backText: card.backText ?? "No answer provided",
              status: card.status ?? false,
            }))
          );
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
    <View className="flex-1 bg-black p-5 justify-center items-center">
      <Text className="text-white text-lg mb-5">
        Card {currentIndex + 1} of {cards.length}
      </Text>
      <View className="bg-layer2 p-5 rounded-lg w-full mb-5">
        <Text className="text-white text-xl font-bold">
          {showAnswer
            ? cards[currentIndex]?.backText
            : cards[currentIndex]?.frontText}
        </Text>
      </View>
      <PrimaryButton
        title={showAnswer ? "Next Card" : "Show Answer"}
        onPress={() => (showAnswer ? handleNextCard() : setShowAnswer(true))}
      />
    </View>
  );
};

export default ReviewDeck;
