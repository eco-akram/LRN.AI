import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Text } from "react-native";
import icons from "@/constants/icons";

const DeckListDeck: React.FC<{ deck: string; count: number }> = ({
  deck,
  count,
}) => (
  <View className="mb-2">
    <View className="flex-row items-center justify-start gap-2">
      <Image
        source={icons.StackOfCards}
        resizeMode="contain"
        style={styles.icon}
      />
      <View>
        <Text className="text-white text-xl font-light mt-3">{deck}</Text>
        <Text className="text-gray-500 font-semibold mb-2 leading-tight">
          {count} cards
        </Text>
      </View>
    </View>
    <View className="border-t-2 border-gray-500" />
  </View>
);

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
});

export default DeckListDeck;
