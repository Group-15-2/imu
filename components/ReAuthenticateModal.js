import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal, StyleSheet, TextInput, Pressable } from 'react-native';
import { inStyle } from '../styles/instyle';
import { modalStyle } from '../styles/modalStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../styles/useTogglePasswordVisibility';
import { styled } from '../styles/feedStyle';
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from '../firebaseConfig';
import AuthErrorCheck from './services/AuthErrorCheck';

export default function ReAuthenticateModal({ isReAuthenticateModalOpen, setReAuthenticateModalOpen, setActionModalOpen }) {

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();

    const closeReAuthenticateModal = () => {
        setReAuthenticateModalOpen(false);
        setPassword('');
    }

    const handleNext = () => {
        const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            console.log('re-authenticated');
            setReAuthenticateModalOpen(false);
            setActionModalOpen(true);
            setPassword('');

        }).catch((error) => {
            setError(error.code);
            console.log(error);
        });
    }



    return (
        <Modal animationType="slide" visible={isReAuthenticateModalOpen} transparent={true} onRequestClose={closeReAuthenticateModal}>
            <View style={styles.reAuthenticateModal}>
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
                        <Text style={inStyle.txt}>Next</Text>
                    </TouchableOpacity>

                    <AuthErrorCheck error={error} clearErrorState={isReAuthenticateModalOpen} />

                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    reAuthenticateModal: {
        position: 'relative',
        minHeight: '25%',
        width: '90%',
        backgroundColor: '#25292e',
        alignSelf: 'center',
        borderRadius: 10,
        top: '25%'
    }
})