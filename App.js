import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';


import homeScreen from './Screens/Home'
import settingsScreen from './Screens/Settings'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home-outline' : 'home-outline';
        } 
        else if (route.name === 'Profile') {
          iconName = focused ? 'account-outline' : 'account-outline';
        }
        else if (route.name === 'Messages') {
          iconName = focused ? 'message-text-outline' : 'message-text-outline';
        }
        else if (route.name === 'Thoughts') {
          iconName = focused ? 'thought-bubble-outline' : 'thought-bubble-outline';
        }
        else if (route.name === 'AddPost') {
          iconName = focused ? 'plus-circle' : 'plus-circle';
        }

        // You can return any component that you like here!
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: '#1877F2',
      tabBarInactiveTintColor: 'gray',
    })}
  >
      <Tab.Screen name="Home" component={homeScreen} />
      <Tab.Screen name="Messages" component={homeScreen} />
      <Tab.Screen name="AddPost" component={homeScreen} options={{showLabel: false,}} />
      <Tab.Screen name="Thoughts" component={homeScreen} />
      <Tab.Screen name="Profile" component={settingsScreen} />
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