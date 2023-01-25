import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Bubble, GiftedChat, Send, InputToolbar, Time } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, database } from '../firebaseConfig';
import { equalTo, get, off, onValue, orderByChild, orderByValue, push, query, ref, set, update } from 'firebase/database';
import { useFocusEffect } from '@react-navigation/native';
import { selectedChatRoomIdGlobal, selectedUserIDGlobal } from './Messages';
import { useRoute } from '@react-navigation/native';

const ChatScreen = ({ userData, userId, chatRoomId }) => {
  const [messages, setMessages] = useState([]);

  // const [userData, setUserData] = useState([]);

  const [selectedUserID, setSelectedUserID] = useState(null);
  const [selectedChatRoomId, setSelectedchatRoomId] = useState(null);


  // useFocusEffect(
  //   React.useCallback(() => {

  //     setSelectedUserID(selectedUserIDGlobal);
  //     console.log(selectedUserID);

  //     setSelectedchatRoomId(selectedChatRoomIdGlobal);
  //     console.log(selectedChatRoomId);

  //     getUserData(userData);

  //   }, [selectedUserIDGlobal, selectedChatRoomIdGlobal])
  // );



  useEffect(
    () => {

      const getId = async () => {

        setSelectedUserID(userId);
        setSelectedchatRoomId(chatRoomId);

        console.log(selectedUserID);

        // getUserData(userData);
      }

      getId();
    });

  useEffect(() => {

    const loadData = async () => {

      if (selectedChatRoomId !== null) {
        get(ref(database, 'messagesGlobal/' + '/chatRoom/' + selectedChatRoomId + '/messages')).then((snapshot) => {
          setMessages(snapshot.val().reverse());
        }).catch((e) => {
          console.log(e);
        });

      }


      // get(ref(database, 'userData/' + selectedUserID)).then((snapshot) => {
      //   setUserData(snapshot.val());
      //   console.log(userData);
      // }).catch((e) => {
      //   console.log(e);
      // });
    }

    // const loadUserData = async () => {
    //   get(ref(database, 'userData/' + selectedUserID)).then((snapshot) => {
    //     setUserData(snapshot.val());
    //     console.log(userData);
    //   }).catch((e) => {
    //     console.log(e);
    //   });
    // }

    loadData();
    // loadUserData();


    onValue(msgDb, (snapshot) => {
      if (snapshot.val() !== null) {
        const msgData = snapshot.val().reverse();
        setMessages(msgData);
      }
      // console.log(messages);
    })

    return () => {
      off(msgDb);
    };

  }, [userData]);

  const msgDb = ref(database, 'messagesGlobal/' + '/chatRoom/' + selectedChatRoomId + '/messages');
  const userDb = ref(database, 'userData/' + selectedUserID);

  const fetchMessages = async () => {
    const snapshot = await get(msgDb);
    const data = snapshot.val();
    return data;
  }

  const fetchChatHeaders = async (id) => {
    const snapshot = await get(ref(database, 'messagesGlobal/chatHead/' + id));
    const data = snapshot.val();
    return data;
  }

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );

    const checkNull = async () => {
      if (selectedChatRoomId === null) {
        const chatRoomRef = push(ref(database, 'messagesGlobal/chatRoom'));
        return chatRoomRef.key;
      } else {
        return selectedChatRoomId;
      }
    }

    const key = await checkNull();
    // setSelectedchatRoomId(key);


    const currentChatRoom = await fetchMessages();
    const lastMessages = currentChatRoom || [];

    const currentChatHeadersOfUser = await fetchChatHeaders(auth.currentUser.uid);
    const currentChatHeadersOfSender = await fetchChatHeaders(selectedUserID);

    const oldChatHeadersOfUser = currentChatHeadersOfUser || [];
    const oldChatHeadersOfSender = currentChatHeadersOfSender || [];



    set(ref(database, 'messagesGlobal/' + '/chatHead/' + selectedUserID + '/' + auth.currentUser.uid),
      {
        "senderId": auth.currentUser.uid,
        "messageTime": Date(),
        "messageText": messages[0].text,
        "chatRoomId": key
      }
    );

    set(ref(database, 'messagesGlobal/' + '/chatHead/' + auth.currentUser.uid + '/' + selectedUserID),
      {
        "senderId": userData.id,
        "messageTime": Date(),
        "messageText": messages[0].text,
        "chatRoomId": key
      }
    );



    // set(ref(database, 'messagesGlobal/' + '/chatRoom/' + selectedChatRoomId + '/chatRoomHeader/' + auth.currentUser.uid), {
    //   "userName": auth.currentUser.displayName,
    //   "userImg": auth.currentUser.photoURL,
    //   "moodlet": ""
    // });

    // set(ref(database, 'messagesGlobal/' + '/chatRoom/' + selectedChatRoomId + '/chatRoomHeader/' + selectedUserID), {
    //   "userName": userData.userName,
    //   "userImg": userData.userImg,
    //   "moodlet": userData.moodlet
    // });

    update(ref(database, 'messagesGlobal/' + '/chatRoom/' + key),
      {
        "messages": [...lastMessages, {
          _id: messages[0]._id,
          text: messages[0].text,
          createdAt: Date(),
          user: {
            _id: messages[0].user._id,
          },
        }]
      }
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send"
            style={styles.input}
            size={36}
            color="#fff"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#afeeee',
            borderBottomRightRadius: 0,
            marginBottom: 3
          },
          left: {
            backgroundColor: '#fff',
            borderBottomLeftRadius: 0,
            marginBottom: 3
          },
        }}
        textStyle={{
          right: {
            color: '#000',
          },
        }}
      />
    );
  };

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderWidth: 2,
          borderColor: "#FFF",
          borderRadius: 20,
          paddingBottom: 2
        }}
      />
    );
  };

  const time = props => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          right: {
            color: 'grey'
          },
          left: {
            color: 'grey',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <MaterialCommunityIcons name='chevron-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth.currentUser.uid,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderInputToolbar={props => customtInputToolbar(props)}
      renderTime={props => time(props)}
      renderAvatar={null}
    />
  );
};

