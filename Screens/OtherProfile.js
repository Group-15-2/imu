import { View, Text, Image } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { get, onValue, ref } from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import { styled } from '../styles/feedStyle';
import Card from '../components/card';
import { defaultPFP } from './Profile';

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
            <Text style={[styled.header]}>{userName}</Text>
            <View style={styled.userinfo}>
                <View style={{ alignSelf: 'center' }}>
                    <Image source={{ uri: userImage }} style={styled.userimg} />
                    <Image source={userData.moodlet} style={styled.moodlet} />
                </View>
                <View>
                    <Text style={styled.id}>ID = {userData.id}</Text>
                </View>
            </View>

            <Card mood={myMoodlet} navigation={navigation} postDataRef={'UserPosts/' + userId} />

        </View>
    )
}



