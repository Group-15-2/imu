import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { inStyle } from '../styles/instyle';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export default function SignInWithGoogle({ navigation }) {

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

    const onGoogleButtonPress = async () => {
        // await GoogleSignin.signOut();
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const signin = signInWithCredential(auth, googleCredential);

        const isSignedIn = await GoogleSignin.isSignedIn();
        // console.log(isSignedIn);

        if (isSignedIn) {
            navigation.navigate('Home');
        }
    }


    // if (initializing) return null;



    return (
        <View>
            <TouchableOpacity onPress={onGoogleButtonPress}>
                <Image source={require('../assets/google.png')} style={inStyle.img} />
            </TouchableOpacity>
        </View>
    );
}



