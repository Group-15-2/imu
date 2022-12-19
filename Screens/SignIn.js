import React, { useState } from 'react';
import { Pressable, TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import { Divider, SocialIcon } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { inStyle } from '../styles/instyle';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useTogglePasswordVisibility } from '../styles/useTogglePasswordVisibility';

export default function App({ navigation }) {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    //register users when trigger
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log('User signed in!');
                navigation.navigate('Home');

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    };

    return (
        <View style={inStyle.container}>
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
            <Divider style={inStyle.divider} />
            <View style={inStyle.v}>
                <Text style={inStyle.txt1}>Login with your Social Accounts</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={inStyle.sIcons}>
                        <TouchableOpacity>
                            <Image source={require('../assets/google.png')} style={inStyle.img} />
                        </TouchableOpacity>
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
    );
}
