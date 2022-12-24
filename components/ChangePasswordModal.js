import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal, StyleSheet, TextInput, Pressable } from 'react-native';
import { inStyle } from '../styles/instyle';
import { modalStyle } from '../styles/modalStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../styles/useTogglePasswordVisibility';
import { styled } from '../styles/feedStyle';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import AuthErrorCheck from './services/AuthErrorCheck';

export default function ChangePasswordModal({ isChangePasswordModalOpen, setChangePasswordModalOpen }) {

    //real-time update password from field
    const [password, setPassword] = useState('');

    //real-time update repassword from field
    const [rePassword, setRePassword] = useState('');

    const [error, setError] = useState('');

    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();

    const closeChangePasswordModal = () => {
        setChangePasswordModalOpen(false);
        setPassword('');
        setRePassword('');
    }

    const handleChangePassword = () => {
        if (password.length > 0) {
            if (password == rePassword) {
                updatePassword(auth.currentUser, password).then(() => {
                    console.log('password updated');
                    setChangePasswordModalOpen(false);
                    setPassword('');
                    setRePassword('');
                }).catch((error) => {
                    setError(error.code);
                    console.log(error);
                });
            } else {
                setError('auth/password-not-match');
            }
        } else {
            setError('auth/weak-password');
        }
    }





    return (
        <Modal animationType="slide" visible={isChangePasswordModalOpen} transparent={true} onRequestClose={closeChangePasswordModal}>
            <View style={styles.reAuthenticateModal}>
                <View style={modalStyle.container}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={modalStyle.header}>Change Your Password</Text>

                        <TouchableOpacity onPress={closeChangePasswordModal}>
                            <MaterialCommunityIcons name={'close'} size={25} color="#BBBBBB" />
                        </TouchableOpacity>

                    </View>

                    <Text style={styled.userd}>Enter Your New Password</Text>

                    <View style={inStyle.inputContainer}>
                        <View style={inStyle.inputField}>
                            <MaterialCommunityIcons name={'lock'} size={22} color={'#BBBBBB'} />
                            <TextInput
                                name="password"
                                placeholder="New Password"
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

                    <View style={inStyle.inputContainer}>
                        <View style={inStyle.inputField}>
                            <MaterialCommunityIcons name={'lock'} size={22} color={'#BBBBBB'} />
                            <TextInput
                                name="rePassword"
                                placeholder="Re-Enter New Password"
                                style={{ fontSize: 16 }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType="newPassword"
                                secureTextEntry={passwordVisibility}
                                value={rePassword}
                                enablesReturnKeyAutomatically
                                onChangeText={text => setRePassword(text)}
                            />
                        </View>
                        <Pressable onPress={handlePasswordVisibility}>
                            <MaterialCommunityIcons name={rightIcon} size={22} color="#BBBBBB" />
                        </Pressable>
                    </View>

                    <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={handleChangePassword}>
                        <Text style={inStyle.txt}>Change Password</Text>
                    </TouchableOpacity>

                    <AuthErrorCheck error={error} />

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