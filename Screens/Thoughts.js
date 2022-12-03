import * as React from 'react';
import { Text, View } from 'react-native';
import Thoughts from '../components/thought';
import { thStyles } from '../styles/thstyle';

export default function Thought() {
  return (
    <View>
      <Text style={thStyles.header}>
        Thought Space
      </Text>
      <View style={thStyles.card}>
        <Thoughts/>
        <Thoughts/>
        <Thoughts/>
      </View>
    </View>
  );
}   