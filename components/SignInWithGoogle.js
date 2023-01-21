import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { inStyle } from '../styles/instyle';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { setisLogOut } from '../Screens/Home';
import { updateBackEndUserData } from './services/updateBackEndUserData';


export default function SignInWithGoogle({ navigation, setError }) {

    GoogleSignin.configure({
        webClientId: '167329016926-g2mgqik6qno32g0a06uov8nm83219b80.apps.googleusercontent.com',
    });

    //sign in with google
    const onGoogleButtonPress = async () => {

        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = GoogleAuthProvider.credential(idToken);



        // Sign-in the user with the credential
        await signInWithCredential(auth, googleCredential).then(() => {
            updateBackEndUserData();
            setisLogOut(false);
            navigation.navigate('Home');


        }).catch((e) => {
            setError(e.code);

        })
    }

    return (
        <View>
            <TouchableOpacity onPress={onGoogleButtonPress}>
                <Image source={require('../assets/google.png')} style={inStyle.img} />
            </TouchableOpacity>
        </View>

    );
}



