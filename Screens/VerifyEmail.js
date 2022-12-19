import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { auth } from '../firebaseConfig'

export default function VerifyEmail(navigation) {

    useEffect(() => {
        let interval = setInterval(async () => {
            if (auth.currentUser.emailVerified) {
                clearInterval(interval);
                console.log('Account Verified!');
                navigation.navigate('SignUp1');
            }
            await auth.currentUser.reload();
        }, 2000)
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Email verification has sent to {auth.currentUser.email}</Text>
            <Text style={styles.text2}>Go to your email and click the verification link to move on!</Text>
            <ActivityIndicator style={styles.activityIndicator} size={'large'} color="#1877F2" />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text1: {
        fontSize: 30,
        textAlign: 'center',
        color: '#1877F2',
        fontWeight: 'bold',
        paddingHorizontal: 5
    },

    text2: {
        fontSize: 20,
        textAlign: 'center',
        color: '#1A1A1A',
        marginVertical: 10
    },

    activityIndicator: {
        marginTop: 10
    }
})