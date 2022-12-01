import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Card() {

    //postTextOriginal stores the raw string of post
    //postTextProcessed stores the max characters of the post text
    //TouchableOpacityValue holds the opacity value of TouchableOpacity Element

    var postTextOriginal = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ffffffffffffffffffffffffffffff";
    var postTextProcessed;
    var TouchableOpacityValue;

    //Process the max characters of the original post text to show in the post
    //If characters are larger than 100, postTextOriginal slices to first 100 characters with '...' string
    //TouchableOpacityValue sets to 0.6
    if (postTextOriginal.length > 100) {
        postTextProcessed = postTextOriginal.slice(0, 100) + '....';
        TouchableOpacityValue = 0.6;
    }

    //Show postTextOriginal else
    //TouchableOpacityValue sets to 1
    else {
        postTextProcessed = postTextOriginal;
        TouchableOpacityValue = 1;
    }

    //This function makes post to touch and expand to view full text of the post
    const viewFullPost = () => {
        if (isShowing == false) { setPostTextProcessed(postTextOriginal); setIsShowing(true); }
        else { setPostTextProcessed(postTextProcessed); setIsShowing(false); }
    };

    //update real-time isShowing state and fullPost text to show
    const [fullPost, setPostTextProcessed] = useState(postTextProcessed);
    const [isShowing, setIsShowing] = useState(false);


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

            <TouchableOpacity activeOpacity={TouchableOpacityValue} onPress={viewFullPost}>
                <View style={{ backgroundColor: '#8EDD81', width: '100%', minHeight: 290 }}>
                    <Text style={cardStyles.post_text}>{fullPost}</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
};

const cardStyles = StyleSheet.create({

    cardHead: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    namePicContainer: {
        display: 'flex',
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
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        minHeight: 290,
        paddingHorizontal: 5,


    }
})