import { useState } from "react";
import { TouchableOpacity, Text } from "react-native";

type CorrectButtonProps = {
  onPress: () => void; // Function called when the button is pressed
  title: string; // The text displayed on the button
  whenChange: boolean; // The condition to change styles
};

const CorrectButton: React.FC<CorrectButtonProps> = ({
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
          ? "bg-green-500 border-green-500"
          : "border border-green-500 bg-transparent"
      }`}
    >
      <Text
        className={`font-Segoeui ${
          whenChange ? "text-white" : "text-green-500"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CorrectButton;
