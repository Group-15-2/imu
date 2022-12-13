import  React,{ useState } from 'react';
import { Text, View, Image, SafeAreaView, Switch, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styled} from '../styles/feedStyle';

export default function Profile({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView >
      <Text style={styled.header}>
          Profile
      </Text>
      <View style={styled.card}>
        <ScrollView>
        <View style={{flexDirection:"row"}}>
          <View style={{width:'73%'}}>
            <View style={styled.userinfo}>
                <View>
                  <Image source={require('../assets/test_profile_image.jpg')} style={styled.userimg}/>
                  <Image source={require('../assets/moodlets/happy.png')} style={styled.moodlet}/>
                </View>
                <View style={styled.v}>
                  <Text style={styled.name}>Chamara Atapattu</Text> 
                  <Text style={styled.id}>ID = DAf345h5G5</Text>
                </View> 
            </View>
          </View>  
          <View style={{width:'27%'}}>
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
        </View> 
        <TouchableOpacity style={styled.button}>
          <Icon name= 'refresh' size={20} />
          <Text style={styled.refresh}>Generate New Identity</Text>
        </TouchableOpacity>
        <View style={styled.details}>
          <Text style={styled.userd}>Your Name</Text>
          <View style={styled.input}>
          <TextInput style={styled.txtint} placeholder="Type here to translate!"/>
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
          <TextInput style={styled.txtint} placeholder="Type here to translate!"/>
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
          <TextInput style={styled.txtint} placeholder="Type here to translate!"/>
          <TouchableOpacity style={styled.editbtn}>
            <Icon
              name='square-edit-outline'
              color='#000'
              size={18}
            />
          </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </View>
    </SafeAreaView >
  );
}      
