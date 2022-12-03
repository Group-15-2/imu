import * as React from 'react';
import {Text, View} from 'react-native';
import Chat from '../components/chat';
import {globalStyles} from '../styles/global';
import { useFonts } from 'expo-font';



export default function Messages() {
  return (
    <View>
      <Text style={globalStyles.header}>
        Chats
      </Text>
      <View style={globalStyles.card}>
        <Chat/>
        <Chat/>
        <Chat/>
        <Chat/>
      </View>
    </View>
  );
};