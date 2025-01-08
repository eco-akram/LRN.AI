import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text } from "react-native";
import icons from "@/constants/icons";
import { useState } from "react";
import Modal from "react-native-modal";
import PrimaryButton from "./PrimaryButton";

const DeckListDeck: React.FC<{
  deckName: string;
  deckId: string;
  cardCount: number;
}> = ({ deckName, deckId, cardCount }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "addCard" | null>(null);
  const [newDeckName, setNewDeckName] = useState("");
  const [newCardName, setNewCardName] = useState("");

  const handleEditDeck = () => {
    // Logic for editing deck name goes here (e.g., call an API)
    console.log(`Edit Deck: ${deckId}, New Name: ${newDeckName}`);
    setModalVisible(false);
  };

  const handleAddCard = () => {
    // Logic for adding a new card goes here (e.g., call an API)
    console.log(`Add Card to Deck: ${deckId}, Card Name: ${newCardName}`);
    setModalVisible(false);
  };

  const renderModalContent = () => {
    if (modalMode === "edit") {
      return (
        <View style={styles.modalContent}>
          <Text className="font-SegoeuiBold text-2xl text-white mb-5">
            Edit Deck Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter new deck name"
            placeholderTextColor="#999"
            value={newDeckName}
            onChangeText={(text) => setNewDeckName(text)}
          />

          <PrimaryButton title="Save Changes" onPress={handleEditDeck} />
        </View>
      );
    } else if (modalMode === "addCard") {
      return (
        <View style={styles.modalContent}>
          <Text className="font-SegoeuiBold text-2xl text-white mb-5">
            Add New Card
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter card name"
            placeholderTextColor="#999"
            value={newCardName}
            onChangeText={(text) => setNewCardName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter card name"
            placeholderTextColor="#999"
            value={newCardName}
            onChangeText={(text) => setNewCardName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter card name"
            placeholderTextColor="#999"
            value={newCardName}
            onChangeText={(text) => setNewCardName(text)}
          />

          <PrimaryButton title="Create a Card" onPress={handleAddCard} />
        </View>
      );
    }
  };

  return (
    <View className="mb-2">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <Image
            source={icons.StackOfCards}
            resizeMode="contain"
            style={styles.icon}
          />
          <View>
            <Text className="text-white text-xl font-SegoeuiBold">
              {deckName}
            </Text>
            <Text className="text-gray-500 font-Segoeui leading-tight">
              {cardCount} {cardCount === 1 ? "card" : "cards"}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={icons.DotsIcon}
              resizeMode="contain"
              style={styles.iconSmall}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="border-t-2 border-gray-500 mt-2" />
      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
          setModalMode(null);
        }}
        onSwipeComplete={() => {
          setModalVisible(false);
          setModalMode(null);
        }}
        swipeDirection="down"
        style={styles.modal}
        onBackButtonPress={() => {
          setModalVisible(false);
          setModalMode(null);
        }}
      >
        <View>
          <View>
            {!modalMode ? (
              <View style={styles.modalContent}>
                <Text className="font-SegoeuiBold text-2xl text-white mb-5">
                  Options
                </Text>
                <PrimaryButton
                  title="Create a Card"
                  onPress={() => setModalMode("addCard")}
                />
                <TouchableOpacity onPress={() => setModalMode("edit")}>
                  <Text className="font-Segoeui text-gray-500 mt-2 mb-5">
                    Change Deck Name
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              renderModalContent()
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  iconSmall: {
    width: 25,
    height: 25,
    marginRight: 10,
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
  actionButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DeckListDeck;
