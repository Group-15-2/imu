import React from 'react'
import { StyleSheet, Text, View, Image } from "react-native";

export default function Card() {
    return (
        <View style={cardStyles.card}>
            <Image source={require('../assets/test_profile_image.jpg')} style={cardStyles.profile_image}></Image>
            <Image source={require('../assets/moodlets/happy.png')} style={cardStyles.moodlet}></Image>
            <Text style={cardStyles.name}>Dimuthu Munaweera</Text>
            <Text style={cardStyles.mood}>Happy</Text>
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
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    moodlet: {
        width: 12,
        height: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: "800",
        color: "#242323",
    },
    mood: {
        fontSize: 10,
        fontWeight: "600",
        color: "#504F4F",
    },
})