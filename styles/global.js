import {StyleSheet} from 'react-native';


const globalStyles = StyleSheet.create({

    wrapper: {
        marginLeft: 16,
        paddingTop: 30
    },

    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1877F2'
    },

    namePicContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    userimg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 13
    },

    moodlet: {
        right: -45,
        bottom: 15,
        width: 20,
        height: 20,
        marginBottom:-20
    },
})

export  { globalStyles }