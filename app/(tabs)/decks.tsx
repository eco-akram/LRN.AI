import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDeckCardsList, createDeck } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import DeckListCards from "@/components/DeckListCards";
import DeckListDeck from "@/components/DeckListDeck";
import icons from "@/constants/icons";
import { Image } from "expo-image";
import Loading from "@/components/Loading";
import Modal from "react-native-modal";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useSuccessModal } from "@/context/ModalContext";

interface Deck {
  deckId: string;
  deckName: string;
  cards: { cardId: string; cardName: string }[];
}

export default function Decks() {
  const { user } = useGlobalContext();

  const [decksCards, setDecksCards] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");

  const { showSuccessModal } = useSuccessModal();

  const fetchDecks = async () => {
    setLoading(true);
    try {
      const deckList = await getDeckCardsList(user.$id);
      setDecksCards(deckList);
    } catch (error) {
      console.log("Error fetching decks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleAddDeck = async () => {
    if (newDeckName.trim() === "") {
      alert("Please enter a deck name!");
      return;
    }

    try {
      const newDeck = await createDeck(user.$id, newDeckName);

      setDecksCards((prev) => [
        ...prev,
        {
          deckId: newDeck.$id,
          deckName: newDeck.deckName,
          cards: [],
        },
      ]);

      setNewDeckName("");
      setModalVisible(false);

      showSuccessModal("Deck has been added!");
    } catch (error) {
      console.error("Error adding deck:", error);
      alert("Failed to add deck. Please try again.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row m-5 items-center justify-between">
        <Text className="text-white font-SegoeuiBold text-2xl">Your Decks</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={icons.PlusIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View className="m-5">
        <FlatList
          data={decksCards}
          keyExtractor={(item) => item.deckId}
          renderItem={({ item }) => (
            <View style={styles.deckContainer}>
              {/* Header (Deck) */}
              <DeckListDeck
                deckName={item.deckName}
                deckId={item.deckId}
                cardCount={item.cards.length}
                refreshData={fetchDecks}
              />

              {/* Vertical Line and Cards */}
              <View style={styles.cardsContainer}>
                <View style={styles.cardsList}>
                  {item.cards.length === 0 ? (
                    <Text style={styles.noCardsText}>
                      No cards in this deck
                    </Text>
                  ) : (
                    item.cards.map((card) => (
                      <View key={card.cardId} style={styles.cardItem}>
                        <DeckListCards
                          card={card}
                          deckId={item.deckId}
                          refreshData={fetchDecks}
                        />
                      </View>
                    ))
                  )}
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}
        onBackButtonPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text className="font-SegoeuiBold text-2xl text-white mb-5">
            Add New Deck
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter deck name"
            placeholderTextColor="#999"
            value={newDeckName}
            onChangeText={(text) => setNewDeckName(text)}
          />
          <PrimaryButton onPress={handleAddDeck} title="Add Deck" />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  deckContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#252629",
  },
  cardsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
  },
  cardsList: {
    flex: 1,
  },
  cardItem: {
    marginBottom: 8,
  },
  noCardsText: {
    color: "#888",
    fontStyle: "italic",
  },
  icon: {
    width: 30,
    height: 30,
    maxHeight: 30,
    maxWidth: 30,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    color: "white",
    marginBottom: 15,
  },
});
