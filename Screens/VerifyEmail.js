import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import Timer from '../components/Timer';
import { auth } from '../firebaseConfig'
import { inStyle } from '../styles/instyle';
import { sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";
import { emailLocal, passwordLocal } from './Register';

export default function VerifyEmail({ navigation }) {


    useEffect(() => {
        let interval = setInterval(async () => {
            if (isAnotherEmailHandled) {
                clearInterval(interval);
            }
            if (auth.currentUser.emailVerified) {
                clearInterval(interval);
                console.log('Account Verified!');
                navigation.navigate('SignIn');
            }
            await auth.currentUser.reload();
        }, 2000)
    }, []);


    const [time, setTime] = useState(0);
    const { timerColor, setTimerColor } = useState('#9A9A9A');
    const timerRef = useRef(time);
    let isAnotherEmailHandled = false;
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

    const handleAnotherEmail = () => {
        isAnotherEmailHandled = true;
        auth.currentUser.delete();
        navigation.navigate('SignUp');
    }

    const handleResendEmail = () => {
        auth.currentUser.reload();
        if (auth.currentUser.emailVerified == false) {
            auth.currentUser.delete();

            createUserWithEmailAndPassword(auth, emailLocal, passwordLocal)
                .then(() => {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            // Email verification Resent!
                            console.log('Verification Resent!');
                        });

                })
                .catch(error => {
                    console.error(error);
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

                <View>
                    <Text style={{ textAlign: 'center', color: { timerColor } }}>{time}s</Text>
                </View>

                <View style={{ paddingTop: 20 }}>
                    <Text style={inStyle.txt3}>Haven’t Received it yet?</Text>
                    <TouchableOpacity activeOpacity={.7} style={inStyle.v} onPress={handleResendEmail}>
                        <Text style={inStyle.txt2}>Resend Email</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View >
    )
}
