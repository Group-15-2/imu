import React, { useState, useEffect } from 'react';
import { Pressable, TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import { Divider, SocialIcon } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { inStyle } from '../styles/instyle';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useTogglePasswordVisibility } from '../styles/useTogglePasswordVisibility';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import SignInWithGoogle from '../components/SignInWithGoogle';
import SignInWithFB from '../components/SignInWithFB';
import AuthErrorCheck from '../components/services/AuthErrorCheck';
import { setisLogOut } from './Home';
import InButtonLoader from '../components/InButtonLoader';


export default function SignIn({ navigation }) {

    //getters and setters for in-button loader display states
    const [issmallLoaderOn, setIsSmallLoaderOn] = useState('none');
    const [isBottonTextOn, setIsButtonTextOn] = useState('flex');


    //toggle password visibility option
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();

    // setters and getters for inputs
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    //getter and setter for error
    const [error, setError] = useState('');

    //register users when trigger
    const handleSignIn = () => {

        setIsButtonTextOn('none');
        setIsSmallLoaderOn('flex');

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                if (auth.currentUser.emailVerified) {
                    setError('');

                    console.log('User signed in!');
                    setisLogOut(false);
                    navigation.navigate('Home');
                } else {
                    auth.currentUser.delete();
                    setError('Email is not verified, register again!')
                }
                setIsButtonTextOn('flex');
                setIsSmallLoaderOn('none');

            })
            .catch(error => {
                setError(error.code);
                console.error(error);

                setIsButtonTextOn('flex');
                setIsSmallLoaderOn('none');
            });
    };

    return (
        <View style={inStyle.container}>
            <View style={inStyle.wrapper}>
                <Text style={inStyle.head}>Sign In</Text>
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
                <View style={inStyle.inputContainer}>
                    <View style={inStyle.inputField}>
                        <MaterialCommunityIcons name={'lock'} size={22} color={'#BBBBBB'} />
                        <TextInput
                            name="password"
                            placeholder="Password"
                            style={{ fontSize: 16 }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="newPassword"
                            secureTextEntry={passwordVisibility}
                            value={password}
                            enablesReturnKeyAutomatically
                            onChangeText={text => setPassword(text)}
                        />
                    </View>
                    <Pressable onPress={handlePasswordVisibility}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#BBBBBB" />
                    </Pressable>
                </View>
                <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={handleSignIn}>
                    <Text style={[inStyle.txt, { display: isBottonTextOn }]}>Login</Text>
                    <InButtonLoader isShow={issmallLoaderOn} />
                </TouchableOpacity>

                <AuthErrorCheck error={error} />

                <View style={{ paddingBottom: 25 }}>
                    <TouchableOpacity activeOpacity={.7} style={inStyle.v} onPress={() => navigation.navigate('PasswordResetVerify')}>
                        <Text style={inStyle.txt2}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>


                <Divider style={inStyle.divider} />

                <View style={{ marginTop: 20 }}>
                    <View style={inStyle.v}>
                        <Text style={inStyle.txt4}>Login with your Social Accounts</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={inStyle.sIcons}>
                                <SignInWithGoogle navigation={navigation} setError={setError} />
                            </View>
                        </View>
                        <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={inStyle.sIcons}>
                                <SignInWithFB navigation={navigation} setError={setError} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <View style={inStyle.v}>
                            <Text style={inStyle.txt1}>No Account ?</Text>
                        </View>
                        <TouchableOpacity activeOpacity={.7} style={inStyle.v} onPress={() => navigation.navigate('SignUp')}>
                            <Text style={inStyle.txt2}>Create One</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    );
}
