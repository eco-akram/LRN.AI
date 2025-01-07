import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

const DeckListCards: React.FC<{ card: string }> = ({ card }) => (
  <Text className="text-white">{card}</Text>
);

export default DeckListCards;
