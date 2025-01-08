import React, { useState } from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Text } from "react-native";
import icons from "@/constants/icons";
import Modal from "react-native-modal";
import PrimaryButton from "./PrimaryButton";
import EditDeckModal from "./modals/EditDeckModal";
import DeleteDeckModal from "./modals/DeleteDeckModal";
import CreateCardModal from "./modals/CreateCardModal";
import SecondaryButton from "./SecondaryButton";

const DeckListDeck: React.FC<{
  deckName: string;
  deckId: string;
  cardCount: number;
}> = ({ deckName, deckId, cardCount }) => {
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);
  const [isEditDeckVisible, setEditDeckVisible] = useState(false);
  const [isCreateCardVisible, setCreateCardVisible] = useState(false);
  const [isDeleteDeckVisible, setDeleteDeckVisible] = useState(false);

  const openEditDeckModal = () => {
    setOptionsModalVisible(false);
    setTimeout(() => setEditDeckVisible(true), 300);
  };

  const openCreateCardModal = () => {
    setOptionsModalVisible(false);
    setTimeout(() => setCreateCardVisible(true), 300);
  };

  const openDeleteDeckModal = () => {
    setOptionsModalVisible(false); // Close options modal
    setTimeout(() => setDeleteDeckVisible(true), 300); // Open delete modal
  };

  const backToOptionsModal = () => {
    setEditDeckVisible(false);
    setCreateCardVisible(false);
    setDeleteDeckVisible(false);
    setTimeout(() => setOptionsModalVisible(true), 300);
  };

  return (
    <View className="mb-2">
      {/* Deck Details */}
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
        <TouchableOpacity onPress={() => setOptionsModalVisible(true)}>
          <Image
            source={icons.DotsIcon}
            resizeMode="contain"
            style={styles.iconSmall}
          />
        </TouchableOpacity>
      </View>
      <View className="border-t-2 border-gray-500 mt-2" />
      {/* Options Modal */}
      <Modal
        isVisible={isOptionsModalVisible}
        onBackdropPress={() => setOptionsModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}
        onBackButtonPress={() => setOptionsModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>Options</Text>
          <PrimaryButton title="Create a Card" onPress={openCreateCardModal} />
          <SecondaryButton
            title="Change Deck Name"
            onPress={openEditDeckModal}
          />
          <TouchableOpacity onPress={openDeleteDeckModal}>
            <Text className="font-Segoeui text-danger">Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Edit Deck Modal with Back Button */}
      <EditDeckModal
        isVisible={isEditDeckVisible}
        onClose={() => setEditDeckVisible(false)}
        onBack={backToOptionsModal}
        deckId={deckId}
        deckName={deckName}
      />
      {/* Create Card Modal with Back Button */}
      <CreateCardModal
        isVisible={isCreateCardVisible}
        onClose={() => setCreateCardVisible(false)}
        onBack={backToOptionsModal}
        deckId={deckId}
      />
      {/* DeleteDeckModal */}
      <DeleteDeckModal
        isVisible={isDeleteDeckVisible}
        onClose={() => setDeleteDeckVisible(false)}
        onBack={backToOptionsModal}
        deckId={deckId}
        deckName={deckName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: { width: 30, height: 30 },
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
});

export default DeckListDeck;
