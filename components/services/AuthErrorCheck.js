
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

        if (error === 'auth/too-many-requests') {
            setErrorMsg('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later');
        }

        if (!clearErrorState) {
            setErrorMsg('');
        }
        console.log(clearErrorState);
    }, [error, clearErrorState]);

    return (
        <View>
            <Text style={inStyle.error}>{errorMsg}</Text>
        </View>
    )
}

