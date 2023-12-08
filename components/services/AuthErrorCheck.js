
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { inStyle } from '../../styles/instyle';
import ReAuthenticateModal from '../ReAuthenticateModal';

export default function AuthErrorCheck({ error }) {

    const [isReAuthenticateModalOpenEmail, setReAuthenticateModalOpenEmail] = useState(false);

    //getter and setter for error massage
    const [errorMsg, setErrorMsg] = useState('');

    //re run every time errorMsg changes
    useEffect(() => {
        if (error === 'auth/user-disabled') {
            setErrorMsg(' Email has been disabled');
        }

        // if (error === 'auth/user-token-expired') {
        //     setReAuthenticateModalOpenEmail(true);
        // }

        if (error === 'auth/invalid-email') {
            setErrorMsg('Email address is invalid!');
        }

        if (error === 'auth/invalid-new-email') {
            setErrorMsg('Email address is invalid!');
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

        if (error === 'auth/requires-recent-login') {
            setErrorMsg('Requires a Re-authentication!');
        }

        if (error === 'auth/user-not-found') {
            setErrorMsg('User not found');
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

        if (error === 'auth/email-already-in-use') {
            setErrorMsg('Email already in use');
        }

        if (error === 'auth/network-request-failed') {
            setErrorMsg('Network error');
        }

        if (error === 'auth/too-many-requests') {
            setErrorMsg('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later');
        }




    }, [error]);

    return (
        <View>
            <Text style={inStyle.error}>{errorMsg}</Text>
            {/* <ReAuthenticateModal isReAuthenticateModalOpen={isReAuthenticateModalOpenEmail} setReAuthenticateModalOpen={setReAuthenticateModalOpenEmail} /> */}
        </View>
    )
}

