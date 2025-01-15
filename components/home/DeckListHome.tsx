import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getDeckCardsList, getUserCards } from "@/lib/appwrite"; // Function to get cards from Appwrite
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import ErrorModal from "../modals/ErrorModal";

interface DeckListHomeProps {
  deckName: string;
  deckId: string;
}

// TODO: COMPLETE INCOMPLETE NOT REFETCHING

const DeckListHome: React.FC<DeckListHomeProps> = ({ deckName, deckId }) => {
  const [deckStatus, setDeckStatus] = useState<
    "completed" | "incomplete" | "no-cards"
  >("no-cards");
  const [cardNum, setCardNum] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsList = await getUserCards(deckId);
        const cards = cardsList.map((card) => ({
          cardId: card.$id,
          cardName: card.cardName,
          status: card.status ?? false,
        }));

        const cardCount = cards.length;
        setCardNum(cardCount);

        if (cards.length === 0) {
          setDeckStatus("no-cards");
        } else {
          const allCompleted = cards.every((card) => card.status === true);
          setDeckStatus(allCompleted ? "completed" : "incomplete");
        }

        console.log("Fetching cards...");
        // Trigger the parent to refresh the list after fetching cards
        return cardNum;
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [cardNum, deckId]);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(learn)/[id]",
          params: { id: deckId },
        })
      }
    >
      <View className="flex-row justify-between items-center h-full w-full mx-2">
        <LinearGradient
          colors={["#1B1C1D", "#141414"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0.6 }}
          style={styles.gradient}
        >
          <View>
            <Text className="font-SegoeuiBold text-lg text-white">
              {deckName}
            </Text>
            <Text className="font-SegoeuiBold  text-secondary">
              {cardNum} {cardNum === 1 ? "Card" : "Cards"}
            </Text>
          </View>
          <Text
            className={`p-1 text-center rounded-xl text-sm ${
              deckStatus === "completed"
                ? "bg-green-500"
                : deckStatus === "incomplete"
                  ? "bg-red-500"
                  : "bg-gray-500"
            } text-white`}
          >
            {deckStatus === "completed"
              ? "Completed"
              : deckStatus === "incomplete"
                ? "Incomplete"
                : "No Cards"}
          </Text>
        </LinearGradient>
      </View>
      {/*       </View> */}
    </TouchableOpacity>
  );
};

export default DeckListHome;
const styles = StyleSheet.create({
  gradient: {
    borderColor: "#37383A",
    borderWidth: 2,
    padding: 16,
    height: "100%",
    width: 160,
    borderRadius: 10, // Make the corners rounded
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
