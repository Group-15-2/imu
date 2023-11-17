import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { chatStyles } from '../styles/chatstyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, database } from '../firebaseConfig';
import { get, onValue, ref, set } from 'firebase/database';
import moment from 'moment/moment';
import { FormatTime } from '../components/services/FormatTime';
import { defaultPFP } from './Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Item = ({ item, navigation }) => {

  const [userData, setUserData] = useState([]);
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [moodText, setMoodText] = useState(null);
  const [friendIcon, setFriendIcon] = useState('account-heart-outline');

  useEffect(() => {
    onValue(ref(database, 'userData/' + item.id), (snapshot) => {
      const userData = snapshot.val();
      setUserData(userData);
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

  const checkAnonimity = (data) => {
    if (data.anonimity) {
      setUserName(data.generatedName);
      setUserImage(defaultPFP);
    } else {
      setUserName(data.userName);
      setUserImage(data.userImg);
    }

    if (data.mood == 'How are you Feeling \ntoday?') {
        setMoodText('Not Selected');
    } else {
        setMoodText(data.mood);
    }
  }

  const onChat = () => {
    navigation.navigate('ChatBox', { userId: item.id, chatRoomId: chatRoomId });
    }

  const viewProfile = () => {
    navigation.navigate("OtherProfile", { userId: item.id });
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
    <TouchableOpacity onPress={viewProfile}>
      <View style={{ flexDirection: 'row' }}>
        <View style={chatStyles.c1}>
            <View style={chatStyles.namePicContainer}>
                <View>
                    <Image style={chatStyles.userimg} source={{ uri: userImage }} />
                    <Image source={userData.moodlet} style={chatStyles.moodlet} />
                </View>
                <View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={chatStyles.userName}>{userName}</Text>
                    </View>
                    <Text style={chatStyles.mood}>{moodText}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => addFriend(userName)}>
                    <MaterialCommunityIcons name={friendIcon} color={'#1877F2'} size={42} style={{right:10}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onChat()}>
                    <MaterialCommunityIcons name="message-text-outline" color={'#1877F2'} size={42} />
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default function MyFriends({ navigation }) {


    const [Friends, setFriends] = useState([]);
    const [errorVisibility, setErrorVisibility] = useState('none');


    useEffect(() => {
      onValue(ref(database, 'friends/' + auth.currentUser.uid), (snapshot) => {
        if (snapshot.val() !== null) {
          const data = snapshot.val();
          const users = Object.keys(data).map((key) => ({
            id: key
        }))
          setFriends(users.reverse());
        } else {
            setFriends(null);
        }
      })
    }, [])

    useEffect(() => {
        if (Friends) {
            setErrorVisibility('none');
        } else {
            setErrorVisibility('flex');
        }
    }, [Friends])

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        navigation={navigation}
      />
    )

  }

  return (
    <SafeAreaView>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity activeOpacity={.7} onPress={() => navigation.goBack()} style={{ justifyContent: 'center' }}>
                <MaterialCommunityIcons name='chevron-left' size={34} />
            </TouchableOpacity>
            <Text style={chatStyles.header}>
                My Friends
            </Text>
        </View>
      <View style={chatStyles.card}>
        <Text style={{ color: '#1877F2', fontWeight: 'bold', textAlign: 'center', display: errorVisibility }}>No Friends Available</Text>
            <View>
            <FlatList
                data={Friends}
                renderItem={renderItem}
            />
            </View>
      </View>
    </SafeAreaView>
  );
};