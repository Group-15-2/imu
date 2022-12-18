import React, { useState, useEffect } from 'react';
import {Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {chatStyles} from '../styles/chatstyle';
import { useFocusEffect } from '@react-navigation/native';
import { mood } from '../Screens/Home';

export default function Chat({navigation}) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //update moodlet image link from the home
    const [imgLink, setImgLink] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
          setImgLink(mood);
        }, [])
      );
    return(
        <SafeAreaView>
            <View>
                <View style={{flexDirection:'row'}}>
                    <View style={chatStyles.c1}>
                        <View style={chatStyles.namePicContainer}>
                        <View> 
                            <Image source={require('../assets/test_profile_image.jpg')} style={chatStyles.userimg}/>
                            <Image source={imgLink} style={chatStyles.moodlet}/>
                        </View>
                        <View>
                            <Text>Confused Unga Bunga</Text>
                            <Text style={chatStyles.t}>You: Anytime</Text>
                        </View>
                    </View>
                    </View>
                    <View style={chatStyles.c2}>
                    <Text style={chatStyles.txt}>15.02 PM</Text>
                    </View>  
                </View>
            </View>
        </SafeAreaView>
    )
}
