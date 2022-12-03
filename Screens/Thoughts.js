import * as React from 'react';
import { SectionList, Text, View } from 'react-native';
import { thStyles } from '../styles/thstyle';

export default function Addpost() {
  return (
    <View>
      <Text style={thStyles.header}>
        Thought Space
      </Text>
      <View style={thStyles.card}>
        <View style={thStyles.content}>
          <Text style={thStyles.date}>Today</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={thStyles.c1}>
              <View style={thStyles.nameContainer}>
              <View>
                  <Text style={thStyles.thought}>People Need Help</Text>
                  <Text style={thStyles.t}>People need help People expect alot and end up havin none</Text>
              </View>
          </View>
          </View>
          <View style={thStyles.c2}>
          <Text style={thStyles.txt}>15.02 PM</Text>
          </View>  
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={thStyles.c1}>
              <View style={thStyles.nameContainer}>
              <View>
                  <Text style={thStyles.thought}>People Need Help</Text>
                  <Text style={thStyles.t}>People need help People expect alot and end up havin none</Text>
              </View>
          </View>
          </View>
          <View style={thStyles.c2}>
          <Text style={thStyles.txt}>15.02 PM</Text>
          </View>  
        </View>
      </View>
    </View>
  );
}   