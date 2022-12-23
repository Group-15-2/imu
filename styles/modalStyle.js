import { StyleSheet } from 'react-native';


const modalStyle = StyleSheet.create({
    selectScreen: {
        height: '28%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#25292e',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },

    previewScreen: {
        height: '60%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#25292e',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    reAuthenticateModal: {
        position: 'relative',
        minHeight: '25%',
        width: '90%',
        backgroundColor: '#25292e',
        alignSelf: 'center',
        borderRadius: 10,
        top: '25%'
    },

    editDetailModal: {
        position: 'relative',
        minHeight: '25%',
        width: '90%',
        backgroundColor: '#25292e',
        alignSelf: 'center',
        borderRadius: 10,
        top: '25%'
    },

    container: {
        padding: 15
    },

    header: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },

    fontContainer: {
        alignItems: 'center'
    },
    fontText: {
        color: '#fff',
        paddingTop: 5
    },
    iconFrame: {
        borderColor: '#1877F2',
        borderWidth: 1,
        padding: 10,
        borderRadius: 80
    },

    previewImage: {
        width: 245,
        height: 245,
        borderRadius: 300,
        borderWidth: 1,
        borderColor: '#1877F2',
        marginVertical: 20,
        alignSelf: 'center'
    },


    confirmModal: {
        position: 'relative',
        minHeight: '20%',
        width: '90%',
        backgroundColor: '#25292e',
        alignSelf: 'center',
        borderRadius: 10,
        top: '25%'
    },

    optionNo: {
        fontSize: 20,
        color: '#c1c1c1'
    },

    optionYes: {
        fontSize: 20,
        color: '#1877F2'
    }
})

export { modalStyle }