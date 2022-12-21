import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { inStyle } from '../styles/instyle';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk-next';

export default function SignInWithFB({ navigation }) {

    GoogleSignin.configure({
        webClientId: '167329016926-g2mgqik6qno32g0a06uov8nm83219b80.apps.googleusercontent.com',
    });


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
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                    navigation.navigate('Home');
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );

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



