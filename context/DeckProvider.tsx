/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDecks, getUserCards, updateCardStatus } from "@/lib/appwrite";
import { useGlobalContext } from "./GlobalProvider";

interface Deck {
  $id: string;
  deckName: string;
  cardCount: number;
  status: "completed" | "incomplete" | "no-cards";
  cards: {
    cardId: string;
    frontText: string;
    backText: string;
    status: boolean;
  }[];
}

interface DeckContextType {
  decks: Deck[];
  refetchDecks: () => Promise<void>;
  loading: boolean;
}

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export const useDeckContext = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeckContext must be used within a DeckProvider");
  }
  return context;
};

export const DeckProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [decks, setDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useGlobalContext();

  // Fetch decks and reset statuses if needed
  const fetchDecks = async () => {
    try {
      if (!user?.$id) return;

      const today = new Date().toDateString();
      const lastReset = await AsyncStorage.getItem("lastResetDate");

      const fetchedDecks = await getUserDecks(user.$id);

      const updatedDecks = await Promise.all(
        fetchedDecks.map(async (deck) => {
          const cards = await getUserCards(deck.$id);

          // Reset card statuses for a new day
          const updatedCards = await Promise.all(
            cards.map(async (card) => {
              if (lastReset !== today) {
                await updateCardStatus(card.cardId, false);
              }
              // Return the updated card object
              return {
                ...card,
                status: lastReset !== today ? false : card.status,
              };
            })
          );

          const cardCount = updatedCards.length;
          const allCompleted = updatedCards.every(
            (card) => card.status === true
          );

          return {
            $id: deck.$id,
            deckName: deck.deckName,
            cards: updatedCards,
            cardCount,
            status:
              cardCount === 0
                ? "no-cards"
                : allCompleted
                ? "completed"
                : "incomplete",
          };
        })
      );

      setDecks(updatedDecks);
      if (lastReset !== today) {
        await AsyncStorage.setItem("lastResetDate", today); // Save today's date
      }
      console.log("lastResetDate from AsyncStorage:", lastReset);
    } catch (error) {
      console.error("Error fetching decks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDecks(); // Only fetch decks when user is not null
      console.log("Fetching decks...");
    }
  }, [user]);

  return (
    <DeckContext.Provider value={{ decks, refetchDecks: fetchDecks, loading }}>
      {children}
    </DeckContext.Provider>
  );
};
