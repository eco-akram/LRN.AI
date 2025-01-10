import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { Text } from "react-native";
import icons from "@/constants/icons";
import Modal from "react-native-modal";
import AccentButton from "../buttons/AccentButton";

interface ErrorModalProps {
  title: string;
  subtitle: string;
  isVisible: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  title,
  subtitle,
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    // Automatically updates modal visibility when prop changes
  }, [isVisible]);

  const handleContinue = () => {
    onClose(); // Close modal on button press
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleContinue}
      onSwipeComplete={handleContinue}
      swipeDirection="down"
      style={{ justifyContent: "center", margin: 0 }}
      onBackButtonPress={handleContinue}
    >
      <View className="p-6 bg-secondaryBG rounded-3xl items-center">
        <Image source={icons.SuccessPrimary} className="w-20 h-20 mb-4" />
        <Text className="font-SegoeuiBold text-white text-2xl mb-2">
          {title}
        </Text>
        <Text className="font-SegoeuiBold text-secondary text-center mb-5">
          {subtitle}
        </Text>
        <AccentButton title="Continue" onPress={handleContinue} />
      </View>
    </Modal>
  );
};

export default ErrorModal;
