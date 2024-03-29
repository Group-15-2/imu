import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal, StyleSheet, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { inStyle } from '../styles/instyle';
import { modalStyle } from '../styles/modalStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../styles/useTogglePasswordVisibility';
import { styled } from '../styles/feedStyle';
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from '../firebaseConfig';
import AuthErrorCheck from './services/AuthErrorCheck';
import InButtonLoader from './InButtonLoader';

export default function ReAuthenticateModal({ isReAuthenticateModalOpen, setReAuthenticateModalOpen, setActionModalOpen }) {

    //getter and setter for password
    const [password, setPassword] = useState('');

    //getter and setter for error
    const [error, setError] = useState('');

    //getters and setters for in-button loader display states
    const [issmallLoaderOn, setIsSmallLoaderOn] = useState('none');
    const [isBottonTextOn, setIsButtonTextOn] = useState('flex');

    //toggle password visibility
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();

    //reauthenticate modal close function
    const closeReAuthenticateModal = () => {
        setReAuthenticateModalOpen(false);
        setPassword('');
        setError('');
    }

    //next function
    const handleNext = () => {
        setIsButtonTextOn('none');
        setIsSmallLoaderOn('flex');

        //reauthenticate user
        const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            console.log('re-authenticated');
            setReAuthenticateModalOpen(false);
            setActionModalOpen(true);
            setPassword('');
            setError('');

            setIsButtonTextOn('flex');
            setIsSmallLoaderOn('none');

        }).catch((error) => {
            setError(error.code);
            console.log(error);

            setIsButtonTextOn('flex');
            setIsSmallLoaderOn('none');
        });
    }



    return (
        <Modal animationType="slide" visible={isReAuthenticateModalOpen} transparent={true} onRequestClose={closeReAuthenticateModal}>
            <View style={modalStyle.reAuthenticateModal}>
                <View style={modalStyle.container}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={modalStyle.header}>Re-authenticate</Text>

                        <TouchableOpacity onPress={closeReAuthenticateModal}>
                            <MaterialCommunityIcons name={'close'} size={25} color="#BBBBBB" />
                        </TouchableOpacity>

                    </View>

                    <Text style={styled.userd}>Enter Your password to validate you</Text>

                    <View style={inStyle.inputContainer}>
                        <View style={inStyle.inputField}>
                            <MaterialCommunityIcons name={'lock'} size={22} color={'#BBBBBB'} />
                            <TextInput
                                name="password"
                                placeholder="Password"
                                style={{ fontSize: 16 }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType="newPassword"
                                secureTextEntry={passwordVisibility}
                                value={password}
                                enablesReturnKeyAutomatically
                                onChangeText={text => setPassword(text)}
                            />
                        </View>
                        <Pressable onPress={handlePasswordVisibility}>
                            <MaterialCommunityIcons name={rightIcon} size={22} color="#BBBBBB" />
                        </Pressable>
                    </View>

                    <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={handleNext}>
                        <Text style={[inStyle.txt, { display: isBottonTextOn }]}>Next</Text>
                        <InButtonLoader isShow={issmallLoaderOn} />

                    </TouchableOpacity>

                    <AuthErrorCheck error={error} />

                </View>
            </View>

        </Modal>
    )
}
