import * as React from 'react';
import { SectionList, Text, View } from 'react-native';
import { addStyles } from '../styles/addstyle';

export default function Addpost() {
  return (
    <View >
      <Text style={addStyles.header}>
          Add Post
      </Text>
      <View style={addStyles.card}>

      </View>
    </View>
  );
}      