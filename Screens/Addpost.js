import React, { useState, useEffect } from 'react'
import { Dimensions, Text, View, StyleSheet, FlatList, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { addStyles } from '../styles/addstyle';

//color picker data
const DATA = [
  {
    id: 0,
    color: '#6562FF'
  },
  {
    id: 1,
    color: '#EE5757'
  },
  {
    id: 2,
    color: '#F8C100'
  },
  {
    id: 3,
    color: '#81DDCC'
  },
  {
    id: 4,
    color: '#8190DD'
  },
  {
    id: 5,
    color: '#D681DD'
  },
  {
    id: 6,
    color: '#8EDD81'
  },
]

//item for FlatList
//get parameters 'item, borderWidth, onPress' from renderItem
const Item = ({ item, borderWidth, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[addStyles.color_picker, borderWidth, { backgroundColor: item.color }]} />
    </TouchableWithoutFeedback>
  );
};


export default function Addpost() {

  //update selectedId of the FlatList
  const [selectedId, setSelectedId] = useState(0);

  //update selectedColor of the FlatList
  const [selectedColor, setSelectedColor] = useState('#6562FF');

  const renderItem = ({ item }) => {

    //check the item id and selectedId, if they match borderWidth gets 3 else borderWidth gets 1
    const borderWidth = item.id === selectedId ? 3 : 1;

    return (
      <Item
        item={item}
        onPress={() => { setSelectedId(item.id); setSelectedColor(item.color); }}
        borderWidth={{ borderWidth }}
      />
    )
  };

  //update post text
  const [text, onChangeText] = useState('');


  const isEmpty = () => {
    if (text.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const textColor = isEmpty ? '#EE5757' : '#fff';
  const btnTouchableOpacity = isEmpty ? '1' : '0.6';
  const btnColor = isEmpty ? '' : '';




  const postFunction = () => {
    if (isEmpty) {
      Alert.alert(
        "Alert Title",
        "My Alert Msg",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  };

  //get the device window height
  const windowHeight = (Dimensions.get('window').height) - 300;

  return (
    <View>
      <Text style={addStyles.header}>
        Add Post
      </Text>

      <View style={addStyles.wrapper}>
        <View style={[addStyles.flatlist_container, { backgroundColor: selectedColor }]}>
          <FlatList
            numColumns={7}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            style={addStyles.color_picker_wrapper}
          />
        </View>

        <ScrollView>
          <TextInput
            style={[addStyles.card, { backgroundColor: selectedColor, minHeight: windowHeight }]}
            onChangeText={onChangeText}
            value={text}
            placeholder="Your Thoughts Here!"
            placeholderTextColor={'#FFFFFF'}
            multiline={true}
          />
        </ScrollView>

        <TouchableOpacity onPress={postFunction} activeOpacity={btnTouchableOpacity}>
          <View style={[addStyles.post_btn, { backgroundColor: '#1877F2' }]}>
            <Text style={[addStyles.post_btn_text, { color: textColor }]}>Post</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View >
  );
}

