import { View, Image, ActivityIndicator } from 'react-native'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function CheckAuthScreen({ navigation }) {

    //desable go back
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate('Home');
            } else {
                navigation.navigate('SignIn');
            }
        }, []);

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