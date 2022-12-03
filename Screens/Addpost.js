import * as React from 'react';
import { SectionList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
// import { addStyles } from '../styles/addstyle';

export default function Addpost() {
  return (
    <View>
      <Text style={addStyles.header}>
        Add Post
      </Text>
      <TouchableOpacity>
        <View style={{ width: 24, height: 24, borderRadius: 50, backgroundColor: '#6562FF', borderColor: '#fff' }}></View>
      </TouchableOpacity>

      <View style={addStyles.card}>

      </View>
    </View>
  );
}

const addStyles = StyleSheet.create({

  wrapper: {
    marginLeft: 16,
    paddingTop: 30
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 16,
    paddingTop: 30,
    color: '#1877F2',
  },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 10,
    height: 450,
  },
})