import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Text } from "react-native";
import icons from "@/constants/icons";
import Modal from "react-native-modal";
import PrimaryButton from "../PrimaryButton";

const SuccessModal: React.FC<{
  title: string;
  subtitle: string;
  isVisible: boolean;
  onClose: () => void;
}> = ({ title, subtitle, isVisible, onClose }) => {
  const [isModalVisible, setModalVisible] = useState(isVisible);

  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  const handleContinue = () => {
    setModalVisible(false); // Close modal locally
    onClose(); // Call parent-provided onClose to handle any additional logic
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={handleContinue}
      onSwipeComplete={handleContinue}
      swipeDirection="down"
      className="flex justify-center items-center"
      onBackButtonPress={handleContinue}
    >
      <View className="p-4">
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
        <PrimaryButton title="Continue" onPress={handleContinue} />
      </View>
    </Modal>
  );
};

export default SuccessModal;
