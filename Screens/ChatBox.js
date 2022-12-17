import React,{ useState, useRef } from 'react';
import { Pressable, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { inStyle } from '../styles/instyle';

export default function ChatBox({ navigation }) {

  return (
    <View style={inStyle.container}>
        <Text style={inStyle.head}>Chat Box</Text>
    </View>
  );
}  
