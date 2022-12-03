import React, { useState } from 'react'
import { SectionList, Text, View, StyleSheet, FlatList, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
// import { addStyles } from '../styles/addstyle';

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

  const [text, onChangeText] = useState('');

  return (
    <View>
      <Text style={addStyles.header}>
        Add Post
      </Text>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        style={addStyles.color_picker_container}
      />

      <ScrollView>
        <TextInput
          style={[addStyles.card, { backgroundColor: selectedColor }]}
          onChangeText={onChangeText}
          value={text}
          placeholder="Your Thoughts Here!"
          placeholderTextColor={'#FFFFFF'}
          multiline={true}
        />
      </ScrollView>
    </View>
  );
}

const addStyles = StyleSheet.create({

  wrapper: {
    marginLeft: 16,
    paddingTop: 30,
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 16,
    paddingTop: 30,
    color: '#1877F2',
  },

  card: {
    margin: 16,
    borderRadius: 10,
    minHeight: 450,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 5,
  },

  color_picker: {
    width: 24,
    height: 24,
    borderRadius: 50,
    borderColor: '#fff',
  },

  color_picker_container: {

  }
})