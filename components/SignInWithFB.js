import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { inStyle } from '../styles/instyle';
import { FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

export default function SignInWithFB({ navigation }) {

    // Set an initializing state whilst Firebase connects
    // const [initializing, setInitializing] = useState(true);
    // const [user, setUser] = useState('');

    // Handle user state changes
    // function onAuthStateChanged() {
    //     setUser(user);
    //     if (initializing) setInitializing(false);
    // }

    // useEffect(() => {
    //     const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, []);

    const onFBButtonPress = async () => {
        LoginManager.logInWithPermissions(["public_profile", 'email']);
        const data = await AccessToken.getCurrentAccessToken();

        const facebookCredentials = FacebookAuthProvider.credential(data.accessToken);
        await signInWithCredential(auth, facebookCredentials).then(() => {
            navigation.navigate('Home');
        }
        ).catch((e) => {
            console.log("Login fail with error: " + e)
        })
    }

    // if (initializing) return null;




    return (
        <View>
            <TouchableOpacity onPress={onFBButtonPress}>
                <MaterialCommunityIcons name={'facebook'} size={26} color={'#1877F2'} />
            </TouchableOpacity>
        </View>
    );
}



