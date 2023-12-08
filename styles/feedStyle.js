import { StyleSheet } from 'react-native';


const styled = StyleSheet.create({

    wrapper: {
        marginLeft: 16,
        paddingTop: 30
    },

    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 16,
        color: '#1877F2'
    },

    card: {
        margin: 8,
        borderRadius: 10,
        height: '86%',
    },

    profileCard: {
        margin: 8,
        borderRadius: 10,
        height: '100%'
    },

    userinfo: {
        // justifyContent: 'flex-start',
        marginVertical: 10,
        // alignSelf: 'center'
    },

    userimg: {
        width: 100,
        height: 100,
        borderRadius: 90,
        borderColor: '#1877F2',
        borderWidth: 1
    },

    name: {
        fontSize: 16,
        fontWeight: '700',
    },

    moodlet: {
        right: -75,
        bottom: 20,
        width: 20,
        height: 20,
    },

    id: {
        fontSize: 10,
        fontWeight: '300',
        color: "#504F4F",
        textAlign: 'center',
        marginTop: -5
    },

    anonymity: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#504F4F",
        padding: 10
    },

    btn: {
        // right: 20,
        // bottom: 30
    },

    button: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    refresh: {
        fontSize: 18
    },

    details: {
        margin: 10,
    },

    divider: {
        paddingVertical: 5
    },

    userd: {
        color: '#6C6C6C',
        fontSize: 12,
        fontWeight: '500',
    },

    txtint: {
        height: 40,
        width: '90%',
        paddingLeft: 10,
        fontWeight: '400',
        fontSize: 14,
        color: '#242323',
        textAlignVertical: 'center'

    },

    editbtn: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        flexDirection: 'row',
        backgroundColor: '#ECECEC',
        color: '#242323',
        padding: 6,
        borderRadius: 10,
        marginTop: 4,
        
    },

    textButton: {
        color: '#1877F2',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
    },

    aboutButton: {
        color: '#1877F2',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 60,
    }
})

export { styled }