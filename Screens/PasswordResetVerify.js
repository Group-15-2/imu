import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
// import Timer from '../components/Timer';
import { auth } from '../firebaseConfig'
import { inStyle } from '../styles/instyle';
import { sendPasswordResetEmail } from "firebase/auth";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthErrorCheck from '../components/services/AuthErrorCheck';
import InButtonLoader from '../components/InButtonLoader';

export default function PasswordResetVerify({ navigation }) {

    // getter and setter for email
    const [email, setEmail] = useState('');

    //getter and setter or error
    const [error, setError] = useState('');

    //getters and setters from display option of screen sections
    const [isShow1, setIsShow1] = useState('flex');
    const [isShow2, setIsShow2] = useState('none');

    //getters and setters for in-button loader display states
    const [issmallLoaderOn, setIsSmallLoaderOn] = useState('none');
    const [isBottonTextOn, setIsButtonTextOn] = useState('flex');

    //getters and setters for in-button loader display states
    const [issmallLoaderOn1, setIsSmallLoaderOn1] = useState('none');
    const [isBottonTextOn1, setIsButtonTextOn1] = useState('flex');

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
    const handleResendEmail = () => {
        setIsButtonTextOn('none');
        setIsSmallLoaderOn('flex');

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsButtonTextOn('flex');
                setIsSmallLoaderOn('none');
            })
    }

    //triggers when send email button pressed
    const handleSendEmail = () => {
        setIsButtonTextOn1('none');
        setIsSmallLoaderOn1('flex');

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsShow1('none');
                setIsShow2('flex');

                setIsButtonTextOn1('flex');
                setIsSmallLoaderOn1('none');
            })
            .catch((error) => {
                setError(error.code);
                console.log(error);

                setIsButtonTextOn1('flex');
                setIsSmallLoaderOn1('none');
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
                        <Text style={[inStyle.txt, { display: isBottonTextOn1 }]}>Send Verification</Text>
                        <InButtonLoader isShow={issmallLoaderOn1} />
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
                            <Text style={[inStyle.txt2, { display: isBottonTextOn }]}>Resend Email</Text>
                            <ActivityIndicator size="small" color="#1877F2" style={{ display: issmallLoaderOn }} />
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
