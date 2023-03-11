import { View, Text, FlatList, SnapshotViewIOS, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { styled } from '../styles/feedStyle'
import { useEffect } from 'react'
import { get, onValue, ref } from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import { useState } from 'react';
import moment from 'moment';
import { FormatTime } from '../components/services/FormatTime';
import { cardStyles } from '../components/card';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { defaultPFP } from './Profile';

const Item = ({ time, item, postId, otherProfile }) => {

    const [comments, setComments] = useState([]);
    const [userData, setUserData] = useState([]);
    const [userImage, setUserImage] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        get(ref(database, 'comments/' + postId + '/' + item.id)).then((snapshot) => {
            setComments(snapshot.val());

            get(ref(database, 'userData/' + item.id)).then((snapshot) => {
                setUserData(snapshot.val());
            })
        })

        onValue(ref(database, 'userData/' + item.id), (snapshot) => {
            setUserData(snapshot.val());
            checkAnonimity(snapshot.val());
        })

    }, [])

    const checkAnonimity = (data) => {
        if (data.anonimity) {
            setUserImage(defaultPFP);
            setUserName(data.generatedName);

        } else {
            setUserImage(data.userImg);
            setUserName(data.userName);
        }
    }



    return (
        <View >
            <View style={cardStyles.cardHead}>
                <TouchableOpacity onPress={otherProfile}>
                    <View style={cardStyles.namePicContainer}>
                        <View>
                            <Image source={{ uri: userImage }} style={cardStyles.userimg} />
                            <Image source={userData.moodlet} style={cardStyles.moodlet} />
                        </View>

                        <View>
                            <Text style={cardStyles.name}>{userName}</Text>
                            <Text style={cardStyles.mood}>{userData.mood}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>

            <View style={styles.cardBottom}>
                <View style={styles.commentContainer}>
                    <FlatList
                        data={comments}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={styles.commentText}>{item.comment}</Text>
                                <Text style={{ fontSize: 10 }}>{time}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    )
}

export default function ViewComments({ route, navigation }) {

    const postId = route.params.postId;
    const [users, setUsers] = useState([]);

    // console.log(postId);

    useEffect(() => {
        get(ref(database, 'comments/' + postId)).then((snapshot) => {
            const data = snapshot.val();
            const posts = Object.keys(data).map((key) => ({
                id: key
            }));
            setUsers(posts);
            console.log(posts);
        })
    }, [])

    const renderItem = ({ item }) => {

        const time = FormatTime(item.time);

        const otherProfile = () => {
            navigation.navigate("OtherProfile", { userId: item.id });
        }

        return (
            <Item
                time={time}
                item={item}
                postId={postId}
                otherProfile={otherProfile}
            />
        )
    }

    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={.7} onPress={() => navigation.goBack()} style={{ justifyContent: 'center' }}>
                    <MaterialCommunityIcons name='chevron-left' size={34} />
                </TouchableOpacity>
                <Text style={styled.header}>
                    Comments
                </Text>
            </View>

            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: '#1877F2',
        padding: 5,
        margin: 5,
        borderRadius: 5,
        maxWidth: '80%',
        marginLeft: '20%'

    },

    commentText: {
        color: 'white',
        fontSize: 15,
    },

    userimg: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginRight: 13
    },
    cardBottom: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
    },
})