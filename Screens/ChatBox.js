import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Bubble, GiftedChat, Send, InputToolbar, Time} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          uri: '../assets/test_profile_image.jpg',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
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
            marginBottom:3
          },
          left: {
            backgroundColor: '#fff',
            borderBottomLeftRadius: 0,
            marginBottom:3
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
          borderRadius:20,
          paddingBottom:2
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
            color:'grey'
          },
          left: {
            color: 'grey',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <MaterialCommunityIcons name='chevron-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderInputToolbar={props => customtInputToolbar(props)}
      renderTime={props => time(props)}
    />
  );
};

export default function ChatBox ({navigation}) {
  return(
    <SafeAreaView style={{flex:1}}>
      <View style={styles.topSelector}>
       <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate('Messages')}>
         <MaterialCommunityIcons name='chevron-left' size={34}  />
       </TouchableOpacity>
       <View style={styles.c1}>
           <View style={styles.namePicContainer}>
           <View> 
               <Image style={styles.userimg} source={require('../assets/4.jpg')}/>
               <Image source={require('../assets/moodlets/good.png')} style={styles.moodlet}/>
           </View>
           <View>
               <Text style={styles.text}>Michel Shen Golden</Text>
               <Text style={styles.t}>Online</Text>
           </View>
           </View>
       </View>
       <TouchableOpacity activeOpacity={.7} style={styles.dot} onPress={() => navigation.navigate('Messages')}>
         <MaterialCommunityIcons name='dots-vertical' size={34}  />
       </TouchableOpacity>   
      </View>
      <ChatScreen/> 
    </SafeAreaView>    
  );
}

const styles= StyleSheet.create({
  input: { 
    backgroundColor:'#1877F2',
    paddingLeft:7,
    paddingRight:7, 
    margin:1, 
    borderBottomRightRadius:20, 
    borderTopRightRadius:20
  },
  topSelector: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height:60
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
    marginBottom:-20
  },

  text: {
    fontWeight:'800',
    width:150,
    fontSize:16,
    color:'#1877F2'     
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

