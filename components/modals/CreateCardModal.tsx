import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Text } from "react-native";
import PrimaryButton from "../PrimaryButton";
import { createCard } from "@/lib/appwrite";
import { useSuccessModal } from "@/context/ModalContext";

const CreateCardModal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  onBack: () => void; // New Back Prop
  deckId: string;
  refreshData: () => void;
}> = ({ isVisible, onClose, onBack, deckId, refreshData }) => {
  const [newCardName, setNewCardName] = useState("");
  const [newCardFrontText, setNewCardFrontText] = useState("");
  const [newCardBackText, setNewCardBackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { showSuccessModal } = useSuccessModal();

  const handleCreateCard = async () => {
    if (newCardName.trim() === "") {
      alert("Please enter the card name!");
      return;
    }
    if (newCardFrontText.trim() === "") {
      alert("Please enter the front text!");
      return;
    }
    if (newCardBackText.trim() === "") {
      alert("Please enter the back text!");
      return;
    }

    setIsLoading(true);

    try {
      await createCard(deckId, newCardName, newCardFrontText, newCardBackText);
      refreshData();
      showSuccessModal("New card has been added!");
      console.log(
        `Deck id for the card: ${deckId}, Card Name: ${newCardName}, Front Text: ${newCardFrontText}, Back Text: ${newCardBackText}`,
      );
    } catch (error) {
      console.error("Error creating card:", error);
      alert("Failed to create card. Please try again.");
    } finally {
      setIsLoading(false);
    }

    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection="down"
      style={styles.modal}
      onBackButtonPress={onClose}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create New Card</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter card name"
          placeholderTextColor="#999"
          value={newCardName}
          onChangeText={setNewCardName}
        />
        <TextInput
          style={styles.input}
          placeholder="Front text (question)"
          placeholderTextColor="#999"
          value={newCardFrontText}
          onChangeText={setNewCardFrontText}
        />
        <TextInput
          style={styles.input}
          placeholder="Back text (answer)"
          placeholderTextColor="#999"
          value={newCardBackText}
          onChangeText={setNewCardBackText}
        />
        <PrimaryButton title="Create Card" onPress={handleCreateCard} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: { justifyContent: "flex-end", margin: 0 },
  backButton: { alignSelf: "flex-end", marginBottom: 10 },
  backText: { color: "#999", fontSize: 16 },
  modalContent: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },
  title: { fontSize: 20, color: "white", marginBottom: 15, fontWeight: "bold" },
  input: {
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    color: "white",
    marginBottom: 15,
  },
});

export default CreateCardModal;
