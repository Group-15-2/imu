import { Text, View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { StyleSheet, Text, View } from "react-native";

export default function Card() {
    return (
        <View style={styles.card}>
            <Image source={require('../assets/test_profile_image.jpg')} style={cardStyles.profile_image}></Image>
            <Text style={cardStyles.name}>Dimuthu Munaweera</Text>
            <Text style={cardStyles.mood}>Happpy</Text>
        </View>

    );
};

const styles = StyleSheet.create({
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
        fontSize: 12,
        fontWeight: "600",
        color: "#504F4F",
    },
})