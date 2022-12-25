import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function InButtonLoader({ isShow }) {


    return (
        <View style={{ display: isShow }}>
            <ActivityIndicator size="small" color="#fff" />
        </View>
    )
}