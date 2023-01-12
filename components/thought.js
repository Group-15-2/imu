import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { thStyles } from '../styles/thstyle';

export default function Thought({navigation}) {
  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={thStyles.header}>
        Your Title Here
      </Text>
      <TouchableOpacity>
        <View style={{ flexDirection: 'row', marginRight: 16, marginTop:12 }}>
          <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#504F4F', }}>Save</Text>
          <MaterialCommunityIcons name='content-save' size={25} color={'#504F4F'}/>
        </View>
      </TouchableOpacity>
      </View>
      <View style={thStyles.card}>
        
      </View>
    </SafeAreaView>
  );
}  
