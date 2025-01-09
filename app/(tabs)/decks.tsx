import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
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
import PrimaryButton from "@/components/PrimaryButton";
import SuccessModal from "@/components/modals/SuccessModal";

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
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

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
      setSuccessModalVisible(true);
    } catch (error) {
      console.error("Error adding deck:", error);
      alert("Failed to add deck. Please try again.");
    }
  };

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  useEffect(() => {
    console.log(decksCards);
  }, [decksCards]);

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
        <SectionList
          sections={decksCards.map((deck) => ({
            title: deck.deckName,
            deckId: deck.deckId,
            data: deck.cards,
            cardCount: deck.cards.length,
          }))}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, section }) => (
            <DeckListCards card={item} deckId={section.deckId} />
          )}
          renderSectionHeader={({ section: { title, deckId, cardCount } }) => (
            <DeckListDeck
              deckName={title}
              deckId={deckId}
              cardCount={cardCount}
              refreshData={fetchDecks}
            />
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
      <SuccessModal
        isVisible={isSuccessModalVisible}
        title="Success"
        subtitle="Deck has been added!"
        onClose={closeSuccessModal}
      />
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
