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
        padding: 20
    },
    btn: {
        right:20,
        bottom: 30
    },
    button: {
        flexDirection:'row',
        marginLeft: 10,
    },
    refresh: {
        fontSize:18
    },
    details: {
        margin: 10,
    },
    userd: {
        color: '#6C6C6C',
        fontSize: 12,
        fontWeight: '500',
    },
    txtint: {
        backgroundColor: '#ECECEC',
        height: 40,
        borderRadius: 30,
        paddingLeft: 10
    }
})

export  { styled }