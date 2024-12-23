import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

type SecondaryButtonProps = {
  onPress: () => void; // Function called when the button is pressed
  title: string; // The text displayed on the button
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  onPress,
  title,
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="w-full rounded-xl flex flex-row justify-center items-center border border-white p-3 mb-4"
    {...props}
  >
    <Text className="text-white ">{title}</Text>
  </TouchableOpacity>
);

export default SecondaryButton;

// Maybe I have to import tailwind in the components
