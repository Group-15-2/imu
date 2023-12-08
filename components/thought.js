import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { thStyles } from '../styles/thstyle';
import { auth, database } from '../firebaseConfig';
import { ref, set, update, push, child } from 'firebase/database';
import moment from 'moment/moment';

export default function Thought({ navigation }) {

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  //Generate new key
  const newKey = push(child(ref(database), 'notes')).key
  const [characterLimit] = useState(1000);


  useEffect(() => {
    var time = moment()//Set Current Time
      .utcOffset('+05:30')
      .format(' hh:mm A');
    setTime(time);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setDate(date + '/' + month + '/' + year);
  }, []);

  function save() {
    if (title.trim() && note.trim()) {
      //Set Data in database
      set(ref(database, 'notes/' + auth.currentUser.uid + '/' + newKey), {
        title: title,
        note: note,
        time: time,
        date: date
      }).then(() => {
        alert('Note Saved');
      })
        .catch((error) => {
          alert(error)
        })
      navigation.navigate('Home');
      setTitle('');
      setNote('');
    } else {
      alert('Note can\'t be empty');
    }
  };


  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={thStyles.header}>
          Your Thought
        </Text>
        <TouchableOpacity onPress={save}>
        <View style={{ flexDirection: 'row', marginRight: 16, marginTop: 12, alignItems: 'center', }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#504F4F', }}>Save</Text>
            <MaterialCommunityIcons name='content-save-outline' size={18} color={'#504F4F'} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={thStyles.card}>
        <TextInput
          value={title}
          onChangeText={(title) => { setTitle(title) }}
          placeholder='Title...'
          placeholderTextColor={'#6C6C6C'}
          style={thStyles.txtinput1}
        />
        <TextInput
          editable
          multiline
          numberOfLines={100}
          maxLength={1000}
          value={note}
          onChangeText={(note) => { setNote(note)}}
          placeholder='Jot your thoughts here.........'
          placeholderTextColor={'#6C6C6C'}
          style={thStyles.txtinput}
        />
        <View style={{flexDirection:'row', justifyContent:'flex-end', marginRight:10}}>
         <Text>{note.length}/{characterLimit}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}