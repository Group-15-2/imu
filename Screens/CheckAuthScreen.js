import { View, Image, ActivityIndicator } from 'react-native'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { isAnotherEmailHandled } from './VerifyEmail';


export default function CheckAuthScreen({ navigation }) {

    //desable go back
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();

            // if (status) {
            //     navigation.dispatch(e.data.action);
            // }
        });
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('runned!');
            if (user) {
                if (auth.currentUser.emailVerified) {
                    navigation.navigate('Home');
                    console.log(user);
                }
            } else {
                if (isAnotherEmailHandled == false) {
                    navigation.navigate('SignIn');
                    console.log(user);
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