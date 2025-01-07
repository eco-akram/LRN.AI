import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Text } from "react-native";
import icons from "@/constants/icons";

const DeckListCards: React.FC<{ card: string }> = ({ card }) => (
  <View className="flex-row items-center justify-between gap-2 mb-2 mx-3">
    <View className="flex-row items-center gap-1">
      <Image
        source={icons.ArrowCardIcon}
        resizeMode="contain"
        style={styles.icon}
      />
      <Text className="text-white text-lg font-medium">{card}</Text>
    </View>
    <View className="flex-row gap-1">
      <TouchableOpacity onPress={() => console.log("Edit card")}>
        <Text className="text-gray-500">Edit</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

export default DeckListCards;
