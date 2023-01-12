import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal, StyleSheet, TextInput, Pressable } from 'react-native';
import { inStyle } from '../styles/instyle';
import { modalStyle } from '../styles/modalStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../styles/useTogglePasswordVisibility';
import { styled } from '../styles/feedStyle';
import { updateEmail, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
import { auth } from '../firebaseConfig';
import AuthErrorCheck from './services/AuthErrorCheck';
import ConfirmModal from './ConfirmModal';
import InButtonLoader from './InButtonLoader';


export default function ChangeEmailModal({ visibility, setVisibility }) {


    //getters and setters for in-button loader display states
    const [issmallLoaderOn, setIsSmallLoaderOn] = useState('none');
    const [isBottonTextOn, setIsButtonTextOn] = useState('flex');

    //getters and setters for in-button loader display states(resend email button)
    const [issmallLoaderOn1, setIsSmallLoaderOn1] = useState('none');
    const [isBottonTextOn1, setIsButtonTextOn1] = useState('flex');

    const [email, setEmail] = useState('');

    const [error, setError] = useState('');

    const [isChildModalOpen, setIsChildModalOpen] = useState(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [isLastModalOpen, setIsLastModalOpen] = useState(false);

    const closeModal = () => {
        setVisibility(false);
        setEmail('');
    }

    const closeChildModal = () => {
        setError('');
        setIsChildModalOpen(false);
    }

    const closeLastModal = () => {
        setEmail('');
        setError('');
        setIsLastModalOpen(false);
    }

    const handleNext = () => {
        if (email != '') {
            setVisibility(false);
            setIsChildModalOpen(true);
            setError('');
        } else {
            setError('auth/internal-error');
        }
    }

    const handleAnotherEmail = () => {
        setError('');
        setIsChildModalOpen(false);
        setVisibility(true);
    }

    const handleUpdateEmail = () => {
        setConfirmModalOpen(true);
    }

    const changeEmail = () => {
        setIsButtonTextOn('none');
        setIsSmallLoaderOn('flex');

        verifyBeforeUpdateEmail(auth.currentUser, email).then(() => {
            setIsChildModalOpen(false);
            setIsLastModalOpen(true);

            setError('');

            setIsButtonTextOn('flex');
            setIsSmallLoaderOn('none');
        }).catch((error) => {
            console.log(error);
            setError(error.code);

            setIsButtonTextOn('flex');
            setIsSmallLoaderOn('none');
        });

    }

    const handleYes = () => {
        setConfirmModalOpen(false);
        changeEmail();
    }

    const handleResendEmail = () => {
        setIsButtonTextOn1('none');
        setIsSmallLoaderOn1('flex');
        verifyBeforeUpdateEmail(auth.currentUser, email).then(() => {
            setError('');

            setIsButtonTextOn1('flex');
            setIsSmallLoaderOn1('none');
        }).catch((error) => {
            console.log(error);
            setError(error.code);

            setIsButtonTextOn1('flex');
            setIsSmallLoaderOn1('none');
        });
    }

    return (
        <View>

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

                        <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={handleNext}>
                            <Text style={inStyle.txt}>Next</Text>
                        </TouchableOpacity>

                        <AuthErrorCheck error={error} />

                    </View>
                </View>
            </Modal>

            <Modal visible={isChildModalOpen} transparent={true} onRequestClose={closeChildModal}>
                <View style={modalStyle.changeEmailModal}>
                    <View style={modalStyle.container}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={modalStyle.header}>Change Email to {email}</Text>

                            <TouchableOpacity onPress={closeChildModal}>
                                <MaterialCommunityIcons name={'close'} size={25} color="#BBBBBB" />
                            </TouchableOpacity>

                        </View>

                        <Text style={[styled.userd, { color: 'red', fontSize: 15, fontWeight: 'bold', paddingTop: 10 }]}>Make sure you entered your email correctly!</Text>


                        <TouchableOpacity activeOpacity={.7} style={[inStyle.txtInt, { backgroundColor: 'red' }]} onPress={handleUpdateEmail}>
                            <Text style={[inStyle.txt, { display: isBottonTextOn }]}>Update Email</Text>
                            <InButtonLoader isShow={issmallLoaderOn} />
                        </TouchableOpacity>

                        <AuthErrorCheck error={error} />



                        <Text style={[styled.userd, { color: 'white', fontSize: 15, fontWeight: 'bold', paddingTop: 10 }]}>If entered email is not correct, go change it back correctly!</Text>

                        <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={handleAnotherEmail}>
                            <Text style={inStyle.txt}>Use Another Email</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <Modal visible={isLastModalOpen} transparent={true} onRequestClose={closeLastModal}>
                <View style={modalStyle.changeEmailModal}>
                    <View style={modalStyle.container}>

                        <Text style={modalStyle.header}>Verify Email</Text>
                        <Text style={styled.userd}>We've sent a verification email to {email}</Text>

                        <Text style={[styled.userd, { color: 'white', fontSize: 15, fontWeight: 'bold', paddingTop: 10 }]}>Go to your email and verify it to update your new email</Text>

                        <TouchableOpacity activeOpacity={.7} style={inStyle.v} onPress={handleResendEmail}>
                            <Text style={[inStyle.txt2, { display: isBottonTextOn1 }]}>Resend Email</Text>
                            <InButtonLoader isShow={issmallLoaderOn1} />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={closeLastModal}>
                            <Text style={inStyle.txt}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ConfirmModal
                isConfirmModalOpen={isConfirmModalOpen}
                setConfirmModalOpen={setConfirmModalOpen}
                subject={'Do you really want to change your email to ' + email}
                onPress={handleYes}
            />

        </View>
    )
}