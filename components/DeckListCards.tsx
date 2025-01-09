import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text } from "react-native";
import icons from "@/constants/icons";
import Modal from "react-native-modal";
import { useEffect, useState } from "react";
import { useSuccessModal } from "@/context/ModalContext";
import PrimaryButton from "./buttons/PrimaryButton";
import { editCard } from "@/lib/appwrite";
import DeleteCardModal from "./modals/DeleteCardModal";

const DeckListCards: React.FC<{
  card: { cardId: string; cardName: string };
  deckId: string;
  refreshData: () => void;
}> = ({ card, deckId, refreshData }) => {
  const [isChangeCardVisible, setChangeCardVisible] = useState(false);
  const [newCardName, setNewCardName] = useState("");
  const [newCardFrontText, setNewCardFrontText] = useState("");
  const [newCardBackText, setNewCardBackText] = useState("");

  const [isDeleteCardVisible, setDeleteCardVisible] = useState(false);

  const { showSuccessModal } = useSuccessModal();

  const openDeleteCardModal = () => {
    setChangeCardVisible(false);
    setTimeout(() => setDeleteCardVisible(true), 300);
  };

  const backToCardChangeModal = () => {
    setDeleteCardVisible(false);
    setTimeout(() => setChangeCardVisible(true), 300);
  };

  useEffect(() => {
    if (isChangeCardVisible) {
      setNewCardName("");
      setNewCardFrontText("");
      setNewCardBackText("");
    }
  }, [isChangeCardVisible]);

  const handleChangeCard = async () => {
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

    try {
      await editCard(
        card.cardId,
        newCardName,
        newCardFrontText,
        newCardBackText,
      );
      refreshData();
      showSuccessModal("The card has been changed!");
      console.log(
        `Deck id for the card: ${deckId}, Card Name: ${newCardName}, Front Text: ${newCardFrontText}, Back Text: ${newCardBackText}`,
      );
    } catch (error) {
      console.error("Error creating card:", error);
      alert("Failed to create card. Please try again.");
    }
    setChangeCardVisible(false);
  };

  return (
    <View className="flex-row items-center justify-between gap-2 mb-2 mx-3">
      <View className="flex-row items-center gap-1">
        {/*         <Image
          source={icons.ArrowCardIcon}
          resizeMode="contain"
          style={styles.icon}
        /> */}
        <Text className="text-white text-lg font-Segoeui">&gt;</Text>
        <Text className="text-white text-lg font-Segoeui">{card.cardName}</Text>
      </View>
      <View className="flex-row gap-1">
        <TouchableOpacity onPress={() => setChangeCardVisible(true)}>
          <Text className="text-secondary font-Segoeui">Edit</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isChangeCardVisible}
        onBackdropPress={() => setChangeCardVisible(false)}
        swipeDirection="down"
        style={styles.modal}
        onBackButtonPress={() => setChangeCardVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>Edit Card</Text>
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
          <PrimaryButton title="Save your changes" onPress={handleChangeCard} />
          <TouchableOpacity onPress={openDeleteCardModal}>
            <Text className="font-Segoeui text-danger">Delete Card</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* DeleteCardModal */}
      <DeleteCardModal
        isVisible={isDeleteCardVisible}
        onClose={() => setDeleteCardVisible(false)}
        onBack={backToCardChangeModal}
        cardId={card.cardId}
        cardName={card.cardName}
        refreshData={refreshData}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  icon: { width: 25, height: 25 },
  iconSmall: { width: 25, height: 25, marginRight: 10 },
  modal: { justifyContent: "flex-end", margin: 0 },
  modalContent: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },
  title: { fontSize: 20, color: "white", marginBottom: 15, fontWeight: "bold" },
  optionText: { color: "#BA4A4A" },
  input: {
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    color: "white",
    marginBottom: 15,
  },
});

export default DeckListCards;
