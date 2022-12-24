import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { modalStyle } from '../styles/modalStyle';

export default function ConfirmModal({ isConfirmModalOpen, subject, setConfirmModalOpen, onPress }) {
    return (
        <Modal animationType="slide" visible={isConfirmModalOpen} transparent={true}>
            <View style={modalStyle.confirmModal}>
                <View style={modalStyle.container}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{subject}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '7%' }}>
                        <TouchableOpacity onPress={() => setConfirmModalOpen(false)}>
                            <Text style={modalStyle.optionNo}>No</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { setConfirmModalOpen(false); onPress(); }}>
                            <Text style={modalStyle.optionYes}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
