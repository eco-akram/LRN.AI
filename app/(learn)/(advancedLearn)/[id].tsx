/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDeckCardsList } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import Loading from "@/components/Loading";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Deck {
  id: string;
  name: string;
  cards: { cardId: string; cardName: any }[];
}

export default function Decks() {
  const { user } = useGlobalContext();
  const router = useRouter();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDeckIds, setSelectedDeckIds] = useState<string[]>([]);

  const fetchDecks = async () => {
    setLoading(true);
    try {
      const deckList = await getDeckCardsList(user.$id);
      const mappedDecks = deckList.map((deck: any) => ({
        id: deck.deckId,
        name: deck.deckName,
        cards: deck.cards,
      }));
      setDecks(mappedDecks);
    } catch (error) {
      console.error("Error fetching decks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const toggleDeckSelection = (deckId: string) => {
    setSelectedDeckIds((prevSelected) =>
      prevSelected.includes(deckId)
        ? prevSelected.filter((id) => id !== deckId)
        : [...prevSelected, deckId]
    );
  };

  const handleStudy = () => {
    if (selectedDeckIds.length === 0) {
      alert("Please select at least one deck to study!");
      return;
    }
    router.push({
      pathname: "/(learn)/(advancedLearn)/studyCards",
      params: { deckIds: selectedDeckIds.join(",") },
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 15, flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Decks</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={decks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.deckContainer,
                selectedDeckIds.includes(item.id) && styles.selectedDeckItem,
              ]}
              onPress={() => toggleDeckSelection(item.id)}
            >
              <Text style={styles.deckName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.contentContainer}
        />
        <PrimaryButton title="Start Studying" onPress={handleStudy} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    color: "white",
    fontFamily: "SegoeuiBold",
    fontSize: 24,
  },
  deckContainer: {
    marginBottom: 13,
    padding: 17,
    backgroundColor: "#141414",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#242424",
  },
  selectedDeckItem: {
    borderColor: "#7C3AED",
  },
  deckName: {
    fontSize: 18,
    color: "white",
  },
  contentContainer: {
    paddingBottom: 20,
  },
});
