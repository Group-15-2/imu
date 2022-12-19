import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import Timer from '../components/Timer';
import { auth } from '../firebaseConfig'
import { inStyle } from '../styles/instyle';

export default function VerifyEmail(navigation) {


    useEffect(() => {
        // let interval = setInterval(async () => {
        //     if (auth.currentUser.emailVerified) {
        //         clearInterval(interval);
        //         console.log('Account Verified!');
        //         navigation.navigate('SignUp1');
        //     }
        //     await auth.currentUser.reload();
        // }, 2000)

        // let timer = setInterval(async () => {
        //     setCount(count - 1);
        // }, 1000)

    }, []);


    const [time, setTime] = useState(0);
    const { timerColor, setTimerColor } = useState('#9A9A9A');
    const timerRef = useRef(time);


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

    return (
        <View style={inStyle.container}>
            <View style={inStyle.wrapper}>
                <Text style={inStyle.head}>Check Your Email!</Text>

                <View style={{ paddingVertical: 20 }}>
                    <Text style={inStyle.txt1}>We’ve sent a verification link to the email address you’ve provided</Text>
                </View>

                <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={inStyle.txt}>Use Another Email</Text>
                </TouchableOpacity>

                <View>
                    <Text style={{ textAlign: 'center', color: { timerColor } }}>{time}s</Text>
                </View>

                <View style={{ paddingTop: 20 }}>
                    <Text style={inStyle.txt3}>Haven’t Received it yet?</Text>
                    <TouchableOpacity activeOpacity={.7} style={inStyle.v}>
                        <Text style={inStyle.txt2}>Resend Email</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View >
    )
}
