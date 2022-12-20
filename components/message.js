import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Message ({ message, side }) {
  const isLeftSide = side === 'left'

  const containerStyles = isLeftSide ? styles.container : flattenedStyles.container
  const textContainerStyles = isLeftSide ? styles.textContainer : flattenedStyles.textContainer
  const textStyles = isLeftSide ? flattenedStyles.leftText : flattenedStyles.rightText

  return (
    <View style={containerStyles}>
      <View style={textContainerStyles}>
        <Text style={textStyles}>
          {message}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 3,
      paddingHorizontal: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    textContainer: {
      width: 160,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginLeft: 2,
      borderTopRightRadius:20,
      borderTopLeftRadius:20,
      borderBottomRightRadius:20,
    },
    rightContainer: {
      justifyContent: 'flex-end',
      
    },
    rightTextContainer: {
      width: 160,
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#87CEFA',
      marginRight: 2,
      borderTopRightRadius:20,
      borderTopLeftRadius:20,
      borderBottomLeftRadius:20,    
    },
    leftText: {
      textAlign: 'left'
    },
    rightText: {
      textAlign: 'right'
    },
    text: {
      fontSize: 14
    }
  })
  
  const flattenedStyles = {
    container: StyleSheet.flatten([styles.container, styles.rightContainer, styles.leftContainer]),
    textContainer: StyleSheet.flatten([styles.rightTextContainer]),
    leftText: StyleSheet.flatten([styles.leftText, styles.text]),
    rightText: StyleSheet.flatten([styles.rightText, styles.text])
  }
  
  export {
    styles,
    flattenedStyles
  }
