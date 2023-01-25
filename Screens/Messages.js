import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Card } from 'react-native';
import { chatStyles } from '../styles/chatstyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, database } from '../firebaseConfig';
import { get, onValue, ref } from 'firebase/database';

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

export let selectedUserIDGlobal, selectedChatRoomIdGlobal;

export default function Messages({ navigation }) {

  const [chatHeaders, setChatHeaders] = useState([]);
  const [StarterHeaderData, setStarterHeaderData] = useState([]);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [selectedChatRoomId, setSelectedchatRoomId] = useState(null);
  // setChatHeaders(MessagesData);

  useEffect(() => {
    selectedUserIDGlobal = selectedUserID;
    selectedChatRoomIdGlobal = selectedChatRoomId;
  }, [selectedChatRoomId, selectedUserID]);

  useEffect(() => {
    const loadData = async () => {
      get(ref(database, 'messagesGlobal/chatHead/' + auth.currentUser.uid)).then((snapshot) => {
        const data = snapshot.val();
        const msgs = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }))
        setStarterHeaderData(msgs);
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
        setStarterHeaderData(msgs);
      }
    })


  }, [])


  useEffect(() => {
    const FD = [];

    Object.values(StarterHeaderData).map(element => {

      // onValue(ref(database, 'userData/' + element.senderId), () => {

      get(ref(database, 'userData/' + element.senderId)).then((snapshot) => {
        const userData = snapshot.val();

        const lastData = { msgs: element, userName: userData.userName, userImage: userData.userImg, moodlet: userData.moodlet, anonimity: userData.anonimity, generatedName: userData.generatedName };
        FD.push(lastData);

        setChatHeaders(FD);

        console.log(chatHeaders);
      })
      // })

    })

  }, [StarterHeaderData])

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

  const handlePress = (item) => {
    setSelectedUserID(item.senderId);
    setSelectedchatRoomId(item.chatRoomId);
    navigation.navigate('ChatBox', { userId: item.msgs.senderId, chatRoomId: item.msgs.chatRoomId });
  }

  const renderItem = ({ item }) => {

    var userName, userImage;

    if (item.anonimity) {
      userName = item.generatedName;
      userImage = "https://firebasestorage.googleapis.com/v0/b/project-imu.appspot.com/o/profile_default%2Fprofile-image.png?alt=media&token=b77c1557-4e43-41e2-ad60-6ca0ecf07475";
    } else {
      userName = item.userName;
      userImage = item.userImage;
    }

    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={{ flexDirection: 'row' }}>
          <View style={chatStyles.c1}>
            <View style={chatStyles.namePicContainer}>
              <View>
                <Image style={chatStyles.userimg} source={{ uri: userImage }} />
                <Image source={item.moodlet} style={chatStyles.moodlet} />
              </View>
              <View>
                <Text>{userName}</Text>
                <Text style={chatStyles.t}>{item.msgs.messageText}</Text>
              </View>
            </View>
          </View>
          <View style={chatStyles.c2}>
            <Text style={chatStyles.txt}>{item.msgs.messageTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
            keyExtractor={item => item.msgs.chatRoomId}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};