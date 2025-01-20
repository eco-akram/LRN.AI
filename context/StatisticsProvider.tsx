/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getUserStatistics,
  updateUserStatistics,
  updateCardStatus,
  createUserStatistics,
} from "@/lib/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useDeckContext } from "./DeckProvider";

interface StatisticsContextType {
  incrementCardsReviewed: (cardId: string) => Promise<void>;
  streak: number;
  cardsReviewed: number;
  loading: boolean;
}

const StatisticsContext = createContext<StatisticsContextType | undefined>(
  undefined
);

export const useStatisticsContext = () => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error(
      "useStatisticsContext must be used within a StatisticsProvider"
    );
  }
  return context;
};

export const StatisticsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [streak, setStreak] = useState(0);
  const [cardsReviewed, setCardsReviewed] = useState(0);
  const [loading, setLoading] = useState(true);

  const { user } = useGlobalContext();
  const {refetchDecks} = useDeckContext();

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user || !user.$id) {
        console.warn("User not loaded yet");
        return;
      }
      try {
        const userStats = await getUserStatistics(user.$id);
        if (userStats) {
          setStreak(userStats.currentStreak);
          setCardsReviewed(userStats.cardsReviewed);
        } else {
          const newUserStats = await createUserStatistics(user.$id);
          setStreak(newUserStats.currentStreak);
          setCardsReviewed(newUserStats.cardsReviewed);
        }
      } catch (error) {
        console.error("Error fetching user statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  const incrementCardsReviewed = async (cardId: string) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      let userStats = await getUserStatistics(user.$id);
  
      if (!userStats) {
        userStats = await createUserStatistics(user.$id);
      }
  
      // Reset streak if no cards were reviewed today
      const lastReview = await AsyncStorage.getItem("lastReviewedDate");
      const isNewDay = lastReview !== today;
  
      const updatedStreak = isNewDay ? userStats.currentStreak + 1 : userStats.currentStreak;
  
  
      // Update card status
      await updateCardStatus(cardId, true);
  
      const updatedStats = {
        cardsReviewed: userStats.cardsReviewed + 1,
        currentStreak: updatedStreak,
        lastReviewedDate: today,
      };
  
      setCardsReviewed(updatedStats.cardsReviewed);
      setStreak(updatedStats.currentStreak);
  
      console.log("lastReviewedDate from user stats:", userStats.lastReviewedDate);

      await AsyncStorage.setItem("lastReviewedDate", today); // Cache today's date
      await updateUserStatistics(userStats.$id, updatedStats);

      refetchDecks();
    } catch (error) {
      console.error("Error incrementing card review:", error);
    }
  };
  

  return (
    <StatisticsContext.Provider
      value={{ incrementCardsReviewed, streak, cardsReviewed, loading }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};
