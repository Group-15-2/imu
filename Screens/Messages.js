import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Card } from 'react-native';
import { chatStyles } from '../styles/chatstyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, database } from '../firebaseConfig';
import { get, ref } from 'firebase/database';

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

  const [chatHeaders, setChatHeaders] = useState(MessagesData);
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
        const data = snapshot;
        data.forEach((childSnapshot) => {
          // const getOldData = () => {
          //   return chatHeaders;
          // }
          // const oldData = getOldData();
          setChatHeaders([...chatHeaders, childSnapshot.val()])
          // console.log(chatHeaders);
        })
      }).catch((e) => {
        console.log(e);
      });
    }

    loadData();
  }, [])

  const handlePress = (item) => {
    setSelectedUserID(item.senderId);
    setSelectedchatRoomId(item.chatRoomId);
    navigation.navigate('ChatBox');
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
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress(item)}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={chatStyles.c1}>
                    <View style={chatStyles.namePicContainer}>
                      <View>
                        <Image style={chatStyles.userimg} source={{ uri: item.userImg }} />
                        <Image source={item.moodlet} style={chatStyles.moodlet} />
                      </View>
                      <View>
                        <Text>{item.userName}</Text>
                        <Text style={chatStyles.t}>{item.messageText}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={chatStyles.c2}>
                    <Text style={chatStyles.txt}>{item.messageTime}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};