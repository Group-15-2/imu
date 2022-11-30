import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';


import homeScreen from './Screens/Home'
import profile from './Screens/Profile'
import addPost from './Screens/Addpost'
import thoughts from './Screens/Thoughts'
import messages from './Screens/Messages'

const Tab = createBottomTabNavigator();

function MyTabs() {
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

        if (route.name === 'Home') {
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
    })}
  >
      <Tab.Screen name="Home"component={homeScreen} />
      <Tab.Screen name="Messages" component={messages} />
      <Tab.Screen name="AddPost" component={addPost} options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="plus-circle" color={'#1877F2'} size={42} />),}}/>
      <Tab.Screen name="Thoughts" component={thoughts} />
      <Tab.Screen name="Profile" component={profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loaded] = useFonts({
    Jakarta: require('./assets/fonts/PlusJakartaSans-VariableFont_wght.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}