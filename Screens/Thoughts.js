import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, database } from '../firebaseConfig';
import { ref, set, onValue, push } from '@firebase/database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { thStyles } from '../styles/thstyle';

export default function Thoughts({ navigation }) {

  const [noteData, setNoteData] = useState('');

  useEffect(() => {
    const starCounRef = ref(database, 'notes/' + auth.currentUser.uid);
    onValue(starCounRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newNotes = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        console.log(newNotes);
        setNoteData(newNotes);
      } else {
        setNoteData([{ date: "Thought space is empty!" }])
      }
    })
  }, []);

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={thStyles.header}>
          Thought Space
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Thought')}>
          <View style={{ flexDirection: 'row', marginRight: 16, marginTop: 12 }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#504F4F', }}>Add Thought</Text>
            <MaterialCommunityIcons name='plus' size={25} color={'#504F4F'} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={thStyles.card}>
        <View>
          <FlatList
            data={noteData}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <View key={index}>
                <View style={thStyles.content}>
                  <Text style={thStyles.date}>{item.date}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={thStyles.c1}>
                    <View style={thStyles.nameContainer}>
                      <View>
                        <Text style={thStyles.thought}>{item.title}</Text>
                        <Text style={thStyles.t}>{item.note}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={thStyles.c2}>
                    <Text style={thStyles.txt}>{item.time}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}   