import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Card } from 'react-native';
import { chatStyles } from '../styles/chatstyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, database } from '../firebaseConfig';
import { get, onValue, ref, update } from 'firebase/database';
import moment from 'moment/moment';
import { FormatTime } from '../components/services/FormatTime';
import { defaultPFP } from './Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MessagesData = [
  {
    senderId: '7enqIVmrzSXORIvcnWfMs17eJSG3',
    userName: 'Michel Shen',
    userImg: '../assets/4.jpg',
    moodlet: require('../assets/moodlets/happy.png'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
    chatRoomId: 'd56'
  },
  {
    senderId: 'dfs',
    userName: 'hu',
    userImg: '../assets/4.jpg',
    moodlet: require('../assets/moodlets/happy.png'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
    chatRoomId: null
  },
];

const Item = ({ item, msgTime, unreadCount, handlePress }) => {

  const [userData, setUserData] = useState([]);
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const [friendIconVisibility, setFriendIconVisibility] = useState('none');

  useEffect(() => {
    onValue(ref(database, 'userData/' + item.senderId), (snapshot) => {
      const userData = snapshot.val();
      setUserData(userData);
      checkAnonimity(snapshot.val());
    })

    onValue(ref(database, 'friends/' + auth.currentUser.uid + '/' + item.senderId), (snapshot) => {
      if (snapshot.exists()){
          setFriendIconVisibility('flex');
      } else {
          setFriendIconVisibility('none');
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
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <View style={{width: '85%'}}>
          <View style={chatStyles.namePicContainer}>
            <View>
              <Image style={chatStyles.userimg} source={{ uri: userImage }} />
              <Image source={userData.moodlet} style={chatStyles.moodlet} />
            </View>
            <View>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
                <Text style={{fontSize: 15, fontWeight: 'bold',}}>{userName}</Text>
                <View style={{display: friendIconVisibility, paddingLeft: 8}}>
                  <MaterialCommunityIcons name={'account-heart'} color={'#1877F2'} size={18}/>
                </View>
              </View>

              <Text style={chatStyles.t}>{item.messageText}</Text>
            </View>
          </View>
        </View>
        <View style={chatStyles.c2}>
          <Text style={chatStyles.txt}>{msgTime}</Text>
          <Text style={chatStyles.txt2}>{unreadCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default function Messages({ navigation }) {

  const [chatHeaders, setChatHeaders] = useState([]);
  const [errorVisibility, setErrorVisibility] = useState('none');

  useEffect(() => {
    // const loadData = async () => {
    //   get(ref(database, 'messagesGlobal/chatHead/' + auth.currentUser.uid)).then((snapshot) => {
    //     const data = snapshot.val();
    //     const msgs = Object.keys(data).map((key) => ({
    //       id: key,
    //       ...data[key]
    //     }))
    //     setChatHeaders(msgs.reverse());
    //   }).catch((e) => {
    //     console.log(e);
    //   });
    // }

    // loadData();


    onValue(ref(database, 'messagesGlobal/chatHead/' + auth.currentUser.uid), (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        const msgs = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }))
        setChatHeaders(msgs.reverse());
      } else {
        setChatHeaders(null);
      }
    })
  }, [])

  useEffect(() => {
    if (chatHeaders) {
        setErrorVisibility('none');
    } else {
        setErrorVisibility('flex');
    }
  }, [chatHeaders])

  const renderItem = ({ item }) => {
    var msgTime, unreadCount;
    //check date and change format
    msgTime = FormatTime(item.messageTime);

    unreadCount = item.unreadCount;

    const handlePress = () => {

      update(ref(database, 'messagesGlobal/' + '/chatHead/' + auth.currentUser.uid + '/' + item.senderId), {
        "unreadCount": null
      }).then(() => {

        navigation.navigate('ChatBox', { userId: item.senderId, chatRoomId: item.chatRoomId });
      })
    }

    return (
      <Item
        item={item}
        msgTime={msgTime}
        unreadCount={unreadCount}
        handlePress={handlePress}
      />
    )

  }

  return (
    <SafeAreaView>
      <Text style={chatStyles.header}>
        Chats
      </Text>
      <View style={chatStyles.card}>
        <View style={{maxHeight: '100%', paddingBottom: 160}}>
          <Text style={{ color: '#1877F2', fontWeight: 'bold', textAlign: 'center', display: errorVisibility }}>No Chats Available</Text>
          <FlatList
            data={chatHeaders}
            keyExtractor={item => item.chatRoomId}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};