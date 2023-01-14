import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { thStyles } from '../styles/thstyle';
import { auth, database } from '../firebaseConfig';
import { ref, set, update } from 'firebase/database';
import moment from 'moment/moment';

export default function Thought({navigation}) {

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    var time = moment()
      .utcOffset('+05:30')
      .format(' hh:mm a');
    setTime(time);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setDate( date + '/' + month + '/' + year );
  }, []);

  function save() {
    set(ref(database, '/notes'), {
      title: title,
      note: note,
      date: date,
      time: time
    }).then(() => {
      alert('Note Saved');
    })
      .catch((error) => {
        alert(error)
      });
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
