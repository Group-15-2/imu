import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import Thought from '../components/thought';
import { thStyles } from '../styles/thstyle';

export default function Thoughts() {
  return (
    <View>
        <ScrollView>
        <Text style={thStyles.header}>
          Thought Space
        </Text>
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
  );
}   