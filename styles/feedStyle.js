import {StyleSheet} from 'react-native';

const styled = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        margin: 8,
        borderRadius: 10,
        height: 450,
    },
    userinfo: {
        justifyContent:'flex-start',
        flexDirection:'row',
        margin: 10
    },
    userimg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 13
    },
    name: {
        fontSize: 16,
        fontWeight:'700',
    },
    moodlet: {
        right: -45,
        bottom: 15,
        width: 20,
        height: 20,
    },
    id: {
        fontSize: 10,
        fontWeight: '300',
        color: "#504F4F",
    },
    v: {
        paddingTop: 15,
    },
    anonymity: {
        fontSize: 10,
        fontWeight: '500',
        color: "#504F4F",
        left:250,
        bottom:80
    },
    btn: {
        bottom:90,
        right:10
    }
})

export  { styled }