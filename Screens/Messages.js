import * as React from 'react';
import {Text, View, Image, SafeAreaView, Switch, TouchableOpacity, TextInput} from 'react-native';
import {globalStyles} from '../styles/global';
import { useFonts } from 'expo-font';



export default function Messages() {
  return (
    <View>
      <Text style={globalStyles.header}>
        Chats
      </Text>
      <View>
        <TouchableOpacity style={globalStyles.card}>
            <View style={{flexDirection:'row'}}>
              <View style={globalStyles.c1}>
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
            </View>
            <View style={globalStyles.c2}>
              <Text style={globalStyles.txt}>15.02 PM</Text>
            </View>  
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};