import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text } from "react-native";
import icons from "@/constants/icons";
import { BlurView } from "expo-blur";
import Modal from "react-native-modal";
import PrimaryButton from "../PrimaryButton";
import { useState } from "react";

const BottomSheet: React.FC<{
  deckId: string;
}> = ({ deckId }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newCardName, setNewCardName] = useState("");
  return (
    <View className="mb-2">
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}
        swipeDirection="down"
        style={styles.modal}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
      >
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
export default BottomSheet;
