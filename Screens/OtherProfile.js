import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { get, onValue, ref } from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import { styled } from '../styles/feedStyle';
import Card from '../components/card';
import { defaultPFP } from './Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function OtherProfile({ route, navigation }) {
    const userId = route.params.userId;

    const [userData, setUserData] = useState([]);
    const [userImage, setUserImage] = useState(null);
    const [userName, setUserName] = useState(null);
    const [myMoodlet, setMyMoodlet] = useState(null);

    useEffect(() => {
        get(ref(database, 'userData/' + userId)).then((snapshot) => {
            setUserData(snapshot.val());
            checkAnonimity(snapshot.val());
        })

        onValue(ref(database, 'userData/' + userId), (snapshot) => {
            setUserData(snapshot.val());
            checkAnonimity(snapshot.val());
        })

        onValue(ref(database, 'userData/' + auth.currentUser.uid), (snapshot) => {
            setMyMoodlet(snapshot.val().moodlet);
        })
    }, [])

    const checkAnonimity = (data) => {
        if (data.anonimity) {
            setUserName(data.generatedName);
            setUserImage(defaultPFP);
        } else {
            setUserName(data.userName);
            setUserImage(data.userImg);
        }
    }

    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={.7} onPress={() => navigation.goBack()} style={{ justifyContent: 'center' }}>
                    <MaterialCommunityIcons name='chevron-left' size={34} />
                </TouchableOpacity>
                <Text style={[styled.header]}>{userName}</Text>
            </View>
            <View style={styled.userinfo}>
                <View style={{ alignSelf: 'center' }}>
                    <Image source={{ uri: userImage }} style={styled.userimg} />
                    <Image source={userData.moodlet} style={styled.moodlet} />
                </View>
                <View>
                    <Text style={styled.id}>ID = {userData.id}</Text>
                </View>
            </View>
            <View style={{maxHeight: '100%', paddingBottom: 180}}>
                <Card mood={myMoodlet} navigation={navigation} postDataRef={'UserPosts/' + userId} />
            </View>
        </View>
    )
}



