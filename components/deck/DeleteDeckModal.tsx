import { View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Text } from "react-native";
import DangerButton from "../buttons/DangerButton";
import { deleteDeckWithCards } from "@/lib/appwrite";
import { useSuccessModal } from "@/context/ModalContext";

const DeleteDeckModal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  onBack: () => void; // Back Prop for navigation
  deckId: string;
  deckName: string;
  refreshData: () => void;
}> = ({ isVisible, onClose, onBack, deckId, deckName, refreshData }) => {
  const { showSuccessModal } = useSuccessModal();

  const handleDelete = async () => {
    try {
      await deleteDeckWithCards(deckId);
      refreshData();
      showSuccessModal("Deck has been deleted!");
      console.log(`Deleting Deck: ${deckId}`);
      onClose();
    } catch (error) {
      console.error("Error deleting deck:", error);
      alert("Failed to delete deck. Please try again.");
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
        {/* Back Button */}
        <TouchableOpacity
          hitSlop={20}
          onPress={onBack}
          style={styles.backButton}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Modal Title */}
        <Text style={styles.title}>Delete Deck</Text>

        {/* Warning Message */}
        <Text className="font-SegoeuiBold text-lg text-center mb-4 color-danger">
          Are you sure you want to delete the deck "{deckName}"? This action
          cannot be undone.
        </Text>

        {/* Confirm and Cancel Buttons */}
        <DangerButton title="Delete Deck" onPress={handleDelete} />
        <TouchableOpacity hitSlop={20} onPress={onClose}>
          <Text className="font-Segoeui color-secondary">Cancel</Text>
        </TouchableOpacity>
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
  warning: {
    color: "#ff4444",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 16,
  },
  confirmationPrompt: {
    color: "#999",
    marginBottom: 10,
    fontSize: 14,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    color: "white",
    marginBottom: 15,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: "#999",
    fontSize: 16,
  },
});

export default DeleteDeckModal;
