
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { inStyle } from '../../styles/instyle';

export default function AuthErrorCheck({ error, clearErrorState }) {

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (error === 'auth/user-disabled') {
            setErrorMsg(' Email has been disabled');
        }

        if (error === 'auth/invalid-email') {
            setErrorMsg('Email address or password is invalid!');
        }

        if (error === 'auth/user-not-found') {
            setErrorMsg('Email address or password is invalid!');
        }

        if (error === 'auth/wrong-password') {
            setErrorMsg('Password is invalid!');
        }

        if (error === 'auth/internal-error') {
            setErrorMsg('Enter fields correctly!');
        }

        if (error === 'auth/password-not-match') {
            setErrorMsg('Re-enter your password correctly!');
        }

        if (error === 'auth/weak-password') {
            setErrorMsg('Password should be at least 6 characters!');
        }

        if (error === 'auth/missing-email') {
            setErrorMsg('No user account associated with this email');
        }

        if (error === 'auth/account-exists-with-different-credential') {
            setErrorMsg('Account exists with different credentials');
        }

        if (error === 'auth/too-many-requests') {
            setErrorMsg('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later');
        }


    }, [error]);

    return (
        <View>
            <Text style={inStyle.error}>{errorMsg}</Text>
        </View>
    )
}

