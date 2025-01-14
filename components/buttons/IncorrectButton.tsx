import { useState } from "react";
import { TouchableOpacity, Text } from "react-native";

type IncorrectButtonProps = {
  onPress: () => void; // Function called when the button is pressed
  title: string; // The text displayed on the button
  whenChange: boolean; // The condition to change styles
};

const IncorrectButton: React.FC<IncorrectButtonProps> = ({
  onPress,
  title,
  whenChange,
}) => {
  return (
    <TouchableOpacity
      disabled={!whenChange}
      onPress={onPress}
      className={`w-full rounded-xl flex flex-row justify-center items-center p-3 mb-4 ${
        whenChange
          ? "bg-danger border-danger"
          : "border border-danger bg-transparent"
      }`}
    >
      <Text
        className={`font-Segoeui ${whenChange ? "text-white" : "text-danger"}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default IncorrectButton;
