import * as React from 'react';
import {Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {chatStyles} from '../styles/chatstyle';

export default function Chat() {
    return(
        <SafeAreaView>
            <View>
                <TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <View style={chatStyles.c1}>
                        <View style={chatStyles.namePicContainer}>
                        <View> 
                            <Image source={require('../assets/test_profile_image.jpg')} style={chatStyles.userimg}/>
                            <Image source={require('../assets/moodlets/happy.png')} style={chatStyles.moodlet}/>
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
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
