import React, { useState, useEffect } from 'react';
import { Text, View, Image, SafeAreaView, Switch, TouchableOpacity, TextInput, ScrollView, Modal, StyleSheet, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { inStyle } from '../styles/instyle';
import { auth } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { async } from '@firebase/util';

export default function ImagePickerScreen() {


    const [image, setImage] = useState(null);
    const [isSelectModalOpen, setSelectModalOpen] = useState(false);
    const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setSelectModalOpen(false);
            setPreviewModalOpen(true);
        };
    };

    const pickCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setSelectModalOpen(false);
            setPreviewModalOpen(true);
        };
    }

    const handleUploadImage = () => {
        setSelectModalOpen(true);
    }



    return (
        <View style={{ alignSelf: 'center', top: -10 }}>

            <Modal animationType="slide" visible={isSelectModalOpen} transparent={true} onRequestClose={() => setSelectModalOpen(false)}>
                <View style={styles.selectScreen}>
                    <View style={styles.container}>

                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Upload Profile Photo</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20 }}>

                            <TouchableOpacity onPress={pickCamera}>
                                <View style={styles.fontContainer}>
                                    <View style={styles.iconFrame}>
                                        <Icon
                                            name='camera'
                                            color='#1877F2'
                                            size={30}
                                        />
                                    </View>
                                    <Text style={styles.fontText}>Gallery</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={pickImage}>
                                <View style={styles.fontContainer}>
                                    <View style={styles.iconFrame}>
                                        <Icon
                                            name='camera-burst'
                                            color='#1877F2'
                                            size={30}
                                        />
                                    </View>
                                    <Text style={styles.fontText}>Gallery</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >


            <Modal animationType="slide" visible={isPreviewModalOpen} transparent={true} onRequestClose={() => { setPreviewModalOpen(false); setImage(null); }}>
                <View style={styles.previewScreen}>
                    <Image source={{ uri: image }} style={styles.previewImage} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
                        <TouchableOpacity onPress={() => { setPreviewModalOpen(false); setImage(null); }}>
                            <Text style={{ fontSize: 20, color: '#c1c1c1' }}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={{ fontSize: 20, color: '#1877F2' }}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>



            <TouchableOpacity onPress={handleUploadImage}>
                <Text style={inStyle.txt2}>Upload Profile Picture</Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    selectScreen: {
        height: '28%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#25292e',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },

    previewScreen: {
        height: '60%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#25292e',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },

    container: {
        padding: 15
    },

    fontContainer: {
        alignItems: 'center'
    },
    fontText: {
        color: '#fff',
        paddingTop: 5
    },
    iconFrame: {
        borderColor: '#1877F2',
        borderWidth: 1,
        padding: 10,
        borderRadius: 80
    },

    previewImage: {
        width: '70%',
        height: '70%',
        borderRadius: 300,
        borderWidth: 1,
        borderColor: '#1877F2',
        marginVertical: 20,
        alignSelf: 'center'
    }
})