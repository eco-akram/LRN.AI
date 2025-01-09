import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Text } from "react-native";
import icons from "@/constants/icons";
import Modal from "react-native-modal";
import PrimaryButton from "../buttons/PrimaryButton";
import AccentButton from "../buttons/AccentButton";

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
      <View className="p-4 bg-secondaryBG rounded-3xl items-center">
        <Image source={icons.SuccessPrimary} style={styles.iconBig} />
        <Text className="font-SegoeuiBold text-white text-2xl mb-2">
          {title}
        </Text>
        <Text className="font-SegoeuiBold text-secondary mb-5">{subtitle}</Text>
        <AccentButton title="Continue" onPress={handleContinue} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  icon: { width: 30, height: 30 },
  iconBig: { width: 80, height: 80, marginBottom: 10 },
});

export default SuccessModal;
