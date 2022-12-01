import React from 'react'
import { StyleSheet, Text, View, Image, } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Button } from 'react-native-web';


export default function Card() {
    return (
        <View style={cardStyles.card}>
            <View style={cardStyles.card_head}>
                <Image source={require('../assets/test_profile_image.jpg')} style={cardStyles.profile_image}></Image>
                <Text style={cardStyles.name}>Malindu Wasalamudali</Text>
                <Text style={cardStyles.mood}>Happy</Text>
                <Image source={require('../assets/moodlets/happy.png')} style={cardStyles.moodlet}></Image>
                <MaterialCommunityIcons name="message-text-outline" color={'#1877F2'} size={42} />
            </View>

            <View style={{ backgroundColor: '#8EDD81', minWidth: 328, minHeight: 290 }}>
                <Text style={cardStyles.post_text}>dsfsudh skjdhfksjhfkjs skdjhfksjdhfkjsdh ksjdhkfsjdh</Text>
            </View>

        </View>
    );
};

const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 10,
        height: 450,
    },

    card_head: {
        flexDirection: 'column',
        marginTop: 10,
    },

    profile_image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    moodlet: {
        width: 12,
        height: 12,
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
        justifyContent: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
})