import * as React from 'react';
import { Text, View, Button } from 'react-native';

export default function SignUp ({navigation}) {
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Login" onPress={() => navigation.navigate('SignIn')}>
                Login
              </Button>
        </View>
    );
}