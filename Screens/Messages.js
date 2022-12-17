import * as React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import Chat from '../components/chat';
import {chatStyles} from '../styles/chatstyle';
import { useFonts } from 'expo-font';



export default function Messages({navigation}) {
  return (
    <View>
      <Text style={chatStyles.header}>
        Chats
      </Text>
      <View style={chatStyles.card}>
        <ScrollView>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
            <Chat/>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};