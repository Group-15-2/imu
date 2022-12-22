import React, { useState, useEffect } from 'react';
import { Text, View, Image, Switch, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styled } from '../styles/feedStyle';
import { useFocusEffect } from '@react-navigation/native';
import { mood } from './Home';
import { Divider, SocialIcon } from '@rneui/themed';
import { inStyle } from '../styles/instyle';

export default function Profile({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  //update moodlet image link from the home
  const [imgLink, setImgLink] = useState(null);

  //everytime Profile screen focuses, updates the imgLink
  useFocusEffect(
    React.useCallback(() => {
      setImgLink(mood);
    }, [])
  );

  return (
    <SafeAreaView >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styled.header}>
          Profile
        </Text>

        <TouchableOpacity>
          <View style={{ flexDirection: 'row', marginRight: 16, paddingTop: 33, }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#504F4F', paddingRight: 10 }}>Logout</Text>
            <Image source={require('../assets/logout.png')} style={{ height: 30, width: 30 }} />
          </View>
        </TouchableOpacity>

      </View>

      <View style={styled.card}>
        <ScrollView>

          <View style={{ alignSelf: 'center' }}>
            <View style={styled.userinfo}>
              <View>
                <Image source={require('../assets/test_profile_image.jpg')} style={styled.userimg} />
                <Image source={imgLink} style={styled.moodlet} />
              </View>
              <View>
                <Text style={styled.id}>ID = DAf345h5G5</Text>
              </View>
            </View>
          </View>

          <Divider style={styled.divider} />

          <View style={styled.details}>
            <Text style={styled.userd}>Your Name</Text>
            <View style={styled.input}>
              <TextInput style={styled.txtint} placeholder="Type here to translate!" />
              <TouchableOpacity style={styled.editbtn}>
                <Icon
                  name='square-edit-outline'
                  color='#000'
                  size={18}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styled.details}>
            <Text style={styled.userd}>Your Email</Text>
            <View style={styled.input}>
              <TextInput style={styled.txtint} placeholder="Type here to translate!" />
              <TouchableOpacity style={styled.editbtn}>
                <Icon
                  name='square-edit-outline'
                  color='#000'
                  size={18}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styled.details}>
            <Text style={styled.userd}>Phone Number</Text>
            <View style={styled.input}>
              <TextInput style={styled.txtint} placeholder="Type here to translate!" />
              <TouchableOpacity style={styled.editbtn}>
                <Icon
                  name='square-edit-outline'
                  color='#000'
                  size={18}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Divider style={styled.divider} />


          <View style={{ flexDirection: 'row' }}>
            <Text style={styled.anonymity}>Anonymity</Text>
            <Switch
              style={styled.btn}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View style={styled.details}>
            <Text style={styled.userd}>Generated Name</Text>
            <View style={styled.input}>
              <TextInput style={styled.txtint} placeholder="Type here to translate!" />
              <TouchableOpacity style={styled.editbtn}>
                <Icon
                  name='refresh'
                  color='#000'
                  size={18}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity activeOpacity={.7} style={[inStyle.txtInt, { marginBottom: 40 }]}>
            <Text style={inStyle.txt}>Change Password</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView >
  );
}      
