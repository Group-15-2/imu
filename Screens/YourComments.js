import { View, Text, FlatList, SnapshotViewIOS, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styled } from '../styles/feedStyle'
import { useEffect } from 'react'
import { get, ref } from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import { useState } from 'react';
import moment from 'moment';
import { FormatTime } from '../components/services/FormatTime';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function YourComments({ route, navigation }) {

    const postId = route.params.postId;
    const [commentData, setCommentData] = useState([]);

    // console.log(photoURL);

    useEffect(() => {
        get(ref(database, 'comments/' + postId + '/' + auth.currentUser.uid)).then((snapshot) => {
            setCommentData(snapshot.val());
        })
    }, [])

    const renderItem = ({ item }) => {

        const time = FormatTime(item.time);

        return (
            <View style={styles.cardBottom}>
                <View>
                    <Image source={{ uri: auth.currentUser.photoURL }} style={styles.userimg} />
                </View>
                <View style={styles.commentContainer}>
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <Text style={{ fontSize: 10, paddingTop: 5 }}>{time}</Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={.7} onPress={() => navigation.goBack()} style={{ justifyContent: 'center' }}>
                    <MaterialCommunityIcons name='chevron-left' size={34} />
                </TouchableOpacity>
                <Text style={styled.header}>
                    Your Comments
                </Text>
            </View>

            <View style={{maxHeight: '95%'}}>
                <FlatList
                    data={commentData}
                    renderItem={renderItem}
                // keyExtractor={item => item.postId}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: '#1877F2',
        padding: 5,
        margin: 5,
        borderRadius: 5,
        maxWidth: '80%'

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