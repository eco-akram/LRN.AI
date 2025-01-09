import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface SubmitButtonProps {
  title: string;
  handlePress: () => void;
  isLoading: boolean;
}

const SubmitButton = ({ title, handlePress, isLoading }: SubmitButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`w-full rounded-xl flex justify-center items-center bg-white border border-white p-3 mb-4  ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-black`}>{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default SubmitButton;
