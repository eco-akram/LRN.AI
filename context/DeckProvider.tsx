/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDecks, getUserCards } from "@/lib/appwrite";
import { useGlobalContext } from "./GlobalProvider";

interface DeckContextType {
  decks: any[];
  refetchDecks: () => void;
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
      const today = new Date().toDateString();
      const lastReset = await AsyncStorage.getItem("lastResetDate");

      const fetchedDecks = await getUserDecks(user.$id);

      const updatedDecks = await Promise.all(
        fetchedDecks.map(async (deck) => {
          const cards = await getUserCards(deck.$id);

          // Reset status only once per day
          if (lastReset !== today) {
            const updatedCards = cards.map((card) => ({
              ...card,
              status: false,
            }));
            deck.cards = updatedCards;
          } else {
            deck.cards = cards;
          }
          return deck;
        })
      );

      setDecks(updatedDecks);
      await AsyncStorage.setItem("lastResetDate", today); // Save today's date
      setLoading(false);
    } catch (error) {
      console.error("Error fetching decks:", error);
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
