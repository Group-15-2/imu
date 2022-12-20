import React, { useCallback, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

export default function Chat () {
  const [message, setMessage] = useState('')

  const handlePress = useCallback(
    function () {
      // todo this
    },
    [message]
  )

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
            style={styles.input} 
            value={message} 
            onChangeText={setMessage} 
            placeholder="Write you message" 
        />

      </View>

      <TouchableOpacity style={styles.send} onPress={handlePress} >
        <Text style={{color:'#fff'}}>Send</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  inputContainer: {
    width: '70%'
  },
  input: {
    backgroundColor:'#D9D9D9',
    height: 40,
    borderColor: '#1877F2',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  send: {
    backgroundColor:'#1877F2',
    padding: 10,
    borderRadius: 10
  }
})