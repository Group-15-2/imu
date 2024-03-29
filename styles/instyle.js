import { StyleSheet } from "react-native";

const inStyle = StyleSheet.create({

    head: {
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 20,
        alignItems: 'flex-start'
    },

    error: {
        color: 'red',
        textAlign: 'center'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100%',
    },

    wrapper: {
        marginHorizontal: 10
    },
    inputContainer: {
        marginVertical: 7,
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECECEC'
    },
    inputContainer1: {
        margin: 7,
        width: '20%',
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
    inputField1: {
        flexDirection: 'row',
        padding: 0,
        fontSize: 24,
        fontWeight: '900',
        width: '100%'
    },
    txtInt: {
        fontSize: 16,
        marginVertical: 10,
        width: '100%',
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
        width: '100%',
        height: 2
    },

    v: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    txt1: {
        color: '#9A9A9A',
        fontSize: 14,
        fontWeight: 'bold'
    },

    txt2: {
        color: '#1877F2',
        fontSize: 14,
        fontWeight: '700'
    },

    txt3: {
        color: '#9A9A9A',
        fontSize: 14,
        textAlign: 'center'
    },

    txt4: {
        color: '#9A9A9A',
        fontSize: 14,
        fontWeight: '400'
    },

    sIcons: {
        height: 48,
        borderRadius: 10,
        width: 54,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFEFEF',
        margin: 5
    },
    img: {
        width: 26,
        height: 26,
        backgroundColor: '#fff',
        borderRadius: 13
    }
})

export { inStyle }
