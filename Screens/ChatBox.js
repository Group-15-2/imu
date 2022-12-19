import React from 'react'
import { FlatList, SafeAreaView, View, StyleSheet } from 'react-native'

import Chat from '../components/chat'
import Message from '../components/message'

export default function HooksExample () {
  const mock = [
    { id: 1, message: 'Hello', side: 'left' }, 
    { id: 2, message: 'Hi!', side: 'right' }
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
              <Message side={item.side} message={item.message} />
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
      backgroundColor:'#fff'
    }
  })


