import React from 'react'
import { StyleSheet, Text, View } from "react-native";

export default function Card() {
    return (
        <View style={ styles.card }></View>

    );
  };
  
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 10,
        height: 400
    }
})
