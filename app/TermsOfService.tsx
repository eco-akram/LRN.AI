import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const TermsOfService = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={20}
          onPress={() => router.push("/home")}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.date}>Effective Date: 2025/01/15</Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By using the LRN.AI application ("the Program"), you agree to these
          Terms of Service ("ToS"). If you do not agree with these terms, you
          must not access or use the Program.
        </Text>

        <Text style={styles.sectionTitle}>2. Program Description</Text>
        <Text style={styles.text}>
          LRN.AI is an application designed to assist users in generating
          educational content, such as questions and answers, based on
          user-provided text. The Program relies on third-party APIs (e.g.,
          Cohere AI) for certain functionalities.
        </Text>

        <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
        <Text style={styles.text}>As a user of the Program, you agree to:</Text>
        <Text style={styles.bullet}>
          • Provide accurate and lawful input for content generation.
        </Text>
        <Text style={styles.bullet}>
          • Use the Program in compliance with all applicable laws and
          regulations.
        </Text>
        <Text style={styles.bullet}>
          • Avoid using the Program for harmful, defamatory, or unlawful
          purposes.
        </Text>
        <Text style={styles.text}>
          You are responsible for maintaining the confidentiality of your device
          and access credentials used to interact with the Program.
        </Text>

        <Text style={styles.sectionTitle}>4. Restrictions</Text>
        <Text style={styles.text}>You agree not to:</Text>
        <Text style={styles.bullet}>
          • Reverse engineer, decompile, or disassemble the Program.
        </Text>
        <Text style={styles.bullet}>
          • Use the Program in a manner that could disable, overburden, or
          impair its functionality.
        </Text>
        <Text style={styles.bullet}>
          • Use automated means (e.g., bots or scripts) to access the Program.
        </Text>
        <Text style={styles.bullet}>
          • Use the Program to generate or distribute offensive, harmful, or
          illegal content.
        </Text>

        <Text style={styles.sectionTitle}>5. Intellectual Property</Text>
        <Text style={styles.text}>
          The Program, including its name, design, features, and content
          generated using its proprietary algorithms, is the intellectual
          property of the developer(s) of LRN.AI. You may not copy, modify, or
          redistribute the Program or its components without prior written
          consent.
        </Text>

        <Text style={styles.sectionTitle}>6. Content Disclaimer</Text>
        <Text style={styles.text}>
          The Program generates content based on user input using AI technology.
          While we strive to ensure accuracy and relevance, generated content:
        </Text>
        <Text style={styles.bullet}>
          • May not always be accurate, reliable, or complete.
        </Text>
        <Text style={styles.bullet}>
          • Should be reviewed by users before application in critical or
          professional contexts.
        </Text>
        <Text style={styles.text}>
          The developer(s) of LRN.AI are not liable for errors, omissions, or
          any consequences arising from the use of generated content.
        </Text>

        <Text style={styles.sectionTitle}>7. Third-Party Services</Text>
        <Text style={styles.text}>
          The Program integrates with third-party services, such as APIs, to
          enhance functionality. By using the Program, you acknowledge and
          accept that:
        </Text>
        <Text style={styles.bullet}>
          • Your data may be shared with third-party providers as necessary for
          the Program to operate.
        </Text>
        <Text style={styles.bullet}>
          • The developer(s) of LRN.AI are not responsible for any issues,
          errors, or liabilities arising from the use of third-party services.
        </Text>

        <Text style={styles.sectionTitle}>8. Privacy</Text>
        <Text style={styles.text}>
          The Program collects and processes user data in accordance with its
          Privacy Policy, which is incorporated by reference into these Terms of
          Service. [Link to Privacy Policy, if applicable.]
        </Text>

        <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
        <Text style={styles.text}>
          To the fullest extent permitted by law, the developer(s) of LRN.AI
          shall not be liable for:
        </Text>
        <Text style={styles.bullet}>
          • Indirect, incidental, or consequential damages arising from the use
          or inability to use the Program.
        </Text>
        <Text style={styles.bullet}>
          • Any loss or damage to data or hardware resulting from the use of the
          Program.
        </Text>

        <Text style={styles.sectionTitle}>10. Indemnification</Text>
        <Text style={styles.text}>
          You agree to indemnify and hold harmless the developer(s) of LRN.AI
          from any claims, damages, or liabilities arising from your use of the
          Program, including violations of these ToS.
        </Text>

        <Text style={styles.sectionTitle}>11. Modifications to Terms</Text>
        <Text style={styles.text}>
          We reserve the right to modify these ToS at any time. Changes will be
          effective immediately upon posting within the Program. Continued use
          of the Program after changes constitutes acceptance of the modified
          ToS.
        </Text>

        <Text style={styles.sectionTitle}>12. Termination</Text>
        <Text style={styles.text}>
          We reserve the right to terminate or suspend your access to the
          Program at any time for violations of these ToS or at our discretion.
        </Text>

        <Text style={styles.sectionTitle}>13. Governing Law</Text>
        <Text style={styles.text}>
          These ToS are governed by the laws of [Insert Jurisdiction]. Any
          disputes arising from or relating to these ToS shall be subject to the
          exclusive jurisdiction of the courts of [Insert Jurisdiction].
        </Text>

        <Text style={styles.sectionTitle}>14. Contact Information</Text>
        <Text style={styles.text}>
          If you have questions or concerns about these ToS, you may contact us
          at: [Insert Contact Email or Address]
        </Text>
        <Text style={styles.sectionTitle}>Program Creators</Text>
        <Text style={styles.text}>
          Klaipėda State College, Informatics and Electrical Engineering
          Department
        </Text>
        <Text style={styles.text}>
          I21-2{"\n"}Lukas Čiesna,{"\n"}Akram Abdel-Latif
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#0A0A0A",
  },
  header: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    padding: 10,
  },
  closeButton: {
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#fff",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
    marginBottom: 10,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 10,
    marginBottom: 5,
    color: "#fff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
});

export default TermsOfService;
