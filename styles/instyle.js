import { StyleSheet } from "react-native";

const inStyle = StyleSheet.create ({

    head: {
        fontSize: 32,
        fontWeight: '800',
        marginLeft: 10,
        alignItems: 'flex-start'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        width:'100%'
    },
    inputContainer: {
        margin: 7,
        width: '95%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECECEC'
    },
    inputField: {
        flexDirection: 'row',
        color: '#BBBBBB',
        padding: 12,
        fontSize: 24,
        fontWeight: '900',
        width: '90%'
    },
    txtInt: {
        fontSize: 16,
        margin: 7,
        width: '95%',
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1877F2',
    },
    txt: {
        fontSize: 16,
        color: '#fff'
    },
    divider: {
        backgroundColor: '#D9D9D9',
        width: '90%',
        margin: 15,
        height: 2
    },

    v: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    txt1: {
        color: '#9A9A9A',
        fontSize: 14,
        fontWeight: '500'
    }
})

export  { inStyle }
