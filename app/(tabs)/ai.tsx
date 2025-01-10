import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccentButton from "@/components/buttons/AccentButton";

export default function AiScreen() {
  const [inputText, setInputText] = useState(""); // For large text input
  const [numQuestions, setNumQuestions] = useState(1); // Default value for number of questions

  const handleGenerate = () => {
    if (numQuestions <= 20) {
      console.log("Generating", numQuestions, "questions for text:", inputText);
      // Add logic to pass inputText and numQuestions to your AI generation system
    } else {
      console.warn("Limit exceeded! Max is 20 questions.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-layer1 px-5 items-center">
      {/* Header */}
      <View className="mt-5 mb-2">
        <Text className="font-SegoeuiBlack text-white text-3xl font-bold text-center">
          LRN.AI
        </Text>
      </View>

      <Text className="text-secondary font-Segoeui text-base mb-5 text-center">
        Add text for question generating
      </Text>

      {/* Text Input Section */}
      <TextInput
        className="bg-layer2 border-2 font-Segoeui border-layer3 text-white rounded-lg p-4 w-full h-48 text-base"
        multiline
        placeholder="Add text here..."
        placeholderTextColor="#848484"
        value={inputText}
        onChangeText={setInputText}
      />

      {/* Number of Questions Section */}
      <View className="items-center mt-6">
        <Text className="text-secondary font-Segoeui text-base mb-2">
          Number of questions
        </Text>
        <View className="flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => setNumQuestions(Math.max(1, numQuestions - 1))}
          >
            <Text className="text-white text-3xl px-4">-</Text>
          </TouchableOpacity>
          <Text className="text-white text-xl mx-2">{numQuestions}</Text>
          <TouchableOpacity
            onPress={() => setNumQuestions(Math.min(20, numQuestions + 1))}
          >
            <Text className="text-white text-3xl px-4">+</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-secondary font-Segoeui text-sm mt-2">
          Limit (20) Questions
        </Text>
      </View>

      {/* Generate Button */}
      <AccentButton title="Generate" onPress={handleGenerate} />
    </SafeAreaView>
  );
}
