import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import homeScreen from './Screens/Home'
import settingsScreen from './Screens/Settings'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'ios-list' : 'ios-list-outline';
        }
        else if (route.name === 'Messages') {
          iconName = focused ? 'mail' : 'mail-outline';
        }
        else if (route.name === 'Thoughts') {
          iconName = focused ? 'star' : 'star-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
      <Tab.Screen name="Home" component={homeScreen} />
      <Tab.Screen name="Messages" component={settingsScreen} />
      <Tab.Screen name="+" component={settingsScreen} />
      <Tab.Screen name="Thoughts" component={settingsScreen} />
      <Tab.Screen name="Settings" component={settingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}