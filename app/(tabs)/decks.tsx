import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SectionList,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDeckCardsList } from "@/lib/appwrite"; // Adjust the import path as needed
import { useGlobalContext } from "@/context/GlobalProvider";
import DeckListCards from "@/components/DeckListCards";
import DeckListDeck from "@/components/DeckListDeck";
import icons from "@/constants/icons";

//TODO: CREATE GLOBAL LOADER

interface Deck {
  deckName: string;
  cards: string[];
}

export default function Decks() {
  const { user } = useGlobalContext();

  const [decksCards, setDecksCards] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const deckList = await getDeckCardsList(user.$id);

        setDecksCards(deckList);
      } catch (error) {
        console.log("Error fetching decks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  const getCardCount = (deck: Deck) => deck.cards.length;

  useEffect(() => {
    console.log(decksCards);
  }, [decksCards]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row m-5 items-center justify-between">
        <Text className="text-white text-2xl">Your Decks</Text>
        <TouchableOpacity onPress={() => console.log("Add deck")}>
          <Image
            source={icons.PlusIcon}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View className="m-5">
        <SectionList
          sections={decksCards.map((deck) => ({
            title: deck.deckName,
            data: deck.cards,
            cardCount: deck.cards.length, // Add cardCount here
          }))}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <DeckListCards card={item} />}
          renderSectionHeader={({ section: { title, cardCount } }) => (
            <DeckListDeck deck={title} count={cardCount} /> // Use cardCount directly
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  deckTitle: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  cardName: {
    fontSize: 16,
    marginLeft: 10,
    padding: 5,
  },
  icon: {
    width: 30,
    height: 30,
    maxHeight: 30,
    maxWidth: 30,
  },
});
