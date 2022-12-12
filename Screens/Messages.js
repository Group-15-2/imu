import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';
import Chat from '../components/chat';
import {chatStyles} from '../styles/chatstyle';
import { useFonts } from 'expo-font';



export default function Messages() {
  return (
    <View>
      <Text style={chatStyles.header}>
        Chats
      </Text>
      <View style={chatStyles.card}>
        <ScrollView>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
        </ScrollView>
      </View>
    </View>
  );
};