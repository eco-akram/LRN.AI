import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

type IncorrectButtonProps = {
  onPress: () => void; // Function called when the button is pressed
  title: string; // The text displayed on the button
};

const IncorrectButton: React.FC<IncorrectButtonProps> = ({
  onPress,
  title,
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="w-full rounded-xl flex flex-row justify-center items-center border border-danger p-3 mb-4"
    {...props}
  >
    <Text className="font-Segoeui text-danger ">{title}</Text>
  </TouchableOpacity>
);

export default IncorrectButton;

// Maybe I have to import tailwind in the components
