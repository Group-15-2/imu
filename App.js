import 'expo-dev-client';
import * as React from 'react';
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

import Home from './Screens/Home'
import Profile from './Screens/Profile'
import AddPost from './Screens/AddPost'
import Thoughts from './Screens/Thoughts'
import Messages from './Screens/Messages'
import VerifyEmail from './Screens/VerifyEmail';
import SignInWithGoogle from './components/SignInWithGoogle';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function MyTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        screenOption: {
          labelStyle: {
            fontSize: 12,
          },
          tabStyle: {
            width: 100,
          },
          style: {
            paddingTop: 50,
            backgroundColor: 'red',
          },
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
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn' screenOptions={({ route }) => ({ headerShown: false })}>
        <Stack.Screen name='Home' component={MyTabs} />
        <Stack.Screen name='SignIn' component={SignIn} />
        {/* <Stack.Screen name='SignInWithGoogle' component={SignInWithGoogle} /> */}
        <Stack.Screen name='SignUp' component={Register} />
        <Stack.Screen name='VerifyEmail' component={VerifyEmail} />
        <Stack.Screen name='SignUp1' component={Register1} />
        <Stack.Screen name='SignUp2' component={Register2} />
        <Stack.Screen name='ChatBox' component={ChatBox} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

