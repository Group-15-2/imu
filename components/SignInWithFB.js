import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { inStyle } from '../styles/instyle';
import { FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AccessToken, LoginManager, } from 'react-native-fbsdk-next';
import { setisLogOut } from '../Screens/Home';
import { updateBackEndUserData } from './services/updateBackEndUserData';

export default function SignInWithFB({ navigation, setError }) {

    //login with fb
    const onFBButtonPress = async () => {
        LoginManager.logInWithPermissions(["public_profile", 'email']);
        const data = await AccessToken.getCurrentAccessToken();

        const facebookCredentials = FacebookAuthProvider.credential(data.accessToken);
        await signInWithCredential(auth, facebookCredentials).then(() => {
            updateBackEndUserData();
            setisLogOut(false);
            navigation.navigate('Home');
        }
        ).catch((e) => {
            setError(e.code);
            console.log("Login fail with error: " + e);
        })
    }

    return (
        <View>
            <TouchableOpacity onPress={onFBButtonPress}>
                <MaterialCommunityIcons name={'facebook'} size={26} color={'#1877F2'} />
            </TouchableOpacity>
        </View>
    );
}



