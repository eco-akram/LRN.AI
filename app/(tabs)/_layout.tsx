import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, Text, Image } from "react-native";
import icons from "@/constants/icons";
import { StatusBar } from "expo-status-bar";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View className="flex-1 items-center justify-start gap-1 w-16">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`text-xs text-nowrap text-center`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#777777",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#000000",
            borderTopWidth: 0.5,
            borderTopColor: "#141414",
            height: 110,
          },
        }}
      >
        <Tabs.Screen
          name="ai"
          options={{
            animation: "fade",
            title: "Ai",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.AiIcon}
                color={color}
                name="Ai"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            animation: "fade",
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.HomeIcon}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="decks"
          options={{
            animation: "fade",
            title: "Decks",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.DecksIcon}
                color={color}
                name="Decks"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar />
    </>
  );
}
