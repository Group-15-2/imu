import * as React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Card from '../components/card';



export default function Home() {
  return (
    <SafeAreaView>
      <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 16, paddingTop: 30, color: '#1877F2' }}>
          How Are You Feeling Today ?
      </Text>
      </View>
      <Card />
    </SafeAreaView>

  );
};