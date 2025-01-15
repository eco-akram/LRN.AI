import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

type AccentButtonProps = {
  onPress: () => void; // Function called when the button is pressed
  title: string; // The text displayed on the button
  disabled?: boolean; //
};

const AccentButton: React.FC<AccentButtonProps> = ({
  onPress,
  title,
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="w-full rounded-xl flex flex-row justify-center items-center bg-accent p-3 mb-3 mt-3"
    {...props}
  >
    <Text className="font-Segoeui text-white">{title}</Text>
  </TouchableOpacity>
);

export default AccentButton;
