import { SafeAreaView, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Image } from "expo-image";

const Loading: React.FC = () => (
  <SafeAreaView className="flex-1 bg-black items-center justify-center">
    <Image
      source={require("../assets/loaderGif.gif")}
      contentFit="cover"
      style={{ width: 80, height: 40 }}
    />
  </SafeAreaView>
);

export default Loading;
