import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

const Loading: React.FC<{ card: string }> = ({ card }) => (
  <Text className="text-white">{card}</Text>
);

export default Loading;
