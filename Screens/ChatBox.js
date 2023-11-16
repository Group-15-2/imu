import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Bubble, GiftedChat, Send, InputToolbar, Time } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, database } from '../firebaseConfig';
import { equalTo, get, off, onValue, orderByChild, orderByValue, push, query, ref, set, update } from 'firebase/database';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { wordFilter } from '../components/services/WordFilter';

const ChatScreen = ({ userData, userId, chatRoomId }) => {
  const [messages, setMessages] = useState([]);
  const selectedUserID = userId;
  const selectedChatRoomId = chatRoomId;

  var unreadCount;

  //set unread count to null when online
  useEffect(() => {
    update(ref(database, 'messagesGlobal/' + '/chatHead/' + auth.currentUser.uid + '/' + userId), {
        "unreadCount": null
      })
  }, [messages])

  useEffect(() => {
    get(ref(database, 'messagesGlobal/' + '/chatHead/' + userId + '/' + auth.currentUser.uid + '/unreadCount')).then((snapshot) => {
      if (snapshot.exists()) {
        unreadCount = snapshot.val();
      } else {
        unreadCount = 0;
      }
    }).catch((e) => {
      console.log(e);
    })

    onValue(ref(database, 'messagesGlobal/' + '/chatHead/' + userId + '/' + auth.currentUser.uid + '/unreadCount'), (snapshot) => {
      if (snapshot.exists()) {
        unreadCount = snapshot.val();
      } else {
        unreadCount = 0;
      }
    })
  })

  useEffect(() => {
    const loadData = async () => {
      if (selectedChatRoomId !== null) {
        get(ref(database, 'messagesGlobal/' + '/chatRoom/' + selectedChatRoomId + '/messages')).then((snapshot) => {
          setMessages(snapshot.val().reverse());
        }).catch((e) => {
          console.log(e);
        });
      }
    }

    loadData();

    onValue(msgDb, (snapshot) => {
      if (snapshot.val() !== null) {
        const msgData = snapshot.val().reverse();
        setMessages(msgData);
      }

      // onValue(ref(database, 'messagesGlobal/' + '/chatHead/' + auth.currentUser.uid + '/' + selectedUserID), (snapshot) => {
      //   if (snapshot.val() !== null) {
      //     setSelectedchatRoomId(snapshot.val().chatRoomId);
      //   }
      // })

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
    //filter msg
    messages[0].text = wordFilter(messages[0].text);

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );

    const checkNull = async () => {
      if (selectedChatRoomId === null) {
        const chatRoomRef = push(ref(database, 'messagesGlobal/chatRoom'));
        return chatRoomRef.key;
      } else {
        console.log(selectedChatRoomId);
        return selectedChatRoomId;
      }
    }

    const key = await checkNull();


    const currentChatRoom = await fetchMessages();
    const lastMessages = currentChatRoom || [];

    const currentChatHeadersOfUser = await fetchChatHeaders(auth.currentUser.uid);
    const currentChatHeadersOfSender = await fetchChatHeaders(selectedUserID);

    const oldChatHeadersOfUser = currentChatHeadersOfUser || [];
    const oldChatHeadersOfSender = currentChatHeadersOfSender || [];

    unreadCount = unreadCount + 1;

    set(ref(database, 'messagesGlobal/' + '/chatHead/' + selectedUserID + '/' + auth.currentUser.uid),
      {
        "senderId": auth.currentUser.uid,
        "messageTime": Date(),
        "messageText": messages[0].text,
        "chatRoomId": key,
        "unreadCount": unreadCount
      }
    );

    set(ref(database, 'messagesGlobal/' + '/chatHead/' + auth.currentUser.uid + '/' + selectedUserID),
      {
        "senderId": selectedUserID,
        "messageTime": Date(),
        "messageText": messages[0].text,
        "chatRoomId": key
      }
    );

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
  const [friendIcon, setFriendIcon] = useState('account-heart-outline');

  useEffect(() => {

    get(ref(database, 'userData/' + userId)).then((snapshot) => {
      setUserData(snapshot.val());
      // console.log(userData);

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
        // console.log(userData);

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

  useEffect(()=> {
    onValue(ref(database, 'friends/' + auth.currentUser.uid + '/' + userId), (snapshot) => {
      if (snapshot.exists()){
          setFriendIcon('account-heart');
      } else {
          setFriendIcon('account-heart-outline');
      }
    })
  })

  const addFriend = () => {
    get(ref(database, 'friends/' + auth.currentUser.uid + '/' + userId)).then((snapshot) => {
        if (snapshot.exists()){
            set(ref(database, 'friends/' + auth.currentUser.uid + '/' + userId), null).catch((error) => {
                alert(error)
            });
        } else {
            set(ref(database, 'friends/' + auth.currentUser.uid + '/' + userId), userId).catch((error) => {
                alert(error)
            });
        }
    })    
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topSelector}>
        <TouchableOpacity activeOpacity={.7} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name='chevron-left' size={34} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("OtherProfile", { userId: userData.id })}>
          <View style={styles.c1}>
            <View style={styles.namePicContainer}>
              <View>
                <Image source={{ uri: userImage }} style={styles.userimg} />
                <Image source={userData.moodlet} style={styles.moodlet} />
              </View>
              <View>
                <Text style={styles.text}>{userName}</Text>
                {/* <Text style={styles.t}>Online</Text> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{left: 30}}>
            <TouchableOpacity onPress={() => addFriend()}>
                <MaterialCommunityIcons name={friendIcon} color={'#1877F2'} size={42} />
            </TouchableOpacity>
        </View>

        {/* <TouchableOpacity activeOpacity={.7} style={styles.dot} onPress={() => navigation.navigate('Messages')}>
          <MaterialCommunityIcons name='dots-vertical' size={34} />
        </TouchableOpacity> */}
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