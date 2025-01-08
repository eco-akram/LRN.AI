import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Text } from "react-native";
import icons from "@/constants/icons";

const DeckListDeck: React.FC<{
  deckName: string;
  deckId: string;
  cardCount: number;
}> = ({ deckName, deckId, cardCount }) => (
  <View className="mb-2">
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center gap-2">
        <Image
          source={icons.StackOfCards}
          resizeMode="contain"
          style={styles.icon}
        />
        <View>
          <Text className="text-white text-xl font-SegoeuiBold">
            {deckName}
          </Text>
          <Text className="text-gray-500 font-Segoeui leading-tight">
            {cardCount} {cardCount === 1 ? "card" : "cards"}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => console.log("Edit deck")}>
          <Image
            source={icons.DotsIcon}
            resizeMode="contain"
            style={styles.iconSmall}
          />
        </TouchableOpacity>
      </View>
    </View>
    <View className="border-t-2 border-gray-500 mt-2" />
  </View>
);

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  iconSmall: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});

export default DeckListDeck;
