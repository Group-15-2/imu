import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal, StyleSheet, TextInput, Pressable, } from 'react-native';
import { inStyle } from '../styles/instyle';
import { modalStyle } from '../styles/modalStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../styles/useTogglePasswordVisibility';
import { styled } from '../styles/feedStyle';
import { updateProfile } from "firebase/auth";
import { auth } from '../firebaseConfig';
import AuthErrorCheck from './services/AuthErrorCheck';


let header;
let description;
let placeholder;
let iconName;
let textContentType;
let keyboardType;

export default function EditDetailModal({ type, value, visibility, setVisibility }) {

    const [text, setText] = useState('');

    useEffect(() => {
        setText(value);
    }, [value]);




    if (type == 'name') {
        header = 'Change Your Name';
        description = 'This will change your display name';
        placeholder = 'Enter Your New Name';
        iconName = 'account';
        textContentType = 'name';
        keyboardType = 'default'
    }

    if (type == 'phone-number') {
        header = 'Change Your Phone Number';
        description = 'This will change your Phone Number';
        placeholder = 'Enter Your New Phone Number';
        iconName = 'account';
        textContentType = 'telephoneNumber';
        keyboardType = 'phone-pad';
    }


    const closeModal = () => {
        setVisibility(false);
        setText(value);
    }

    const handleSave = (type) => {
        if (text == value) {

        } else {
            if (type == 'name') {
                updateProfile(auth.currentUser, {
                    displayName: text
                }).then(() => {
                    setVisibility(false);
                }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log(error);
                });
            }

            if (type == 'phone-number') {

            }

        }
    }



    return (
        <Modal animationType="slide" visible={visibility} transparent={true} onRequestClose={closeModal}>
            <View style={modalStyle.editDetailModal}>
                <View style={modalStyle.container}>

                    <Text style={modalStyle.header}>{header}</Text>

                    <Text style={styled.userd}>{description}</Text>

                    <View style={inStyle.inputContainer}>
                        <View style={inStyle.inputField}>
                            <MaterialCommunityIcons name={iconName} size={22} color={'#BBBBBB'} />
                            <TextInput
                                name="textField"
                                placeholder={placeholder}
                                style={{ fontSize: 16 }}
                                autoCapitalize="words"
                                autoCorrect={false}
                                textContentType={textContentType}
                                value={text}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={text => setText(text)}
                                selectTextOnFocus={true}
                                keyboardType={keyboardType}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
                        <TouchableOpacity onPress={closeModal}>
                            <Text style={modalStyle.optionNo}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSave(type)}>
                            <Text style={modalStyle.optionYes}>Save</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    )
}