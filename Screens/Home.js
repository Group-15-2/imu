import * as React from 'react';
import { Text, View } from 'react-native';
import Card from '../components/card';


export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card />
    </View>
  );
};