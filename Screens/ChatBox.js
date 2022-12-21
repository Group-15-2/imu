import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send"
            style={styles.input}
            size={36}
            color="#fff"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#87CEFA',
            borderBottomRightRadius: 0
          },
          left: {
            backgroundColor: '#fff',
            borderBottomLeftRadius: 0
          },
        }}
        textStyle={{
          right: {
            color: '#000',
          },
        }}
      />
    );
  };

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderWidth: 2,
          borderColor: "#FFF",
          borderRadius:20,
          paddingBottom:2
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderInputToolbar={props => customtInputToolbar(props)}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: { 
    backgroundColor:'#1877F2',
    paddingLeft:7,
    paddingRight:7, 
    margin:1, 
    borderBottomRightRadius:20, 
    borderTopRightRadius:20
  }
});
// import Chat from '../components/chat'
// import Message from '../components/message' 
// import homeScreen from '../Screens/Home'
// import profile from '../Screens/Profile'
// import addPost from '../Screens/Addpost'
// import thoughts from '../Screens/Thoughts'
// import messages from '../Screens/Messages'

// const Tab = createBottomTabNavigator();

// export function Tabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         screenOption: {
//           labelStyle: {
//             fontSize: 12,
//           },
//           tabStyle: {
//             width: 100,
//           },
//           style: {
//             paddingTop: 50,
//             backgroundColor: 'red',
//           },
//         },
//         tabBarShowLabel: false,
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'home') {
//             iconName = 'home-outline';
//           }
//           else if (route.name === 'Profile') {
//             iconName = 'account-outline';
//             // How to use if we need focused states
//             // iconName = focused ? 'account-outline' : 'account-outline';
//           }
//           else if (route.name === 'Messages') {
//             iconName = 'message-text-outline';
//           }
//           else if (route.name === 'Thoughts') {
//             iconName = 'thought-bubble-outline';
//           }
//           else if (route.name === 'AddPost') {
//             iconName = 'plus-circle';
//           }

//           // You can return any component that you like here!
//           return <Icon name={iconName} size={32} color={color} />
//         },
//         tabBarActiveTintColor: '#1877F2',
//         tabBarInactiveTintColor: 'gray',
//       })}
//     >
//       <Tab.Screen name="home" component={homeScreen} />
//       <Tab.Screen name="Messages" component={messages} />
//       <Tab.Screen name="AddPost" component={addPost} options={{ tabBarIcon: ({ color }) => (<Icon name="plus-circle" color={'#1877F2'} size={42} />), }} />
//       <Tab.Screen name="Thoughts" component={thoughts} />
//       <Tab.Screen name="Profile" component={profile} />
//     </Tab.Navigator>
//   );
// }

// export default function ChatBox ({navigation}) {

//   const mock = [
//     { id: 4, message: 'Thank You..', side: 'left',createdAt: new Date(), }, 
//     { id: 3, message: 'Hello! I am Kalpana. I live in RathnaPura', side: 'right',createdAt: new Date(), },
//     { id: 2, message: 'Hello! I am Chathura. I live in Colombo', side: 'left',createdAt: new Date(), }, 
//     { id: 1, message: 'Hi!', side: 'right',createdAt: '4.02', },
//   ]
//   return (
//     <SafeAreaView>
//       <View style={styles.topSelector}>
//       <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate('Messages')}>
//         <Icon name='chevron-left' size={34}  />
//       </TouchableOpacity>
//       <View style={styles.c1}>
//           <View style={styles.namePicContainer}>
//           <View> 
//               <Image style={styles.userimg} source={require('../assets/4.jpg')}/>
//               <Image source={require('../assets/moodlets/good.png')} style={styles.moodlet}/>
//           </View>
//           <View>
//               <Text style={styles.text}>Michel Shen</Text>
//               <Text style={styles.t}>Online</Text>
//           </View>
//           </View>
//       </View>   
//       </View>
//       <View style={styles.messagesContainer}>
//         <FlatList
//           inverted
//           data={mock}
//           keyExtractor={function (item) {
//             return item.id
//           }}
//           renderItem={function ({ item }) {
//             return (
//               <Message  side={item.side} message={item.message} createdAt={item.createdAt} />
//             )
//           }}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Chat />
//       </View>
//       <Tabs/>
//     </SafeAreaView>
//   )
// }

// const styles= StyleSheet.create({
//   topSelector: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 30,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     lineHeight: 30.24,
//     marginLeft: 16,
//     paddingTop: 10,
//     color: '#1877F2'
//   },
//   messagesContainer: {
//     height: '80%',
//     paddingBottom: '20%'
//   },
//   inputContainer: {
//     width: '100%',
//     height: 60,
//     position: 'absolute',
//     bottom: 20,
//     paddingVertical: 8,
//     paddingLeft: 10,
//     backgroundColor:'#fff'
//   },
//   namePicContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     margin: 10
//   },
//   userimg: {
//     width: 40,
//     height: 40,
//     borderRadius: 30,
//     marginRight: 13
//   },

//   moodlet: {
//     right: -32,
//     bottom: 13,
//     width: 15,
//     height: 15,
//     marginBottom:-20
//   },

//   text: {
//     fontWeight:'800',
//     fontSize:16,
//     color:'#1877F2'     
//   },

//   t: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: "#009E54",
//   },
// })