export default function ChatBox({ navigation, route }) {

  const { userId, chatRoomId } = route.params;

  const [userData, setUserData] = useState([]);

  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);

  console.log(chatRoomId)

  // const getUserData = (data) => {
  //   setUserData(data);
  // }



  // onValue(ref(database, 'userData/' + userId), (snapshot) => {
  //   // if (snapshot == null) {
  //   const updatedUserData = snapshot.val();
  //   setUserData(updatedUserData);
  //   // }
  // })


  useEffect(() => {

    get(ref(database, 'userData/' + userId)).then((snapshot) => {
      setUserData(snapshot.val());
      console.log(userData);

      if (userData.anonimity) {
        setUserName(userData.generatedName);
        setUserImage("https://firebasestorage.googleapis.com/v0/b/project-imu.appspot.com/o/profile_default%2Fprofile-image.png?alt=media&token=b77c1557-4e43-41e2-ad60-6ca0ecf07475");
      } else {
        setUserName(userData.userName);
        setUserImage(userData.userImg);
      }

    }).catch((e) => {
      console.log(e);
    });

    onValue(ref(database, 'userData/' + userId), (snapshot) => {
      if (snapshot.val() !== null) {
        setUserData(snapshot.val());
        console.log(userData);

        if (userData.anonimity) {
          setUserName(userData.generatedName);
          setUserImage("https://firebasestorage.googleapis.com/v0/b/project-imu.appspot.com/o/profile_default%2Fprofile-image.png?alt=media&token=b77c1557-4e43-41e2-ad60-6ca0ecf07475");
        } else {
          setUserName(userData.userName);
          setUserImage(userData.userImg);
        }
      }
    })


  }, [userName])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topSelector}>
        <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate('Messages')}>
          <MaterialCommunityIcons name='chevron-left' size={34} />
        </TouchableOpacity>
        <View style={styles.c1}>
          <View style={styles.namePicContainer}>
            <View>
              <Image source={{ uri: userImage }} style={styles.userimg} />
              <Image source={userData.moodlet} style={styles.moodlet} />
            </View>
            <View>
              <Text style={styles.text}>{userName}</Text>
              <Text style={styles.t}>Online</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity activeOpacity={.7} style={styles.dot} onPress={() => navigation.navigate('Messages')}>
          <MaterialCommunityIcons name='dots-vertical' size={34} />
        </TouchableOpacity>
      </View>

      <ChatScreen
        userData={userData}
        chatRoomId={chatRoomId}
        userId={userId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#1877F2',
    paddingLeft: 7,
    paddingRight: 7,
    margin: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20
  },
  topSelector: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    paddingTop: 10,
    color: '#1877F2'
  },
  namePicContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  userimg: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 13
  },

  moodlet: {
    right: -32,
    bottom: 13,
    width: 15,
    height: 15,
    marginBottom: -20
  },

  text: {
    fontWeight: '800',
    width: 150,
    fontSize: 16,
    color: '#1877F2'
  },

  t: {
    fontSize: 12,
    fontWeight: '700',
    color: "#009E54",
  },
  dot: {
    left: 20
  }
})