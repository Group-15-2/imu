import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import Card from '../components/card';


export default function Home() {
  const [fontsLoaded] = useFonts({
    'Jakarta': require('../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf'),
  });
  return (
    <SafeAreaView>
      {/* heading */}
      <View style={styles.topSelector}>
        <Text style={styles.heading}>
          How are you Feeling today?
        </Text>
        <TouchableOpacity style={styles.button}>
         <Icon name="plus" size={16} style={styles.buttonInner}/>
        </TouchableOpacity>
      </View>
      <Card/>
      
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({

  topSelector: {
    // fontFamily: 'Jakarta',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30.24,
    marginLeft: 16,
    paddingTop: 10,
    color: '#1877F2'
  },

  button: {
    alignItems: "center",
    padding: 16,
    backgroundColor: '#C3E2FF',
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
  },

  buttonInner: {
    alignItems: "center",
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 8,
  },

})