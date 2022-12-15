import React,{ useState } from 'react';
import { Keyboard, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import { inStyle } from '../styles/instyle';


export default function App({ navigation }) {

  return (
    <View style={inStyle.container}>
        <Text style={inStyle.head}>Enter OTP {'\n'}Verification Code</Text>
        <View style={{marginLeft: 10}}>
            <Text style={inStyle.txt1}>To confirm your identity we will send {'\n'}confirmation code to your phone number</Text>
        </View>
        <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={() => onPress()}>
            <Text style={inStyle.txt}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.7} style={inStyle.v} onPress={() => navigation.navigate('SignUp')}>
            <Text style={inStyle.txt1}>Resend Verification Code</Text>
        </TouchableOpacity>
    </View>
  );
}
