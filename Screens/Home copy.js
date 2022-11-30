import * as React from 'react';
import { Text, View } from 'react-native';
import Card from '../components/card';
import { SearchBar } from 'react-native';


export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Card />
    </View>
  );
};