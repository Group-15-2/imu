import * as React from 'react';
import { Text, View, Image } from 'react-native';
import styled from '../styles/feedStyle'

export default function Profile() {
  return (
    <View >
      <Text style={{ fontSize: 30, fontWeight: 'bold',  marginLeft: 16, paddingTop: 30, color: '#1877F2' }}>
          Profile
      </Text>
      <Title style={styled.title}>
        <Text>MMMMMM</Text>
      </Title>
    </View>
  );
}      
