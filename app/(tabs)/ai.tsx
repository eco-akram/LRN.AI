import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccentButton from "@/components/buttons/AccentButton";
import axios from "axios";

export default function AiScreen() {
  const [inputText, setInputText] = useState(""); // For large text input
  const [numQuestions, setNumQuestions] = useState(1); // Default value for number of questions
  const [deck, setDeck] = useState<{ question: string; answer: string }[]>([]); // Generated deck state
  const [loading, setLoading] = useState(false);

  const tokenLimit = 500; // Maximum token limit

  const handleGenerate = async () => {
    console.log("Generating questions...");

    if (!inputText.trim()) {
      Alert.alert("Input Required", "Please provide input text for question generation.");
      console.log("Input is empty.");
      return;
    }

    if (numQuestions > 20) {
      Alert.alert("Limit Exceeded", "The maximum number of questions is 20.");
      console.log("Number of questions exceeds limit.");
      return;
    }

    setLoading(true);
    console.log("Loading set to true.");

    try {
      const prompt = `
        Based on the following input: "${inputText}", generate ${numQuestions} questions and answers.
        Format each question and answer as:
        Question: <generated question>
        Answer: <generated answer>
      `;

      const response = await axios.post(
        "https://api.cohere.ai/generate",
        {
          model: "command-xlarge-nightly",
          prompt: prompt,
          max_tokens: 500,
          temperature: 0.7,
          num_generations: 1,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_API_KEY`, // Replace with your actual API key
            "Content-Type": "application/json",
          },
        }
      );

      const generatedContent = response.data.generations[0]?.text;

      if (!generatedContent) {
        throw new Error("Generated content is null");
      }

      const generatedDeck: { question: string; answer: string }[] = generatedContent
        .split("\n")
        .filter((line: string) => line.startsWith("Question") || line.startsWith("Answer"))
        .reduce((acc: { question: string; answer: string }[], line: string, index: number, arr: string[]) => {
          if (line.startsWith("Question")) {
            const answerLine = arr[index + 1]?.startsWith("Answer") ? arr[index + 1] : "";
            acc.push({
              question: line.replace("Question: ", "").trim(),
              answer: answerLine.replace("Answer: ", "").trim(),
            });
          }
          return acc;
        }, []);

      setDeck(generatedDeck);
    } catch (error) {
      console.error("Error generating deck:", error);
      Alert.alert("Error", "Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-layer1 px-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
        <View className="mt-5 mb-2">
          <Text className="font-SegoeuiBlack text-white text-3xl font-bold text-center">
            LRN.AI
          </Text>
        </View>

        <Text className="text-secondary font-Segoeui text-base mb-5 text-center">
          Add text for question generating
        </Text>

        <View className="w-full relative">
          <TextInput
            className="bg-layer2 border-2 font-Segoeui border-layer3 text-white rounded-lg p-4 w-full h-48 text-base"
            multiline
            placeholder="Add text here..."
            placeholderTextColor="#848484"
            value={inputText}
            onChangeText={(text) => {
              if (text.length <= tokenLimit) {
                setInputText(text);
              }
            }}
          />
          <Text className="text-secondary font-Segoeui text-sm absolute bottom-2 right-4">
            {inputText.length}/{tokenLimit} Characters
          </Text>
        </View>

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

        <AccentButton title={loading ? "Generating..." : "Generate"} onPress={handleGenerate} disabled={loading} />

        {deck.length > 0 && (
          <View className="mt-10 w-full">
            <Text className="text-white text-xl font-SegoeuiBold mb-4">
              Generated Deck:
            </Text>
            {deck.map((card, index) => (
              <View
                key={index}
                className="mb-4 p-4 bg-layer2 rounded-lg border border-layer3"
              >
                <Text className="text-white font-Segoeui text-base">
                  Q{index + 1}: {card.question}
                </Text>
                <Text className="text-secondary font-Segoeui text-sm mt-2">
                  A: {card.answer}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
