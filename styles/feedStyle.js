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
        marginRight: 10
    },
    name: {
        fontSize: 18,
        fontWeight:'bold',
        marginTop:10
    }
})

export  { styled }