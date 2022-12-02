import  React,{ useState } from 'react';
import { Text, View, Image, SafeAreaView, Switch  } from 'react-native';
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
        <View>
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
    </SafeAreaView >
  );
}      
