import { View, Text, FlatList, SnapshotViewIOS, StyleSheet, Image } from 'react-native'
import React from 'react'
import { styled } from '../styles/feedStyle'
import { useEffect } from 'react'
import { get, ref } from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import { useState } from 'react';
import moment from 'moment';
import { FormatTime } from '../components/services/FormatTime';

export default function YourComments({ route }) {

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
            <Text style={styled.header}>
                Your Comments
            </Text>

            <FlatList
                data={commentData}
                renderItem={renderItem}
            // keyExtractor={item => item.postId}
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