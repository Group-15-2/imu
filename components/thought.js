import * as React from 'react';
import { Text, View } from 'react-native';
import ThoughtC from '../components/thoughtcontent'
import { thStyles } from '../styles/thstyle';

export default function Thoughts() {
  return (
    <View>
        <View style={thStyles.content}>
          <Text style={thStyles.date}>Today</Text>
        </View>
        <View >
          <ThoughtC/>
          <ThoughtC/>
        </View>
    </View>
  );
}  
