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


export default function SignIn({ navigation }) {
    // GoogleSignin.configure({
    //     webClientId: '167329016926-g2mgqik6qno32g0a06uov8nm83219b80.apps.googleusercontent.com',
    // });






    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    //register users when trigger
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log('User signed in!');
                navigation.navigate('Home');

            })
            .catch(error => {
                if (error.code === 'auth/user-disabled') {
                    setError(' Email has been disabled');
                }

                if (error.code === 'auth/invalid-email') {
                    setError('Email address or password is invalid!');
                }

                if (error.code === 'auth/user-not-found') {
                    setError('Email address or password is invalid!');
                }

                if (error.code === 'auth/wrong-password') {
                    setError('Password is invalid!');
                }

                console.error(error);
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
                    <Text style={inStyle.txt}>Login</Text>
                </TouchableOpacity>

                <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>

                <View style={{ paddingBottom: 25 }}>
                    <TouchableOpacity activeOpacity={.7} style={inStyle.v} onPress={() => navigation.navigate('SignUp')}>
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
                                <SignInWithGoogle />
                            </View>
                        </View>
                        <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={inStyle.sIcons}>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name={'facebook'} size={26} color={'#1877F2'} />
                                </TouchableOpacity>
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
