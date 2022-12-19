import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Pressable, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { inStyle } from '../styles/instyle';
import PhoneInput from "react-native-phone-number-input";
import { auth } from '../firebaseConfig';

export default function App({ navigation }) {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef < PhoneInput > (null);


    useEffect(() => {
        let interval = setInterval(async () => {
            if (auth.currentUser.emailVerified) {
                clearInterval(interval);
                console.log('Account Verified!');
                navigation.navigate('SignIn');
            }
            await auth.currentUser.reload();
        }, 2000)
    }, []);

    return (
        <View style={inStyle.container}>
            <Text style={inStyle.head}>Register</Text>
            <View style={{ marginLeft: 10 }}>
                <Text style={inStyle.txt1}>Don't worry this is only between us</Text>
            </View>
            <View style={inStyle.inputContainer}>
                <View style={inStyle.inputField}>
                    <TextInput style={{ fontSize: 16 }} placeholder="Your Name" />
                </View>
            </View>
            <View style={inStyle.inputContainer}>
                <View style={inStyle.inputField}>
                    <TextInput style={{ fontSize: 16 }} placeholder="Home Address" />
                </View>
            </View>
            <View style={inStyle.inputContainer}>
                <View style={inStyle.inputField1}>
                    {/* Add phone input         */}
                    <PhoneInput
                        useRef={phoneInput}
                        defaultValue={value}
                        defaultCode="LK"
                        containerStyle={{ width: '95%', backgroundColor: '#ECECEC', borderRadius: 10 }}
                        textContainerStyle={{ backgroundColor: '#ECECEC' }}
                        onChangeText={(text) => {
                            setValue(text);
                        }}
                        onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                        }}
                    />
                </View>
            </View>
            <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={() => navigation.navigate('SignUp2')}>
                <Text style={inStyle.txt}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}
