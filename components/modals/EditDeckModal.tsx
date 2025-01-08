import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Text } from "react-native";
import PrimaryButton from "../PrimaryButton";
import { editDeck } from "@/lib/appwrite";

const EditDeckModal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  onBack: () => void; // New Back Prop
  deckId: string;
  deckName: string;
}> = ({ isVisible, onClose, onBack, deckId, deckName }) => {
  const [newDeckName, setNewDeckName] = useState(deckName);

  const handleSaveChanges = async () => {
    if (newDeckName.trim() === "") {
      alert("Please enter a deck name!");
      return;
    }

    try {
      await editDeck(deckId, newDeckName);
      console.log(`Edit Deck: ${deckId}, New Name: ${newDeckName}`);
      onClose();
    } catch (error) {
      console.error("Error editing deck:", error);
      alert("Failed to edit deck. Please try again.");
    }
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
        <Text style={styles.title}>Edit Deck Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new deck name"
          placeholderTextColor="#999"
          value={newDeckName}
          onChangeText={setNewDeckName}
        />
        <PrimaryButton title="Save Changes" onPress={handleSaveChanges} />
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

export default EditDeckModal;
