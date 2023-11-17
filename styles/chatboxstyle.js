import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
      backgroundColor: '#fff',
      paddingLeft: 7,
      paddingRight: 7,
      margin: 1,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20
    },
    topSelector: {
      display: 'flex',
      backgroundColor:'#fff',
      flexDirection: 'row',
      alignItems: 'center',
      height: 60
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginLeft: 16,
      paddingTop: 10,
      color: '#1877F2'
    },
    namePicContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10
    },
    userimg: {
      width: 40,
      height: 40,
      borderRadius: 30,
      marginRight: 13
    },
  
    moodlet: {
      right: -32,
      bottom: 13,
      width: 15,
      height: 15,
      marginBottom: -20
    },
  
    text: {
      fontWeight: '800',
      width: 150,
      fontSize: 16,
      color: '#1877F2'
    },
  
    t: {
      fontSize: 12,
      fontWeight: '700',
      color: "#009E54",
    },
    dot: {
      left: 20
    }
  });

  export {styles}