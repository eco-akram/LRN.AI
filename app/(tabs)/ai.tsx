/* eslint-disable prettier/prettier */
import React, {  useState } from "react";
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
import { COHERE_API_KEY } from '@env'

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
        Based on the following input: "${inputText}" generate a concise deck name, short card names, and pairs of questions and answers. 
        The output format should be:
        Deck Name: <short and relevant deck name>
        Card:
        - Name: <short card name>
        - Question: <generated question>
        - Answer: <generated answer>
        Generate ${numQuestions} cards.
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
            Authorization: `Bearer ${COHERE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const generatedContent = response.data?.text;

      if (!generatedContent || generatedContent.trim() === "") {
        throw new Error("No content generated. Please try again.");
      }

      const lines: string[] = generatedContent.trim().split("\n");
      let deckName: string = "";
      const generatedCards: {
        cardName: string;
        frontText: string;
        backText: string;
      }[] = [];

      lines.forEach((line: string, index: number) => {
        if (line.startsWith("Deck Name:")) {
          deckName = line.replace("Deck Name: ", "").trim();
        } else if (line.startsWith("- Name:")) {
          const cardName = line.replace("- Name: ", "").trim();
          const question =
            lines[index + 1]?.replace("- Question: ", "").trim() || "";
          const answer =
            lines[index + 2]?.replace("- Answer: ", "").trim() || "";

          if (cardName && question && answer) {
            generatedCards.push({
              cardName,
              frontText: question,
              backText: answer,
            });
          }
        }
      });

      const limitedCards = generatedCards.slice(0, numQuestions);

      if (limitedCards.length === 0) {
        throw new Error("No valid card data generated. Please try again.");
      }

      if (!deckName) {
        deckName = `Deck from ${new Date().toLocaleDateString()}`;
      }

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
            <Text className="text-white text-lg font-medium font-SegoeuiBold mb-3 text-center">
            Enter text to generate a deck
            </Text>
          <View className="bg-layer2 p-2 rounded-xl font-Segoeui">
            <TextInput
              className="text-white"
              multiline
              placeholder="Type a topic like 'Basics of programming.'"
              placeholderTextColor="#848484"
              value={inputText}
              onChangeText={(text) => {
                if (text.length <= tokenLimit) setInputText(text);
              }}
            />
            <Text
              style={{
                textAlign: "right",
                color:
                  inputText.length >= tokenLimit
                    ? "#FF6B6B"
                    : "#848484", // Red near limit
                marginTop: 5,
              }}
            >
              {inputText.length}/{tokenLimit} characters
            </Text>
          </View>
          <View className="items-center mt-6">
            <Text className="text-secondary text-sm text-center mb-5 font-Segoeui">
            💡 Tip : Be Specific!
            Example: Instead of writing “History,” try “Key events in World War II” for more accurate questions and answers.
            </Text>
            <Text className="text-white text-base mb-2 font-Segoeui">
              Number of cards
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
            <Text className="text-secondary font-Segoeui text-sm mt-2">
              Limit (20) Cards
            </Text>
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity
          className="w-full bg-[#A65EE6] rounded-xl py-3 justify-center items-center"
          onPress={handleGenerate}
          disabled={loading || inputText.trim() === ""} // Disable if loading or inputText is empty
          style={{
            backgroundColor:
              loading || inputText.trim() === "" ? "#848484" : "#A65EE6", // Change color when disabled
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

/* const styles = StyleSheet.create({
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
}); */
