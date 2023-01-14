import {StyleSheet} from 'react-native';

const thStyles = StyleSheet.create({

    header: {
        fontSize: 30, 
        fontWeight: 'bold',  
        marginLeft: 16,
        color: '#1877F2', 
    },

    card: {
        backgroundColor: "#fff",
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

    nameContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10
    },

    t: {
        fontSize: 10,
        fontWeight: '300',
        color: "#504F4F",
        marginTop: 5
    },

    txt: {
        justifyContent: 'center',
        marginTop: 25,
        fontSize: 10,
        fontWeight: '600',
        color:'#504F4F'
    },

    thought: {
        fontSize: 16,
    },
    txtinput: {
        height:'80%',
        margin:5,
        padding:10, 
        fontSize:16, 
        textAlignVertical:'top', 
        borderRadius: 10,
        borderWidth:2,
        borderColor: '#6C6C6C'
    },
    txtinput1: {
        margin:5,
        padding:10, 
        fontSize:16,  
        borderRadius: 10,
        borderWidth:2,
        borderColor: '#6C6C6C'
    }
    
})

export { thStyles }
