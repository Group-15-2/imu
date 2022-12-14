import React,{ useState } from 'react';
import { Pressable, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { inStyle } from '../styles/instyle';


export default function App({ navigation }) {

  return (
    <View style={inStyle.container}>
        <Text style={inStyle.head}>Register</Text>
        <View style={{marginLeft: 10}}>
            <Text style={inStyle.txt1}>Don't worry this is only between us</Text>
            </View>
        <View style={inStyle.inputContainer}>
            <View style={inStyle.inputField}>
            <TextInput style={{fontSize:16}} placeholder="Your Name"/>
            </View>
        </View>
        <View style={inStyle.inputContainer}>
            <View style={inStyle.inputField}>
            <TextInput style={{fontSize:16}} placeholder="Home Address"/>
            </View>
        </View>
        <View style={inStyle.inputContainer}>
            <View style={inStyle.inputField}>
            <TextInput style={{fontSize:16}} placeholder="Mobile Number"/>
            </View>
        </View>
        <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={() => navigation.navigate('Home')}>
            <Text style={inStyle.txt}>Register</Text>
        </TouchableOpacity>
    </View>
  );
}
