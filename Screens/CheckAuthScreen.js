import { View, Image, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { isAnotherEmailHandled } from './VerifyEmail';

export let isExpired = false;

export default function CheckAuthScreen({ navigation }) {
    const [status, setStatus] = useState(false);

    //disable go back
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();

            if (status) {
                navigation.dispatch(e.data.action);
            }
        });
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('Executed');
            // console.log(user);
            if (user) {
                if (auth.currentUser.emailVerified) {
                    setStatus(false);
                    isExpired = false;
                    navigation.navigate('Home');
                    console.log('automatically logged in');
                }
            } else {
                if (isAnotherEmailHandled == false) {
                    setStatus(true);
                    isExpired = true;
                    navigation.navigate('SignIn');
                    console.log('Not logged in');
                }
            }
        });

        return unsubscribe;
    });

    return (
        <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Image source={require('../assets/icon1.png')} style={{ width: 100, height: 100 }} />
                <ActivityIndicator size="small" color="#1877F2" />
            </View>
        </View>
    )
}