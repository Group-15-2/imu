import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
// import Timer from '../components/Timer';
import { auth } from '../firebaseConfig'
import { inStyle } from '../styles/instyle';
import { sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";
import { emailLocal, passwordLocal } from './Register';

//indicates whether the change Another Email Button pressed or not
export let isAnotherEmailHandled = false;

export default function VerifyEmail({ navigation }) {

    //getters and setters for in-button loader display states
    const [issmallLoaderOn, setIsSmallLoaderOn] = useState('none');
    const [isBottonTextOn, setIsButtonTextOn] = useState('flex');

    //if email is verified navigating to the sing-in screen
    useEffect(() => {
        let interval = setInterval(async () => {
            if (isAnotherEmailHandled) {
                clearInterval(interval);
            }
            if (auth.currentUser.emailVerified) {
                clearInterval(interval);
                console.log('Account Verified!');
                navigation.navigate('SignUp1');
            }
            await auth.currentUser.reload();
        }, 2000)
    }, [isAnotherEmailHandled]);

    //desable go back
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();

            //if another email button pressed or email verified, back handler will remove
            if (isAnotherEmailHandled || auth.currentUser.emailVerified) {
                navigation.dispatch(e.data.action);
            }
        });

    });


    const [time, setTime] = useState(0);
    // const { timerColor, setTimerColor } = useState('#9A9A9A');
    // const timerRef = useRef(time);
    // const timer = () => {
    //     const timerId = setInterval(() => {
    //         timerRef.current -= 1;
    //         if (timerRef.current < 0) {
    //             clearInterval(timerId);
    //         } else {
    //             setTime(timerRef.current);
    //         }
    //     }, 1000);
    //     return () => {
    //         clearInterval(timerId);
    //     };
    // }



    //triggers when Another Email Button pressed
    const handleAnotherEmail = () => {
        isAnotherEmailHandled = true;
        auth.currentUser.delete();
        navigation.navigate('SignUp');
    }

    //triggers when Resend Email Button pressed
    //in this, deleting user, who previously registered
    //At the same time, creating a new user using the same credentials
    //when resend button pressed, above functions happens over and over
    //this technique was done to avoid some errors with firebase 
    const handleResendEmail = () => {

        setIsButtonTextOn('none');
        setIsSmallLoaderOn('flex');

        //reload user data
        auth.currentUser.reload();

        //triggers only if email is not verified
        if (auth.currentUser.emailVerified == false) {

            //delete the current registered user from the firebase database
            auth.currentUser.delete();

            //then re-register the user using original credentials given by the user in Register Screen
            createUserWithEmailAndPassword(auth, emailLocal, passwordLocal)
                .then(() => {

                    //send the email verification
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            console.log('Verification Resent!');

                            setIsButtonTextOn('flex');
                            setIsSmallLoaderOn('none');
                        });
                })
                .catch(error => {
                    console.error(error);

                    setIsButtonTextOn('flex');
                    setIsSmallLoaderOn('none');
                });
        }
    }

    return (
        <View style={inStyle.container}>
            <View style={inStyle.wrapper}>

                <Text style={inStyle.head}>Check Your Email!</Text>

                <View style={{ paddingVertical: 20 }}>
                    <Text style={[inStyle.txt1, { fontWeight: "400" }]}>We’ve sent a verification link to {auth.currentUser.email}</Text>
                </View>

                <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={handleAnotherEmail}>
                    <Text style={inStyle.txt}>Use Another Email</Text>
                </TouchableOpacity>

                {/* <View>
                    <Text style={{ textAlign: 'center' }}>{time}s</Text>
                </View> */}

                <View style={{ paddingTop: 20 }}>
                    <Text style={inStyle.txt3}>Haven’t Received it yet?</Text>
                    <TouchableOpacity activeOpacity={.7} style={[inStyle.v, { display: isBottonTextOn }]} onPress={handleResendEmail}>
                        <Text style={inStyle.txt2}>Resend Email</Text>
                    </TouchableOpacity>
                    <ActivityIndicator size="small" color="#1877F2" style={{ display: issmallLoaderOn }} />
                </View>

            </View>
        </View >
    )
}
