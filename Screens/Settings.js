import * as React from 'react';
import { Text, View } from 'react-native';


<<<<<<<< HEAD:Screens/Messages.js
export default function Messages() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        This is the Messages Screen
      </Text>
========
export default function Settings() {  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the profile screen</Text>
>>>>>>>> a4c10e1657178f7da51c051f68199b480801ad71:Screens/Settings.js
    </View>
  );
};