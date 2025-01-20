import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { createAiDeck } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import SuccessModal from "@/components/modals/SuccessModal";

export default function AiScreen() {
  const [inputText, setInputText] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successModalData, setSuccessModalData] = useState({
    title: "",
    subtitle: "",
  });
  const tokenLimit = 500;

  const { user } = useGlobalContext();

  const handleGenerate = async () => {
    if (numQuestions < 1 || numQuestions > 20) {
      setSuccessModalData({
        title: "Limit Exceeded",
        subtitle: "The number of questions must be between 1 and 20.",
      });
      setSuccessModalVisible(true);
      return;
    }

    if (!user.$id) {
      setSuccessModalData({
        title: "Error",
        subtitle: "User not found. Please log in again.",
      });
      setSuccessModalVisible(true);
      return;
    }

    setLoading(true);

    try {
      const prompt = `
        Based on the following input: "${inputText}" The questions and answers have to be short and understandable, generate ${numQuestions} pairs of questions and answers.
        Format each pair as:
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
            Authorization: `Bearer [Api-Raktas]`,
            "Content-Type": "application/json",
          },
        }
      );

      const generatedContent = response.data?.text;

      if (!generatedContent || generatedContent.trim() === "") {
        throw new Error("No content generated. Please try again.");
      }

      const lines = generatedContent.trim().split("\n");
      const generatedCards = [];

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("Question:")) {
          const question = lines[i].replace("Question: ", "").trim();
          const answer = lines[i + 1]?.startsWith("Answer:") ? lines[i + 1].replace("Answer: ", "").trim() : "";
          if (question && answer) {
            const cardName = question.length > 20 ? question.substring(0, 20) : question;
            generatedCards.push({ frontText: question, backText: answer, cardName: cardName });
          }
          i++; // Move to the next line after the answer
        }
      }

      const limitedCards = generatedCards.slice(0, numQuestions);

      if (limitedCards.length === 0) {
        throw new Error("No valid question-answer pairs generated. Please try again.");
      }

      const deckName = `Deck ${new Date().toLocaleString()}`;
      await createAiDeck(deckName, limitedCards, user.$id);

      setSuccessModalData({
        title: "Success",
        subtitle: `Deck "${deckName}" has been created with ${limitedCards.length} cards.`,
      });
      setSuccessModalVisible(true);
    } catch (error) {
      console.error("Error generating deck:", error);
      setSuccessModalData({
        title: "Error",
        subtitle: "Failed to generate deck. Please try again.",
      });
      setSuccessModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 justify-between px-5 pb-5">
        {/* Header */}
        <View className="mt-5 flex-row items-center justify-center">
          <Image
            source={require("@/assets/images/LogoTop.png")}
            style={{ width: 100, height: 30, marginTop: 10 }}
          />
        </View>

        {/* Content */}
        <View className="flex-grow justify-center">
          <Text className="text-white text-lg font-medium mb-3 text-center">
            Add text for question generating
          </Text>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Add text here..."
            placeholderTextColor="#848484"
            value={inputText}
            onChangeText={(text) => {
              if (text.length <= tokenLimit) setInputText(text);
            }}
          />
          <View className="items-center mt-6">
            <Text className="text-white text-base mb-2">
              Number of questions
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                className="w-10 h-10 bg-[#141414] rounded-full justify-center items-center"
                onPress={() => setNumQuestions(Math.max(1, numQuestions - 1))}
              >
                <Text className="text-white text-2xl">-</Text>
              </TouchableOpacity>
              <Text className="text-white text-lg mx-5">{numQuestions}</Text>
              <TouchableOpacity
                className="w-10 h-10 bg-[#141414] rounded-full justify-center items-center"
                onPress={() => setNumQuestions(Math.min(20, numQuestions + 1))}
              >
                <Text className="text-white text-2xl">+</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-gray-500 text-sm mt-2">
              Limit (20) Questions
            </Text>
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity
  className="w-full bg-[#A65EE6] rounded-xl py-4 justify-center items-center"
  onPress={handleGenerate}
  disabled={loading || inputText.trim() === ""} // Disable if loading or inputText is empty
  style={{
    backgroundColor: loading || inputText.trim() === "" ? "#848484" : "#A65EE6", // Change color when disabled
  }}
>
  <Text className="text-white text-lg font-bold">
    {loading ? "Generating..." : "Generate"}
  </Text>
</TouchableOpacity>

      </View>

      {/* Success Modal */}
      <SuccessModal
        title={successModalData.title}
        subtitle={successModalData.subtitle}
        isVisible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#141414",
    borderColor: "#321353",
    borderWidth: 2,
    color: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    height: "50%", // Set height to 50% of the parent container
    fontSize: 16,
    marginBottom: 20,
  },
});
