import  React,{ useState } from 'react';
import { Text, View, Image, SafeAreaView, Switch, TouchableOpacity, TextInput  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styled} from '../styles/feedStyle'

export default function Profile() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView >
      <Text style={{ fontSize: 30, fontWeight: 'bold',  marginLeft: 16, paddingTop: 30, color: '#1877F2' }}>
          Profile
      </Text>
      <View style={styled.card}>
        <View style={{flexDirection:"row"}}>
          <View style={{width:'73%'}}>
            <View style={styled.userinfo}>
                <View>
                  <Image source={require('../assets/test_profile_image.jpg')} style={styled.userimg}/>
                  <Image source={require('../assets/moodlets/happy.png')} style={styled.moodlet}/>
                </View>
                <View style={styled.v}>
                  <Text style={styled.name}>Chamra Atapattu</Text> 
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
          <TextInput style={styled.txtint} placeholder="Type here to translate!">
          <Icon
            name='square-edit-outline'
            color='#000'
            size={18}
          />
          </TextInput>
        </View>
        <View style={styled.details}>
          <Text style={styled.userd}>Your Email</Text>
          <TextInput style={styled.txtint} placeholder="Type here to translate!">
          <Icon  name='square-edit-outline'
            color='#000'
            size={18}
          />
          </TextInput>
        </View>
        <View style={styled.details}>
          <Text style={styled.userd}>Phone Number</Text>
          <TextInput style={styled.txtint} placeholder="Type here to translate!">
          <Icon
            name='square-edit-outline'
            color='#000'
            size={18}
          />
          </TextInput>
        </View>
      </View>
    </SafeAreaView >
  );
}      
