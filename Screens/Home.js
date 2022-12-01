import * as React from 'react';
import { Text, View, SafeAreaView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import Card from '../components/Card';



export default function Home() {
  return (
    <SafeAreaView>
      <View style={{
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 10,
        height: 50, flexDirection: 'row'
      }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 16, paddingTop: 10, color: '#1877F2' }}>
          How Are You Feeling Today ?
        </Text>
        <button style={{ marginLeft: "auto", backgroundColor: '#add8e6', borderColor: '#fff', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} title="dfs">
          <Icon
            name='add-circle-outline'
            size={35}
            color='#black'
            style={{ height: 25, width: 25 }} />
        </button>
      </View>
      {/* <Card /> */}
    </SafeAreaView>

  );
};