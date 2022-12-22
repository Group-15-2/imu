import React from 'react';
<<<<<<< HEAD
import {Text, View, ScrollView, TouchableOpacity, Image, FlatList, Card} from 'react-native';
import {chatStyles} from '../styles/chatstyle';
import { SafeAreaView } from 'react-native-safe-area-context';
=======
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Card } from 'react-native';
import { chatStyles } from '../styles/chatstyle';
>>>>>>> ce0b7572729622aa542c5fd92a2d7a98d54c7d07

const MessagesData = [
  {
    id: '1',
    userName: 'Michel Shen',
    userImg: require('../assets/4.jpg'),
    moodlet: require('../assets/moodlets/happy.png'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'Jenny Doe',
    userImg: require('../assets/test_profile_image.jpg'),
    moodlet: require('../assets/moodlets/sad.png'),
    messageTime: '6 mins ago',
    messageText:
      'Hey there, I am using IMU app',
  },
  {
    id: '3',
    userName: 'Jenny Doe',
    userImg: require('../assets/test_profile_image.jpg'),
    moodlet: require('../assets/moodlets/good.png'),
    messageTime: '4 hrs ago',
    messageText:
      'Thank You very much!',
  },
];


export default function Messages({ navigation }) {
  return (
    <SafeAreaView>
      <Text style={chatStyles.header}>
        Chats
      </Text>
      <View style={chatStyles.card}>
        <View>
          <FlatList
            data={MessagesData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={chatStyles.c1}>
                    <View style={chatStyles.namePicContainer}>
                      <View>
                        <Image style={chatStyles.userimg} source={item.userImg} />
                        <Image source={item.moodlet} style={chatStyles.moodlet} />
                      </View>
                      <View>
                        <Text>{item.userName}</Text>
                        <Text style={chatStyles.t}>{item.messageText}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={chatStyles.c2}>
                    <Text style={chatStyles.txt}>{item.messageTime}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
