import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import { chatStyles } from '../styles/chatstyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, database } from '../firebaseConfig';
import { get, onValue, ref, set } from 'firebase/database';
import moment from 'moment/moment';
import { FormatTime } from '../components/services/FormatTime';
import { defaultPFP } from './Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AboutUs({ navigation }) {


    const [data, setData] = useState([]);
    const [errorVisibility, setErrorVisibility] = useState('none');
    // const [linkVisibility, setLinkVisibility] = useState('none');

    

    // const openURL = async (url) => {
    // let result = await WebBrowser.openBrowserAsync(url);
    // console.log(result);
    // };


    useEffect(() => {
      onValue(ref(database, 'aboutUs'), (snapshot) => {
        if (snapshot.val() !== null) {
          const data = snapshot.val();
          setData(data);
        } else {
            setData(null);
        }

        // if (snapshot.child("link").val() !== null) {
        //     setLinkVisibility('flex');
        //   } else {
        //     setLinkVisibility('none');
        //   }
      })
    }, [])

    useEffect(() => {
        if (data) {
            setErrorVisibility('none');
        } else {
            setErrorVisibility('flex');
        }

        // if (data.link !== null) {
        //     setLinkVisibility('flex');
        // } else {
        //     setLinkVisibility('none');
        // }
    }, [data])

  return (
    <SafeAreaView>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity activeOpacity={.7} onPress={() => navigation.goBack()} style={{ justifyContent: 'center' }}>
                <MaterialCommunityIcons name='chevron-left' size={34} />
            </TouchableOpacity>
            <Text style={chatStyles.header}>
                About Us
            </Text>
        </View>
      <View style={chatStyles.card}>
        <Text style={{ color: '#1877F2', fontWeight: 'bold', textAlign: 'center', display: errorVisibility }}>No Data Available</Text>
        <View style={{ alignItems: 'center', padding: 10}}>
            <Image source={require('../assets/icon1.png')} style={{ width: 100, height: 100 }} />
            <Text style={{fontWeight: 'bold', paddingBottom: 20}}>Imu Mobile App</Text>
            <Text style={{textAlign: 'justify', margin: 5}}>{data.text}</Text>
            {/* <TouchableOpacity onPress={() => openURL(data.link)} style={{display: linkVisibility}}>
                <Text style={{ color: '#1877F2', fontWeight: 'bold', textAlign: 'center'}}>View Project Documentation</Text>
            </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};