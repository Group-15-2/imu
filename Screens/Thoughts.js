import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import Thoughts from '../components/thought';
import { SafeAreaView } from 'react-native-safe-area-context';
import { thStyles } from '../styles/thstyle';

export default function Thought() {
  return (
    <SafeAreaView>
      <Text style={thStyles.header}>
        Thought Space
      </Text>
      <View style={thStyles.card}>
        <ScrollView>
          <Thoughts/>
          <Thoughts/>
          <Thoughts/>
          <Thoughts/>
          <Thoughts/>
          <Thoughts/>
          <Thoughts/>
          <Thoughts/>
          <Thoughts/>
          <Thoughts/>
          <Thoughts/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}   