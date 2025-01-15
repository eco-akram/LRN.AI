import { Text, View } from "react-native";

const UserStatistics = () => {
  return (
    <View className="flex-row justify-between mb-5">
      <View className="bg-layer2 border-2 border-layer3 justify-center rounded-xl p-5 flex-2 mr-2">
        <Text className="text-xl font-SegoeuiBold text-white">Streak</Text>
        <Text className="text-2xl font-SegoeuiBold text-white">🔥 7</Text>
      </View>
      <View className="bg-layer2 border-2 border-layer3 rounded-xl p-5 flex-1 ml-2">
        <Text className="text-xl font-SegoeuiBold text-white">
          Today you reviewed:
        </Text>
        <Text className="text-2xl font-SegoeuiBold text-white mt-1">📈 21</Text>
      </View>
    </View>
  );
};

export default UserStatistics;
