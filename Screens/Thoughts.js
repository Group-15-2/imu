import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
<<<<<<< HEAD
import Thoughts from '../components/thought';
import { SafeAreaView } from 'react-native-safe-area-context';
=======
import Thought from '../components/thought';
>>>>>>> ce0b7572729622aa542c5fd92a2d7a98d54c7d07
import { thStyles } from '../styles/thstyle';

export default function Thoughts() {
  return (
    <SafeAreaView>
      <Text style={thStyles.header}>
        Thought Space
      </Text>
      <View style={thStyles.card}>
        <ScrollView>
          <Thought />
          <Thought />
          <Thought />
          <Thought />
          <Thought />
          <Thought />
          <Thought />
          <Thought />
          <Thought />
          <Thought />
          <Thought />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}   