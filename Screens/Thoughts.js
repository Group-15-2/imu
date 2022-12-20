import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import Thought from '../components/thought';
import { thStyles } from '../styles/thstyle';

export default function Thoughts() {
  return (
    <View>
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
    </View>
  );
}   