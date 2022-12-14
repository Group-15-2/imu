import React,{ useState } from 'react';
import { Pressable, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Divider, SocialIcon } from 'react-native-elements';
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
        <View style={{flexDirection: 'row', paddingTop: 10}}>
            <View style={{width:'50%', justifyContent:'center', alignItems:'center'}}>
            <View style={inStyle.sIcons}>
                <MaterialCommunityIcons  name={'google'} size={24} color={'#1877F2'} /> 
            </View>
            </View>
            <View style={{width:'50%', justifyContent:'center', alignItems:'center'}}>
            <View style={inStyle.sIcons}>
                <MaterialCommunityIcons  name={'facebook'} size={24} color={'#1877F2'}/> 
            </View>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center',paddingTop: 10}}>
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
