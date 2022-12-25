import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal, StyleSheet, TextInput, Pressable } from 'react-native';
import { inStyle } from '../styles/instyle';
import { modalStyle } from '../styles/modalStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../styles/useTogglePasswordVisibility';
import { styled } from '../styles/feedStyle';
import { updateProfile } from "firebase/auth";
import { auth } from '../firebaseConfig';
import AuthErrorCheck from './services/AuthErrorCheck';


export default function ChangeEmailModal({ visibility, setVisibility }) {

    const [email, setEmail] = useState('');

    const closeModal = () => {
        setVisibility(false);
        setEmail('');
    }

    return (
        <Modal visible={visibility} transparent={true} onRequestClose={closeModal}>
            <View style={modalStyle.changeEmailModal}>
                <View style={modalStyle.container}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={modalStyle.header}>Change Email</Text>

                        <TouchableOpacity onPress={closeModal}>
                            <MaterialCommunityIcons name={'close'} size={25} color="#BBBBBB" />
                        </TouchableOpacity>

                    </View>

                    <Text style={styled.userd}>This will change your email</Text>

                    <View style={inStyle.inputContainer}>
                        <View style={inStyle.inputField}>
                            <MaterialCommunityIcons name={'email'} size={22} color={'#BBBBBB'} />
                            <TextInput
                                style={{ fontSize: 16 }}
                                placeholder="New Email"
                                onChangeText={text => setEmail(text)}
                                value={email}
                            />
                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt}>
                        <Text style={inStyle.txt}>Next</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
}