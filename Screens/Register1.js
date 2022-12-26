import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { inStyle } from '../styles/instyle';
import PhoneInput from "react-native-phone-number-input";
import { auth } from '../firebaseConfig';
import { styled } from '../styles/feedStyle';
import ImagePickerScreen from '../components/ImagePickerScreen';
import LoadingModal from '../components/LoadingModal';
import { defaultPFP } from './Profile';
import { updateProfile } from 'firebase/auth';
import InButtonLoader from '../components/InButtonLoader';
import AuthErrorCheck from '../components/services/AuthErrorCheck';

export default function Register1({ navigation }) {

    // const [formattedValue, setFormattedValue] = useState("");
    // const phoneInput = useRef < PhoneInput > (null);

    const [error, setError] = useState('');

    const [PFP, setPFP] = useState();
    const [name, setName] = useState('');
    const [isLoaderOpen, setIsLoaderOpen] = useState(false);

    //getters and setters for in-button loader display states
    const [issmallLoaderOn, setIsSmallLoaderOn] = useState('none');
    const [isBottonTextOn, setIsButtonTextOn] = useState('flex');

    useEffect(() => {
        setPFP(auth.currentUser.photoURL);

        //if profile pic is black, set a default profile picture
        if (auth.currentUser.photoURL == '' || auth.currentUser.photoURL == null) {
            setIsLoaderOpen(true);
            updateProfile(auth.currentUser, {
                photoURL: defaultPFP
            }).then(() => {
                setIsLoaderOpen(false);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [auth.currentUser.photoURL]);

    const handleFinish = () => {

        if (name != '') {
            setIsButtonTextOn('none');
            setIsSmallLoaderOn('flex');

            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                navigation.navigate('SignIn');

                setIsButtonTextOn('flex');
                setIsSmallLoaderOn('none');
            }).catch((error) => {
                console.log(error);

                setIsButtonTextOn('flex');
                setIsSmallLoaderOn('none');
            });
        } else {
            setError('auth/internal-error');
        }

    }

    return (
        <View style={inStyle.container}>
            <View style={inStyle.wrapper}>



                <Text style={inStyle.head}>Register</Text>
                <View>
                    <Text style={[inStyle.txt1, { fontWeight: "400" }]}>Setup your Profile</Text>
                </View>

                <View style={styled.userinfo}>
                    <View style={{ alignSelf: 'center', paddingBottom: 5 }}>
                        <Image source={{ uri: PFP }} style={styled.userimg} />
                    </View>
                </View>

                <ImagePickerScreen setIsLoaderOpen={setIsLoaderOpen} />


                <View style={inStyle.inputContainer}>
                    <View style={inStyle.inputField}>
                        <TextInput
                            style={{ fontSize: 16 }}
                            placeholder="Your Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                </View>


                {/* <View style={inStyle.inputContainer}>
                    <View style={inStyle.inputField1}>
                        
                        <PhoneInput
                            useRef={phoneInput}
                            defaultValue={value}
                            defaultCode="LK"
                            containerStyle={{ width: '95%', backgroundColor: '#ECECEC', borderRadius: 10 }}
                            textContainerStyle={{ backgroundColor: '#ECECEC' }}
                            onChangeText={(text) => {
                                setValue(text);
                            }}
                            onChangeFormattedText={(text) => {
                                setFormattedValue(text);
                            }}
                        />
                    </View>
                </View> */}

                <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={handleFinish}>
                    <Text style={[inStyle.txt, { display: isBottonTextOn }]} >Finish</Text>
                    <InButtonLoader isShow={issmallLoaderOn} />
                </TouchableOpacity>

                <AuthErrorCheck error={error} />
            </View>

            <LoadingModal visibility={isLoaderOpen} />
        </View>
    );
}
