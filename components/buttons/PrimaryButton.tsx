import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

type PrimaryButtonProps = {
  onPress: () => void; // Function called when the button is pressed
  title: string; // The text displayed on the button
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  title,
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="w-full rounded-xl flex flex-row justify-center items-center bg-white p-3 mb-3 mt-3"
    {...props}
  >
    <Text className="font-Segoeui text-black">{title}</Text>
  </TouchableOpacity>
);

export default PrimaryButton;
