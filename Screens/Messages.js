import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Card } from 'react-native';
import { chatStyles } from '../styles/chatstyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, database } from '../firebaseConfig';
import { get, onValue, ref, update } from 'firebase/database';
import moment from 'moment/moment';
import { FormatTime } from '../components/services/FormatTime';
import { defaultPFP } from './Profile';

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

  useEffect(() => {
    onValue(ref(database, 'userData/' + item.senderId), (snapshot) => {
      const userData = snapshot.val();
      setUserData(userData);
      checkAnonimity(snapshot.val());
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
      <View style={{ flexDirection: 'row' }}>
        <View style={chatStyles.c1}>
          <View style={chatStyles.namePicContainer}>
            <View>
              <Image style={chatStyles.userimg} source={{ uri: userImage }} />
              <Image source={userData.moodlet} style={chatStyles.moodlet} />
            </View>
            <View>
              <Text>{userName}</Text>
              <Text style={chatStyles.t}>{item.messageText}</Text>
            </View>
          </View>
        </View>
        <View style={chatStyles.c2}>
          <Text style={chatStyles.txt}>{msgTime}</Text>
          <Text style={chatStyles.txt}>{unreadCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default function Messages({ navigation }) {

  const [chatHeaders, setChatHeaders] = useState([]);


  useEffect(() => {
    const loadData = async () => {
      get(ref(database, 'messagesGlobal/chatHead/' + auth.currentUser.uid)).then((snapshot) => {
        const data = snapshot.val();
        const msgs = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }))
        setChatHeaders(msgs.reverse());
      }).catch((e) => {
        console.log(e);
      });
    }

    loadData();


    onValue(ref(database, 'messagesGlobal/chatHead/' + auth.currentUser.uid), (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        const msgs = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }))
        setChatHeaders(msgs.reverse());
      }
    })


  }, [])

  // useEffect(() => {

  //   const FD = [];

  //   Object.values(StarterHeaderData).map(element => {

  //     onValue(ref(database, 'userData/' + element.senderId), (snapshot) => {
  //       // setChatHeaders([]);
  //       if (snapshot.val() !== null) {

  //         const userData = snapshot.val();

  //         const lastData = { msgs: element, userName: userData.userName, userImage: userData.userImg, moodlet: userData.moodlet, anonimity: userData.anonimity, generatedName: userData.generatedName };
  //         FD.push(lastData);

  //         setChatHeaders(FD);

  //         console.log(chatHeaders);
  //       }
  //     })
  //   })
  // })


  const renderItem = ({ item }) => {

    var msgTime, unreadCount;



    //check date and change format
    msgTime = FormatTime(item.messageTime);

    unreadCount = item.unreadCount;

    const handlePress = () => {

      update(ref(database, 'messagesGlobal/' + '/chatHead/' + auth.currentUser.uid + '/' + item.senderId), {
        unreadCount: 0
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
        <View>
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