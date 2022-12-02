import * as React from 'react';
import {Text, View, Image, SafeAreaView, Switch, TouchableOpacity, TextInput} from 'react-native';
import {styled} from '../styles/feedStyle';
import {globalStyles} from '../styles/global';
import { useFonts } from 'expo-font';



export default function Messages() {
  return (
    <View style={globalStyles.wrapper}>

      <Text style={globalStyles.header}>
        Chats
      </Text>

      <View>

        <TouchableOpacity>
          <View style={globalStyles.namePicContainer}>
            <View>
              <Image source={require('../assets/test_profile_image.jpg')} style={globalStyles.userimg}/>
              <Image source={require('../assets/moodlets/happy.png')} style={globalStyles.moodlet}/>
            </View>
            <View>
              <Text>Name</Text>
              <Text>Name</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};