import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { inStyle } from '../styles/instyle';
import { FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { MaterialCommunityIcons } from '@expo/vector-icons';
<<<<<<< HEAD
//import { LoginManager } from 'react-native-fbsdk-next';
=======
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { setisLogOut } from '../Screens/Home';
>>>>>>> origin/authentication

export default function SignInWithFB({ navigation, setError }) {

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

<<<<<<< HEAD
    // const onFBButtonPress = async () => {
    //     LoginManager.logOut();
    //     LoginManager.logInWithPermissions(["public_profile"]).then(
    //         function (result) {
    //             if (result.isCancelled) {
    //                 console.log("Login cancelled");
    //             } else {
    //                 console.log(
    //                     "Login success with permissions: " +
    //                     result.grantedPermissions.toString()
    //                 );
    //                 navigation.navigate('Home');
    //             }
    //         },
    //         function (error) {
    //             console.log("Login fail with error: " + error);
    //         }
    //     );

    // }
=======
    const onFBButtonPress = async () => {
        LoginManager.logInWithPermissions(["public_profile", 'email']);
        const data = await AccessToken.getCurrentAccessToken();

        const facebookCredentials = FacebookAuthProvider.credential(data.accessToken);
        await signInWithCredential(auth, facebookCredentials).then(() => {
            setisLogOut(false);
            navigation.navigate('Home');
        }
        ).catch((e) => {
            setError(e.code);
            console.log("Login fail with error: " + e)
        })
    }
>>>>>>> origin/authentication

    // if (initializing) return null;




    return (
        <View>
            <TouchableOpacity onPress={onFBButtonPress}>
                <MaterialCommunityIcons name={'facebook'} size={26} color={'#1877F2'} />
            </TouchableOpacity>
        </View>
    );
}



