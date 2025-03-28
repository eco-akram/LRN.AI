import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Text } from "react-native";
import icons from "@/constants/icons";
import Modal from "react-native-modal";
import AccentButton from "../buttons/AccentButton";
import { StyleSheet } from "react-native";

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
  const [isModalVisible, setModalVisible] = useState(isVisible);

  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  const handleContinue = () => {
    setModalVisible(false);
    onClose();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={handleContinue}
      onSwipeComplete={handleContinue}
      swipeDirection="down"
      className="flex justify-center"
      onBackButtonPress={handleContinue}
    >
      <View className="p-4 bg-layer2 rounded-3xl items-center">
        <Image source={icons.FailPrimary} style={styles.iconBig} />
        <Text className="font-SegoeuiBold text-white text-center text-2xl mb-2">
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

const styles = StyleSheet.create({
  icon: { width: 30, height: 30 },
  iconBig: { width: 65, height: 65, marginBottom: 15 },
});

export default ErrorModal;
