// filepath: /c:/Users/Aldona/Desktop/LRN.AI/app/screens/PrivacyPolicy.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Privacy Policy</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        {/* Add your privacy policy content here */}
      </Text>
    </ScrollView>
  );
};

export default PrivacyPolicy;