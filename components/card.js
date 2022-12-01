import React from 'react'
import { StyleSheet, Text, View, Image, Divider } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
// import { Button } from 'react-native-web';


export default function Card() {
    return (
        <View style={cardStyles.card}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Image source={require('../assets/test_profile_image.jpg')} style={cardStyles.profile_image}></Image>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    <Text style={cardStyles.name}>Malindu Wasalamudali</Text>
                    <Text style={cardStyles.sub}>4 min ago</Text>
                    <Image source={require('../assets/moodlets/happy.png')} style={cardStyles.moodlet}></Image>
                </View>
            </View>
            <Text style={{ marginLeft: 10 }}>This is Post</Text>
            <Image source={require('../assets/4.jpg')} style={cardStyles.image}></Image>
            <View style={cardStyles.divider}></View>
            <View style={cardStyles.interact} >
                <View style={cardStyles.inttab} >
                    <Icon name='thumbs-up-outline' size={25} />
                    <Text style={cardStyles.inttext}>Like</Text>
                </View>
                <View style={cardStyles.inttab}>
                    <Icon name='ios-chatbubble-ellipses-outline' size={25} />
                    <Text style={cardStyles.inttext}>Comment</Text>
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
        height: 450,
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
        fontWeight: 800,
        color: "#242323",
    },
    sub: {
        fontSize: 10,
        color: "#000",
    },
    mood: {
        fontSize: 10,
        fontWeight: 600,
        color: "#504F4F",
    },
    image: {
        width: '100%',
        height: 250,
        marginTop: 15,
    },
    interact: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
    },
    inttab: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        padding: '2px 5px'
    },
    inttext: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
        marginLeft: 5
    },
    divider: {
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        width: '100%',
        alignSelf: 'center',
        marginTop: 15

    },
    btnClickContain: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        backgroundColor: '#009D6E',
        borderRadius: 5,
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
    },

})