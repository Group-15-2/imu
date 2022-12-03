import * as React from 'react';
import {Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {globalStyles} from '../styles/global';

export default function Chat() {
    return(
        <SafeAreaView>
            <View>
                <TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <View style={globalStyles.c1}>
                        <View style={globalStyles.namePicContainer}>
                        <View> 
                            <Image source={require('../assets/test_profile_image.jpg')} style={globalStyles.userimg}/>
                            <Image source={require('../assets/moodlets/happy.png')} style={globalStyles.moodlet}/>
                        </View>
                        <View>
                            <Text>Confused Unga Bunga</Text>
                            <Text style={globalStyles.t}>You: Anytime</Text>
                        </View>
                    </View>
                    </View>
                    <View style={globalStyles.c2}>
                    <Text style={globalStyles.txt}>15.02 PM</Text>
                    </View>  
                </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
