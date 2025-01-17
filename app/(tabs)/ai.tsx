import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccentButton from "@/components/buttons/AccentButton";
import axios from "axios";
import { createAiDeck, getCurrentUser } from "@/lib/appwrite"; // Ensure you import getCurrentUser

export default function AiScreen() {
    const [inputText, setInputText] = useState("");
    const [numQuestions, setNumQuestions] = useState(1);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null); // State to hold the current user's ID
    const tokenLimit = 500;

    // Fetch the current user ID on component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                console.log("Fetched User:", user);
                setUserId(user.userId); // Assuming user has userId property
            } catch (error) {
                console.error("Error fetching user:", error);
                Alert.alert("Error", "Failed to fetch user information.");
            }
        };

        fetchUser();
    }, []);

    const handleGenerate = async () => {
        if (numQuestions < 1 || numQuestions > 20) {
            Alert.alert("Limit Exceeded", "The number of questions must be between 1 and 20.");
            return;
        }

        if (!userId) {
            Alert.alert("Error", "User not found. Please log in again.");
            return; // Prevent deck creation if userId is not available
        }

        setLoading(true);

        console.log("User ID:", userId);
        

        try {
            const prompt = `
                Based on the following input: "${inputText}" The questions and answers has to be short and understandable, generate ${numQuestions} pairs of questions and answers.
                Format each pair as:
                Question: <generated question>
                Answer: <generated answer>
            `;

            console.log("Prompt:", prompt); // Debugging line

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
                        Authorization: `Bearer 3zUiPGP5a9KAm4PiOwwcdATxVrXKyk5URBspSk1G`, // Use environment variable in production
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("API Response:", response.data); // Debugging line

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

            console.log("Generated Cards:", limitedCards); // Debugging line

            if (limitedCards.length === 0) {
                throw new Error("No valid question-answer pairs generated. Please try again.");
            }

            const deckName = `Deck ${new Date().toLocaleString()}`;

            // Pass the userId when creating the deck
            await createAiDeck(deckName, limitedCards, userId);

            Alert.alert("Success", `Deck "${deckName}" has been created with ${limitedCards.length} cards.`);
        } catch (error) {
            console.error("Error generating deck:", error);
            Alert.alert("Error", "Failed to generate deck. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <SafeAreaView className="flex-1 bg-layer1 px-5">
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
                <Text className="font-SegoeuiBlack text-white text-3xl font-bold mt-5 mb-2 text-center">
                    LRN.AI
                </Text>
                <TextInput
                    className="bg-layer2 border-2 font-Segoeui border-layer3 text-white rounded-lg p-4 w-full h-48 text-base"
                    multiline
                    placeholder="Add text for question generating..."
                    placeholderTextColor="#848484"
                    value={inputText}
                    onChangeText={(text) => {
                        if (text.length <= tokenLimit) setInputText(text);
                    }}
                />
                <View className="items-center mt-6">
                    <Text className="text-secondary font-Segoeui text-base mb-2">Number of questions</Text>
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={() => setNumQuestions(Math.max(1, numQuestions - 1))}>
                            <Text className="text-white text-3xl px-4">-</Text>
                        </TouchableOpacity>
                        <Text className="text-white text-xl mx-2">{numQuestions}</Text>
                        <TouchableOpacity onPress={() => setNumQuestions(Math.min(20, numQuestions + 1))}>
                            <Text className="text-white text-3xl px-4">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <AccentButton title={loading ? "Generating..." : "Generate"} onPress={handleGenerate} disabled={loading} />
            </ScrollView>
        </SafeAreaView>
    );
}
