import React,{ useState, useEffect} from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { thStyles } from '../styles/thstyle';

export default function Thoughts({navigation}) {

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={thStyles.header}>
        Thought Space
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Thought')}>
        <View style={{ flexDirection: 'row', marginRight: 16, marginTop:12 }}>
          <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#504F4F', }}>Add Thought</Text>
          <MaterialCommunityIcons name='plus' size={25} color={'#504F4F'} />
        </View>
      </TouchableOpacity>
      </View>  
      <View style={thStyles.card}>
        <ScrollView>
        <View style={thStyles.content}>
          <Text style={thStyles.date}>Today</Text>
        </View>
        <View >
        <View style={{flexDirection:'row'}}>
            <View style={thStyles.c1}>
              <View style={thStyles.nameContainer}>
                <View>
                    <Text style={thStyles.thought}>People Need Help</Text>
                    <Text style={thStyles.t}>People need help People expect alot and end up havin none</Text>
                </View>
              </View>
            </View>
            <View style={thStyles.c2}>
            <Text style={thStyles.txt}>15.02 PM</Text>
            </View>  
          </View>
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}   