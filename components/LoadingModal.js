import { View, Text, ActivityIndicator, Modal } from 'react-native'
import React from 'react'

export default function LoadingModal({ visibility }) {
    return (
        <Modal animationType="fade" visible={visibility} transparent={true}>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#000000cf' }}>
                <ActivityIndicator size="large" color="#1877F2" />
            </View>

        </Modal>
    )
}