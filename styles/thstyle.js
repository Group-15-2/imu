import {StyleSheet} from 'react-native';

const thStyles = StyleSheet.create({

    header: {
        fontSize: 30, 
        fontWeight: 'bold',  
        marginLeft: 16,
        color: '#1877F2', 
    },

    card: {
        margin: 8,
        borderRadius: 10,
        height: "100%",
    },

    content: {
        marginLeft: 10,
        marginTop: 10
    },

    date: {
        fontSize: 16,
        fontWeight: '800',
        color: '#64A4F6',
        marginTop: 5
    },

    c1: {
        width: '85%'
    },

    c2: {
        width: '15%'
    },

    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
    },

    nameContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
    },

    thoughtContent: {
        fontSize: 14,
        fontWeight: '400',
        color: "#504F4F",
        marginTop: 2,
    },

    txt: {
        justifyContent: 'center',
        fontSize: 10,
        fontWeight: '600',
        color:'#504F4F'
    },

    thought: {
        fontSize: 18,
        fontWeight: '600',
        color:'#1877F2'
    },
    txtinput: {
        height:'75%',
        margin:5,
        padding:10, 
        fontSize:16, 
        textAlignVertical:'top', 
        borderRadius: 10,
        borderWidth:2,
        borderColor: '#9A9A9A'
    },
    txtinput1: {
        margin:5,
        padding:10, 
        fontSize:16,  
        borderRadius: 10,
        borderWidth:2,
        borderColor: '#9A9A9A'
    }
    
})

export { thStyles }
