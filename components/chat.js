import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

      <TouchableOpacity activeOpacity={.7} style={styles.send} onPress={handlePress} >
        <Icon name='send' size={22} color={'#fff'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor:'#fff',
    height: 40,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  send: {
    height: 40,
    backgroundColor:'#1877F2',
    paddingTop: 10,
    paddingLeft: 14,
    paddingRight: 14,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  }
})