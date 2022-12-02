import * as React from 'react';
import { Text, View, Image, SafeAreaView  } from 'react-native';
import {styled} from '../styles/feedStyle'

export default function Profile() {
  return (
    <SafeAreaView >
      <Text style={{ fontSize: 30, fontWeight: 'bold',  marginLeft: 16, paddingTop: 30, color: '#1877F2' }}>
          Profile
      </Text>
      <View style={styled.card}>
        <View style={styled.userinfo}>
            <View>
            <Image source={require('../assets/test_profile_image.jpg')} style={styled.userimg}/>
            <Image source={require('../assets/moodlets/happy.png')} style={styled.moodlet}></Image>
            </View>
            <View style={styled.v}>
            <Text style={styled.name}>Ravana SL</Text> 
            <Text style={styled.id}>ID = DAf345h5G5</Text>
            </View>
        </View>
      </View>
    </SafeAreaView >
  );
}      
