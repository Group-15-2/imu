import React from 'react';
import { FlatList, SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Chat from '../components/chat'
import Message from '../components/message' 

export default function ChatBox ({navigation}) {

  const mock = [
    { id: 4, message: 'Thank You..', side: 'left',createdAt: new Date(), }, 
    { id: 3, message: 'Hello! I am Kalpana. I live in RathnaPura', side: 'right',createdAt: new Date(), },
    { id: 2, message: 'Hello! I am Chathura. I live in Colombo', side: 'left',createdAt: new Date(), }, 
    { id: 1, message: 'Hi!', side: 'right',createdAt: '4.02', },
  ]
  return (
    <SafeAreaView>
      <View style={styles.topSelector}>
      <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate('Messages')}>
        <Icon name='chevron-left' size={34}  />
      </TouchableOpacity>
      <View style={styles.c1}>
          <View style={styles.namePicContainer}>
          <View> 
              <Image style={styles.userimg} source={require('../assets/4.jpg')}/>
              <Image source={require('../assets/moodlets/good.png')} style={styles.moodlet}/>
          </View>
          <View>
              <Text style={styles.text}>Michel Shen</Text>
              <Text style={styles.t}>Online</Text>
          </View>
          </View>
      </View>   
      </View> 
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          data={mock}
          keyExtractor={function (item) {
            return item.id
          }}
          renderItem={function ({ item }) {
            return (
              <Message  side={item.side} message={item.message} createdAt={item.createdAt} />
            )
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Chat />
      </View>
    </SafeAreaView>
  )
}

const styles= StyleSheet.create({
  topSelector: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30.24,
    marginLeft: 16,
    paddingTop: 10,
    color: '#1877F2'
  },
  messagesContainer: {
    height: '85%',
    paddingBottom: 70
  },
  inputContainer: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 8,
    paddingLeft: 10,
    backgroundColor:'#fff'
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
    fontSize:16,
    color:'#1877F2'     
  },

  t: {
    fontSize: 12,
    fontWeight: '700',
    color: "#009E54",
  },
})

