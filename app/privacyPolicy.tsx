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

const PrivacyPolicy = () => {
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
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.date}>Effective Date: 2025/01/15</Text>

        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.text}>
          At LRN.AI, we value your privacy and are committed to protecting your
          personal data. This Privacy Policy explains how we collect, use, and
          safeguard your information when you use our application ("the
          Program").
        </Text>

        <Text style={styles.sectionTitle}>2. Information We Collect</Text>
        <Text style={styles.text}>
          When using the Program, we may collect the following types of
          information:
        </Text>
        <Text style={styles.bullet}>
          • Personal Information: Such as your name, email address, or any other
          information you voluntarily provide.
        </Text>
        <Text style={styles.bullet}>
          • Usage Data: Information about your device, IP address, and how you
          interact with the Program.
        </Text>
        <Text style={styles.bullet}>
          • Generated Content: Any text or data you input for content
          generation.
        </Text>

        <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
        <Text style={styles.text}>We use the information collected to:</Text>
        <Text style={styles.bullet}>
          • Provide and improve the Program's features and functionality.
        </Text>
        <Text style={styles.bullet}>
          • Respond to user inquiries and provide support.
        </Text>
        <Text style={styles.bullet}>
          • Analyze usage trends to enhance user experience.
        </Text>
        <Text style={styles.bullet}>
          • Ensure compliance with legal and regulatory requirements.
        </Text>

        <Text style={styles.sectionTitle}>4. Sharing Your Information</Text>
        <Text style={styles.text}>We may share your information with:</Text>
        <Text style={styles.bullet}>
          • Third-party service providers that assist in the operation of the
          Program (e.g., APIs).
        </Text>
        <Text style={styles.bullet}>
          • Authorities when required by law or to protect our legal rights.
        </Text>

        <Text style={styles.sectionTitle}>5. Data Security</Text>
        <Text style={styles.text}>
          We implement industry-standard security measures to protect your data
          from unauthorized access, alteration, or destruction. However, no
          method of transmission over the internet is completely secure, and we
          cannot guarantee absolute security.
        </Text>

        <Text style={styles.sectionTitle}>6. Third-Party Services</Text>
        <Text style={styles.text}>
          The Program integrates with third-party services. These services have
          their own privacy policies, and we encourage you to review them.
        </Text>

        <Text style={styles.sectionTitle}>7. Your Rights</Text>
        <Text style={styles.text}>
          Depending on your location, you may have the following rights
          regarding your data:
        </Text>
        <Text style={styles.bullet}>
          • Access and review your personal data.
        </Text>
        <Text style={styles.bullet}>
          • Request correction or deletion of your data.
        </Text>
        <Text style={styles.bullet}>
          • Object to the processing of your data.
        </Text>
        <Text style={styles.bullet}>
          • Lodge a complaint with a data protection authority.
        </Text>

        <Text style={styles.sectionTitle}>8. Changes to This Policy</Text>
        <Text style={styles.text}>
          We reserve the right to update this Privacy Policy at any time.
          Changes will be effective upon posting within the Program. Continued
          use of the Program signifies acceptance of the updated policy.
        </Text>

        <Text style={styles.sectionTitle}>9. Contact Information</Text>
        <Text style={styles.text}>
          If you have questions about this Privacy Policy or your data, you can
          contact us at: [Insert Contact Email or Address]
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

export default PrivacyPolicy;
