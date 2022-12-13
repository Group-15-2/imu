import React,{ useState } from 'react';
import { Pressable, TextInput, View, Text, TouchableOpacity } from 'react-native';
import {Divider} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { inStyle } from '../styles/instyle';

import { useTogglePasswordVisibility } from '../styles/useTogglePasswordVisibility';

export default function App({ navigation }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState('');

  return (
    <View style={inStyle.container}>
        <Text style={inStyle.head}>Sign In</Text>
        <View style={inStyle.inputContainer}>
            <View style={inStyle.inputField}>
            <MaterialCommunityIcons  name={'email'} size={22} color={'#BBBBBB'}/>
            <TextInput style={{fontSize:16}} placeholder="Email"/>
            </View>
        </View>
        <View style={inStyle.inputContainer}>
            <View style={inStyle.inputField}>
            <MaterialCommunityIcons  name={'lock'} size={22} color={'#BBBBBB'}/>    
            <TextInput
            name="password"
            placeholder="Password"
            style={{fontSize:16}}
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
        <TouchableOpacity activeOpacity={.7} style={inStyle.txtInt} onPress={() => navigation.navigate('Home')}>
            <Text style={inStyle.txt}>Login</Text>
        </TouchableOpacity>
        <Divider style={inStyle.divider}/>
        <View style={inStyle.v}>
        <Text style={inStyle.txt1}>Login with your Social Accounts</Text>
        </View>
    </View>
  );
}
