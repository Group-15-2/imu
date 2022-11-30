import { Text, View, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function Card() {
    return (
        <View>
            <Image source={require('../assets/test_profile_image.jpg')} style={cardStyles.profile_image}></Image>
            {/* <Image source={require('')} style={cardStyles.moodlet}></Image> */}
            <Text style={cardStyles.name}>Dimuthu Munaweera</Text>
            <Text style={cardStyles.mood}>Happy</Text>
        </View>
    );
}

const cardStyles = StyleSheet.create({
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
