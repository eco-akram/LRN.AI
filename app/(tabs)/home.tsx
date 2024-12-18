import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/react-logo.png')}
        />
      }>
      <ThemedView>
        <ThemedText type="title">Welcome to Gay ass app</ThemedText>
      </ThemedView>
      <ThemedText>
        This is a blank project with a few example screens to help you get started.
      </ThemedText>
      <HelloWave />
    </ParallaxScrollView>
  );
};