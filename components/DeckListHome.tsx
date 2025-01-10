import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getDeckCardsList, getUserCards } from "@/lib/appwrite"; // Function to get cards from Appwrite

interface DeckListHomeProps {
  deckName: string;
  deckId: string;
}

const DeckListHome: React.FC<DeckListHomeProps> = ({ deckName, deckId }) => {
  const [deckStatus, setDeckStatus] = useState<
    "completed" | "incomplete" | "no-cards"
  >("no-cards");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsList = await getUserCards(deckId);
        const cards = cardsList.map((card) => ({
          cardId: card.$id,
          cardName: card.cardName,
          status: card.status ?? false,
        }));

        if (cards.length === 0) {
          setDeckStatus("no-cards");
        } else {
          const allCompleted = cards.every((card) => card.status === true);
          setDeckStatus(allCompleted ? "completed" : "incomplete");
        }

        console.log("Fetched cards");
        // Trigger the parent to refresh the list after fetching cards
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [deckId]);

  return (
    <TouchableOpacity>
      <View className="border-b-1 border-layer2 p-4 rounded-lg mb-2 flex-row justify-between items-center">
        <Text className="text-lg text-white">{deckName}</Text>
        <Text
          className={`p-2 rounded-xl text-sm ${
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
      </View>
    </TouchableOpacity>
  );
};

export default DeckListHome;
