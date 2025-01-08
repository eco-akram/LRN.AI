import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Text } from "react-native";
import icons from "@/constants/icons";

const DeckListCards: React.FC<{
  card: { cardId: string; cardName: string };
  deckId: string;
}> = ({ card, deckId }) => {
  return (
    <View className="flex-row items-center justify-between gap-2 mb-2 mx-3">
      <View className="flex-row items-center gap-1">
        <Image
          source={icons.ArrowCardIcon}
          resizeMode="contain"
          style={styles.icon}
        />
        <Text className="text-white text-lg font-Segoeui">{card.cardName}</Text>
        {/*         <Text className="text-gray-500 font-semibold leading-tight">
          {card.cardId} CARD ID
        </Text>
        <Text className="text-gray-500 font-semibold leading-tight">
          {deckId} DECK ID
        </Text> */}
      </View>
      <View className="flex-row gap-1">
        <TouchableOpacity onPress={() => console.log("Edit card")}>
          <Text className="text-gray-500 font-Segoeui">Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

export default DeckListCards;
