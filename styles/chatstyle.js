import { StyleSheet } from 'react-native';


const chatStyles = StyleSheet.create({

    wrapper: {
        marginLeft: 16,
        paddingTop: 30
    },

    card: {
        margin: 8,
        borderRadius: 10,
        height: '100%',
    },

    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 16,
        color: '#1877F2'
    },

    namePicContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginTop: 16,
    },

    c1: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    c2: {
        width: '20%'
    },

    userimg: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 13
    },

    moodlet: {
        right: -35,
        bottom: 18,
        width: 20,
        height: 20,
        marginBottom: -20
    },

    text: {
        fontSize: 13,
        fontWeight: '300',
        color: "#504F4F",
    },

    txt: {
        justifyContent: 'center',
        marginTop: 20,
        fontSize: 10,
        fontWeight: '600',
        color: '#504F4F'
    },

    txt2: {
        justifyContent: 'center',
        fontWeight: '600',
        color: '#1877F2'
    },

    mood: {
        fontSize: 10,
        fontWeight: '600',
        color: "#504F4F",
    },

    userName: {
        fontSize: 14,
        fontWeight: '800',
        color: "#242323",
    }
})

export { chatStyles }