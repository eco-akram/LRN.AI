import { FlatList, RefreshControl } from "react-native";
import { StyleSheet, Image, Platform } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentUser, getUserDecks } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import useAppwrite from "@/lib/useAppwrite";

//TODO: Learn useEffect and how promises work:

export default function Home() {
  const { user } = useGlobalContext();

  const { data: decks, refetch } = useAppwrite(() => getUserDecks(user.$id));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center ">
      <Button title="Test button"></Button>
      <FlatList
        data={decks}
        keyExtractor={(item) => item.deckName}
        renderItem={({ item }) => (
          <View>
            <Text>{item.deckName}</Text>
            <Text>{item.deckId}</Text>
          </View>
        )}
        ListHeaderComponent={() => <Text>Header</Text>}
        ListEmptyComponent={() => <Text>Empty</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
