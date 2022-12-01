import React from 'react'
import { StyleSheet, Text, View, Image, } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Button } from 'react-native-web';


export default function Card() {
    return (
        <View style={cardStyles.card}>
            <View style={cardStyles.cardHead}>
                <View style={cardStyles.namePicContainer}>
                    <View style={cardStyles.pfp}>
                        <Image source={require('../assets/test_profile_image.jpg')} style={cardStyles.profile_image}></Image>
                        <Image source={require('../assets/moodlets/happy.png')} style={cardStyles.moodlet}></Image>
                    </View>

                    <View>                
                        <Text style={cardStyles.name}>Confused Unga Bunga</Text>
                        <Text style={cardStyles.mood}>Happy</Text>
                    </View>
                </View>

                <MaterialCommunityIcons name="message-text-outline" color={'#1877F2'} size={42} />
            </View>

            <View style={{ backgroundColor: '#8EDD81', width: '100%', height: 290, }}>
                <Text style={cardStyles.post_text}>dsfsudh skjdhfksjhfkjs skdjhfksjdhfkjsdh ksjdhkfsjdh</Text>
            </View>

        </View>
    );
};

const cardStyles = StyleSheet.create({

    cardHead: {
        padding: 8,
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    namePicContainer: {
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    card: {
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 10,
        height: 450,
    },

    pfp: {
        display: "flex",
        flexDirection: "row",
    },

    moodlet: {
        right: 10,
        bottom: 0,
        width: 12,
        height: 12,
    },

    profile_image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },

    name: {
        // fontFamily: "Jakartha",
        fontSize: 14,
        fontWeight: '800',
        color: "#242323",
    },
    mood: {
        fontSize: 10,
        fontWeight: '600',
        color: "#504F4F",
    },
    post_text: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
})