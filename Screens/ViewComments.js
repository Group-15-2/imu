import { View, Text, FlatList, Alert, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { styled } from '../styles/feedStyle'
import { useEffect } from 'react'
import { get, onValue, ref, set } from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import { useState } from 'react';
import moment from 'moment';
import { FormatTime } from '../components/services/FormatTime';
import { cardStyles } from '../styles/cardstyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { defaultPFP } from './Profile';

const Item = ({item, postId, navigation}) => {

    const [comments, setComments] = useState([]);
    const [userData, setUserData] = useState([]);
    const [userImage, setUserImage] = useState(null);
    const [userName, setUserName] = useState(null);
    const [friendIcon, setFriendIcon] = useState('account-heart-outline');
    const [chatRoomId, setChatRoomId] = useState(null);

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

        onValue(ref(database, 'friends/' + auth.currentUser.uid + '/' + item.id), (snapshot) => {
            if (snapshot.exists()){
                setFriendIcon('account-heart');
            } else {
                setFriendIcon('account-heart-outline');
            }
        })

        onValue(ref(database, 'messagesGlobal/chatHead/' + auth.currentUser.uid + '/' + item.id), (snapshot) => {
            if (snapshot.val() !== null) {
              const data = snapshot.val();
              setChatRoomId(data.chatRoomId);
            }
          })

    }, [])

    const otherProfile = () => {
        // navigation.navigate("OtherProfile", { userId: item.id });
        return
    }

    const checkAnonimity = (data) => {
        if (data.anonimity) {
            setUserImage(defaultPFP);
            setUserName(data.generatedName);

        } else {
            setUserImage(data.userImg);
            setUserName(data.userName);
        }
    }

    const onChat = () => {
        navigation.navigate('ChatBox', { userId: item.id, chatRoomId: chatRoomId });
        }

    const addFriend = (userName) => {
        get(ref(database, 'friends/' + auth.currentUser.uid + '/' + item.id)).then((snapshot) => {
            if (snapshot.exists()){
                Alert.alert(
                    "Do you really want to remove " + userName + " from friends?",
                    "",
                    [
                      { text: "Yes", onPress: () => {
                        set(ref(database, 'friends/' + auth.currentUser.uid + '/' + item.id), null).catch((error) => {
                            alert(error)
                        });
                      } },
                      { text: "No", onPress: () => console.log("Cancel Pressed") },
                    ]
                  );
            } else {
                set(ref(database, 'friends/' + auth.currentUser.uid + '/' + item.id), item.id).catch((error) => {
                    alert(error)
                });
            }
        })    
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
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => addFriend(userName)}>
                        <MaterialCommunityIcons name={friendIcon} color={'#1877F2'} size={42} style={{right:10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onChat()}>
                        <MaterialCommunityIcons name="message-text-outline" color={'#1877F2'} size={42} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.cardBottom}>
                <View style={styles.commentContainer}>
                    <FlatList
                        data={comments}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={styles.commentText}>{item.comment}</Text>
                                <Text style={{ fontSize: 10 }}>{FormatTime(item.time)}</Text>
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

        return (
            <Item
                item={item}
                postId={postId}
                navigation={navigation}
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

            <View style={{maxHeight: '95%'}}>
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
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