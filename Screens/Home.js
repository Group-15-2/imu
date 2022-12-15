import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import Card from '../components/card';
import { globalStyles } from '../styles/lobalStyles';


export default function Home() {
  return (
    <SafeAreaView>
      {/* heading */}
      <View style={styles.topSelector}>
        <Text style={styles.heading}>
          How are you Feeling {'\n'}today?
        </Text>
        <TouchableOpacity style={styles.button}>
          <Icon name="plus" size={16} style={styles.buttonInner} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Card />
        <Card />
        <Card />
      </ScrollView>
    </SafeAreaView>

  );
};