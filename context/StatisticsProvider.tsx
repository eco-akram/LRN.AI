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
      const today = new Date().toDateString();
      let userStats = await getUserStatistics(user.$id);
      if (!userStats) {
        userStats = await createUserStatistics(user.$id);
      }

      // Update card status to true
      await updateCardStatus(cardId, true);

      const isFirstReviewToday = userStats.lastReviewedDate !== today;

      const updatedStats = {
        cardsReviewed: userStats.cardsReviewed + 1,
        currentStreak: isFirstReviewToday
          ? userStats.currentStreak + 1
          : userStats.currentStreak,
        lastReviewedDate: today,
      };

      setCardsReviewed(updatedStats.cardsReviewed);
      setStreak(updatedStats.currentStreak);

      await updateUserStatistics(userStats.$id, updatedStats);
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
