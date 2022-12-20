import React, { useState, useEffect } from 'react';
import { Pressable, TextInput, View, Text, TouchableOpacity } from 'react-native';
// import { Divider, SocialIcon } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { inStyle } from '../styles/instyle';
import { useTogglePasswordVisibility } from '../styles/useTogglePasswordVisibility';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

//exports two variable data to store email and password
//this will use to resend email verification
export let emailLocal;
export let passwordLocal;


export default function register({ navigation }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  //real-time update password from field
  const [password, setPassword] = useState('');

  //real-time update repassword from field
  const [rePassword, setRePassword] = useState('');

  //real-time update email from field
  const [email, setEmail] = useState('');

  //real-time update error from field
  const [error, setError] = useState('');

  //check whether password and re-entered password matches
  //if match returns true, if not returns false
  const isPasswordMatch = () => {
    if (password == rePassword) {
      return true;
    } else {
      return false;
    }
  }

  //register users when Register button pressed
  const handleRegister = () => {
    if (isPasswordMatch()) {

      //create a user with firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('User account created!');

          //sent email verification to the currunt user
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log('Verification Sent!');
              emailLocal = email;
              passwordLocal = password;
              navigation.navigate('VerifyEmail');
            });

        })

        //errors
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setError('Email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
          }

          if (error.code === 'auth/weak-password') {
            setError('Password should be at least 6 characters!');
          }

          if (error.code === 'auth/internal-error') {
            setError('Enter fields correctly!');
          }

          console.error(error);
        });
    } else {
      setError('Re-Enter your password correctly!');
    }
  };


  return (
    <View style={inStyle.container}>
      <View style={inStyle.wrapper}>

        <Text style={inStyle.head}>Register</Text>

        <View style={inStyle.inputContainer}>
          <View style={inStyle.inputField}>
            <MaterialCommunityIcons name={'email'} size={22} color={'#BBBBBB'} />
            <TextInput
              style={{ fontSize: 16 }}
              placeholder="Email"
              textContentType="emailAddress"
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

        <View style={inStyle.inputContainer}>
          <View style={inStyle.inputField}>
            <MaterialCommunityIcons name={'lock'} size={22} color={'#BBBBBB'} />
            <TextInput
              name="rePassword"
              placeholder="Re-Enter Password"
              style={{ fontSize: 16 }}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
              secureTextEntry={passwordVisibility}
              value={rePassword}
              enablesReturnKeyAutomatically
              onChangeText={text => setRePassword(text)}
            />
          </View>
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons name={rightIcon} size={22} color="#BBBBBB" />
          </Pressable>
        </View>

        <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={handleRegister}>
          <Text style={inStyle.txt}>Next</Text>
        </TouchableOpacity>

        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>

      </View>
    </View>
  );
}
