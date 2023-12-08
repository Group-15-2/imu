import { StyleSheet } from 'react-native';

const addStyles = StyleSheet.create({

    wrapper: {
        margin: 8,
    },

    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 16,
        paddingTop: 30,
        color: '#1877F2',
    },

    card: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        // minHeight: 300,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingHorizontal: 5,
    },

    color_picker: {
        width: 24,
        height: 24,
        borderRadius: 50,
        borderColor: '#fff',
        marginHorizontal: 3
    },

    color_picker_wrapper: {
        alignSelf: 'center',
        paddingVertical: 20
    },

    flatlist_container: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    post_btn: {
        alignSelf: 'center',
        borderRadius: 10,
        width: '40%',
        marginTop: 10,
        paddingVertical: 10
    },

    post_btn_text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export { addStyles }
