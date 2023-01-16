import React, {useState, useEffect, useRef} from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { thStyles } from '../styles/thstyle';
import { auth, database } from '../firebaseConfig';
import { ref, set, update, push, child } from 'firebase/database';
import moment from 'moment/moment';

export default function Thought({navigation}) {

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  //Generate new key
  const newKey = push(child(ref(database), 'notes')).key


  useEffect(() => {
    var time = moment()//Set Current Time
      .utcOffset('+05:30')
      .format(' hh:mm A');
    setTime(time);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setDate( date + '/' + month + '/' + year );
  }, []);

  function save() {
    //Set Data in database
    set(ref(database, 'notes/' + newKey), {
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
  };


  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={thStyles.header}>
        Your Title Here
      </Text>
      <TouchableOpacity onPress={save}>
        <View style={{ flexDirection: 'row', marginRight: 16, marginTop:12 }}>
          <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#504F4F', }}>Save</Text>
          <MaterialCommunityIcons name='content-save-outline' size={25} color={'#504F4F'}/>
        </View>
      </TouchableOpacity>
      </View>
      <View style={thStyles.card}>
        <TextInput
          value={title}
          onChangeText={(title) => {setTitle(title)}}
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
          onChangeText={(note) => {setNote(note)}}
          placeholder='Jot your thoughts here.........'
          placeholderTextColor={'#6C6C6C'}
          style={thStyles.txtinput}
        />
      </View>
    </SafeAreaView>
  );
}