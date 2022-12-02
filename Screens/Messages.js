import * as React from 'react';
import {Text, View, Image, SafeAreaView, Switch, TouchableOpacity, TextInput} from 'react-native';
import {styled} from '../styles/feedStyle'

export default function Messages() {
  return (
    <View >
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 16, paddingTop: 30, color: '#1877F2' }}>
        Chats
      </Text>

      <View>
        <TouchableOpacity>
          <View>
            <View>
              <Image source={require('../assets/test_profile_image.jpg')} style={styled.userimg}/>
              <Image source={require('../assets/moodlets/happy.png')} style={styled.moodlet}/>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View>
            
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View>

          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};