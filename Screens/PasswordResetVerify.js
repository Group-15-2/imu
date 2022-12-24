import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, Pressable } from 'react-native'
// import Timer from '../components/Timer';
import { auth } from '../firebaseConfig'
import { inStyle } from '../styles/instyle';
import { sendEmailVerification, createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { emailLocal, passwordLocal } from './Register';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../styles/useTogglePasswordVisibility';
import AuthErrorCheck from '../components/services/AuthErrorCheck';

export default function PasswordResetVerify({ navigation }) {

    const [email, setEmail] = useState('');
    //real-time update password from field

    const [error, setError] = useState('');
    const [isShow1, setIsShow1] = useState('flex');
    const [isShow2, setIsShow2] = useState('none');


    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();

    //if email is verified navigating to the sing-in screen
    useEffect(() => {



    }, []);


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


    //triggers when Resend Email Button pressed
    //in this, deleting user, who previously registered
    //At the same time, creating a new user using the same credentials
    //when resend button pressed, above functions happens over and over
    //this technique was done to avoid some errors with firebase 
    const handleResendEmail = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsShow1('none');
                setIsShow2('flex');
            })
    }

    const handleSendEmail = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsShow1('none');
                setIsShow2('flex');
            })
            .catch((error) => {
                setError(error.code);
                console.log(error);
            });
    }

    return (
        <View style={inStyle.container}>
            <View style={inStyle.wrapper}>

                <View style={{ display: isShow1 }}>
                    <Text style={inStyle.head}>Password Reset</Text>

                    <View style={{ paddingVertical: 20 }}>
                        <Text style={[inStyle.txt1, { fontWeight: "400" }]}>Enter your email associated with your user account</Text>
                    </View>

                    <View style={inStyle.inputContainer}>
                        <View style={inStyle.inputField}>
                            <MaterialCommunityIcons name={'email'} size={22} color={'#BBBBBB'} />
                            <TextInput
                                style={{ fontSize: 16 }}
                                placeholder="Email"
                                onChangeText={text => setEmail(text)}
                                value={email}
                            />
                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={handleSendEmail}>
                        <Text style={inStyle.txt}>Send Verification</Text>
                    </TouchableOpacity>

                    <AuthErrorCheck error={error} />

                </View>

                <View style={{ display: isShow2 }}>

                    <Text style={inStyle.head}>Check Your Email!</Text>

                    <View style={{ paddingVertical: 20 }}>
                        <Text style={[inStyle.txt1, { fontWeight: "400" }]}>We’ve sent a verification link to {email}</Text>
                    </View>


                    <View>
                        <Text style={{ textAlign: 'center' }}>{time}s</Text>
                    </View>

                    <View style={{ paddingTop: 20 }}>
                        <Text style={inStyle.txt3}>Haven’t Received it yet?</Text>
                        <TouchableOpacity activeOpacity={.7} style={inStyle.v} onPress={handleResendEmail}>
                            <Text style={inStyle.txt2}>Resend Email</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={() => navigation.navigate('SignIn')}>
                        <Text style={inStyle.txt}>Close</Text>
                    </TouchableOpacity>

                </View>



            </View>
        </View >
    )
}
