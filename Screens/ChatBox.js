import React from 'react'
import { FlatList, SafeAreaView, View, StyleSheet } from 'react-native'

import Chat from '../components/chat'
import Message from '../components/message'

export default function ChatBox() {
  const mock = [
    { id: 4, message: 'Thank You..', side: 'left', createdAt: new Date(), },
    { id: 3, message: 'Hello! I am Kalpana. I live in RathnaPura', side: 'right', createdAt: new Date(), },
    { id: 2, message: 'Hello! I am Chathura. I live in Colombo', side: 'left', createdAt: new Date(), },
    { id: 1, message: 'Hi!', side: 'right', createdAt: new Date(), },
  ]
  return (
    <SafeAreaView>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          data={mock}
          keyExtractor={function (item) {
            return item.id
          }}
          renderItem={function ({ item }) {
            return (
              <Message createdAt={item.createdAt} side={item.side} message={item.message} />
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

const styles = StyleSheet.create({
  messagesContainer: {
    height: '100%',
    paddingBottom: 80
  },
  inputContainer: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 8,
    paddingLeft: 10,
    backgroundColor: '#fff'
  }
})


