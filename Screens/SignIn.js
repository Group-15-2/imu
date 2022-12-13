import * as React from 'react';
import { Text, View, Button } from 'react-native';

export default function SignIn ({navigation}) {
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Login" onPress={() => navigation.navigate('Home')}/>
            <Text>or</Text>
            <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')}/>
        </View>
    );
}