import React, { useState } from 'react';
import { Pressable, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Divider, SocialIcon } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { inStyle } from '../styles/instyle';
import { useTogglePasswordVisibility } from '../styles/useTogglePasswordVisibility';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";




export default function App({ navigation }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  //register users when trigger
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('User account created & signed in!');
        // navigation.navigate('SignUp1');
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
      <Text style={inStyle.head}>Register</Text>
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
      <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={handleRegister}>
        <Text style={inStyle.txt}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
