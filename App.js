import 'expo-dev-client';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SignIn from './Screens/SignIn';
import Register from './Screens/Register';
import Register1 from './Screens/Register1';
import Register2 from './Screens/Register2';
import ChatBox from './Screens/ChatBox';
import ThoughtC from './components/thought'

import Home from './Screens/Home'
import AddPost from './Screens/AddPost'
import Thoughts from './Screens/Thoughts'
import Messages from './Screens/Messages'
import VerifyEmail from './Screens/VerifyEmail';
import PasswordResetVerify from './Screens/PasswordResetVerify';
import ProfileScreen from './Screens/Profile';
import onboard from './Screens/Onboarding';
import FirstScreen from './Screens/FirstScreen';
import CheckAuthScreen from './Screens/CheckAuthScreen';
import YourComments from './Screens/YourComments';
import ViewComments from './Screens/ViewComments';
import OtherProfile from './Screens/OtherProfile';
import MyFriends from './Screens/MyFriends';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function MyTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'relative',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0, // for Android
          height: 60, // Set the height of the tab bar
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = 'home-outline';
          }
          else if (route.name === 'Profile') {
            iconName = 'account-outline';
            // How to use if we need focused states
            // iconName = focused ? 'account-outline' : 'account-outline';
          }
          else if (route.name === 'Messages') {
            iconName = 'message-text-outline';
          }
          else if (route.name === 'Thoughts') {
            iconName = 'thought-bubble-outline';
          }
          else if (route.name === 'AddPost') {
            iconName = 'plus-circle';
          }

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={32} color={color} />
        },
        tabBarActiveTintColor: '#1877F2',
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: 'true',
      })}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="AddPost" component={AddPost} options={{ tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="plus-circle" color={'#1877F2'} size={42} />), }} />
      <Tab.Screen name="Thoughts" component={Thoughts} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='FirstScreen' screenOptions={({ route }) => ({ headerShown: false })}>
        <Stack.Screen name='FirstScreen' component={FirstScreen} />
        <Stack.Screen name='Onboard' component={onboard} />
        <Stack.Screen name='CheckAuthScreen' component={CheckAuthScreen} />
        <Stack.Screen name='Home' component={MyTabs} />
        <Stack.Screen name='YourComments' component={YourComments} />
        <Stack.Screen name='ViewComments' component={ViewComments} />
        <Stack.Screen name='OtherProfile' component={OtherProfile} />
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='PasswordResetVerify' component={PasswordResetVerify} />
        <Stack.Screen name='SignUp' component={Register} />
        <Stack.Screen name='VerifyEmail' component={VerifyEmail} />
        <Stack.Screen name='SignUp1' component={Register1} />
        <Stack.Screen name='SignUp2' component={Register2} />
        <Stack.Screen name='Thoughts' component={Thoughts} />
        <Stack.Screen name='ChatBox' component={ChatBox} />
        <Stack.Screen name='Thought' component={ThoughtC} />
        <Stack.Screen name='MyFriends' component={MyFriends} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// export default function App() {
//   return (
//     <NavigationContainer >
//       <Stack.Navigator initialRouteName='FirstScreen' screenOptions={({ route }) => ({ headerShown: false })}>
//         <Stack.Screen name='FirstScreen' component={FirstScreen} />
//         <Stack.Screen name='Onboard' component={onboard} />
//         <Stack.Screen name='CheckAuthScreen' component={CheckAuthScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

