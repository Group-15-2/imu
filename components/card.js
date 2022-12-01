import React from 'react'
import { StyleSheet, Text, View, Image, User } from "react-native";

export default function Card() {
    return (
        <View style={cardStyles.card }>
            <View style={{flexDirection:'row'}}>
            <Image source={require('../assets/test_profile_image.jpg')} style={cardStyles.profile_image}></Image>
            <View style={{flexDirection:'column', marginTop:10}}>
                <Text style={cardStyles.name}>Malindu Wasalamudali</Text>
                <Text style={cardStyles.sub}>4 min ago</Text>
                <Image source={require('../assets/moodlets/happy.png')} style={cardStyles.moodlet}></Image>
            </View>
            </View>
        </View>
        
    );
};

const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 10,
        height: 400
    },

    profile_image: {
        width: '60px',
        height: '60px',
        borderRadius: '30px',
    },
    moodlet: {
        width: 12,
        height: 12,
    },
    name: {
        fontFamily: "Jakartha",
        fontSize: 14,
        fontWeight: "800",
        color: "#242323",
    },
    sub: {
        fontSize:10,
        color:"#000",
    },
    mood: {
        fontSize: 10,
        fontWeight: "600",
        color: "#504F4F",
    },
})