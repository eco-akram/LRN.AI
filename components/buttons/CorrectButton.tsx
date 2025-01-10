import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

type CorrectButtonProps = {
  onPress: () => void; // Function called when the button is pressed
  title: string; // The text displayed on the button
};

//TODO: WHEN SOMETHING HAPPENS (CREATE PROF FOR THAT), ONLY THEN THE CARD ACTIVATES AND CHANGES BG TO FILL AND TEXT TO WHITE

const CorrectButton: React.FC<CorrectButtonProps> = ({
  onPress,
  title,
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="w-full rounded-xl flex flex-row justify-center items-center border border-green-500 p-3 mb-4"
    {...props}
  >
    <Text className="font-Segoeui text-green-500">{title}</Text>
  </TouchableOpacity>
);

export default CorrectButton;

// Maybe I have to import tailwind in the components
