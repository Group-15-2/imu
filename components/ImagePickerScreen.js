import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { inStyle } from '../styles/instyle';
import { auth, storage } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { async } from '@firebase/util';
import { modalStyle } from '../styles/modalStyle';
import { } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject, } from "firebase/storage";
import ConfirmModal from '../components/ConfirmModal';

export default function ImagePickerScreen({ setIsLoaderOpen }) {


    const [image, setImage] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    // const [imageFile, setImageFile] = useState(null);
    const [isSelectModalOpen, setSelectModalOpen] = useState(false);
    const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);

    const imageRef = ref(storage, auth.currentUser.uid);

    const uploadImage = async () => {

        setIsLoaderOpen(true);

        const response = await fetch(image);
        const blob = await response.blob();

        setPreviewModalOpen(false);
        setImage(null);

        uploadBytes(imageRef, blob, {
            contentType: 'image/jpeg',
        })
            .then((snapshot) => {
                getDownloadURL(imageRef)
                    .then((url) => {

                        updateProfile(auth.currentUser, {
                            photoURL: url
                        }).then(() => {

                            setIsLoaderOpen(false);

                        }).catch((error) => {
                            // An error occurred
                            // ...
                            console.log(error);
                        });

                    })
                    .catch((error) => {
                        console.log(error);
                    });


            })
            .catch((error) => {
                console.log(error);
            })

    };

    const deletePhoto = () => {
        setIsLoaderOpen(true);
        setIsConfirmModalOpen(false);
        deleteObject(imageRef).then(() => {
            updateProfile(auth.currentUser, {
                photoURL: ''
            }).then(() => {

                setIsLoaderOpen(false);

            }).catch((error) => {
                // An error occurred
                // ...
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }





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
                <View style={modalStyle.selectScreen}>
                    <View style={modalStyle.container}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={modalStyle.header}>Upload Profile Photo</Text>

                            <TouchableOpacity onPress={() => { setIsConfirmModalOpen(true); setSelectModalOpen(false); }}>
                                <Icon
                                    name='delete'
                                    color='#D9D9D9'
                                    size={30}
                                    style={{ bottom: 5 }}
                                />
                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20 }}>

                            <TouchableOpacity onPress={pickCamera}>
                                <View style={modalStyle.fontContainer}>
                                    <View style={modalStyle.iconFrame}>
                                        <Icon
                                            name='camera'
                                            color='#1877F2'
                                            size={30}
                                        />
                                    </View>
                                    <Text style={modalStyle.fontText}>Gallery</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={pickImage}>
                                <View style={modalStyle.fontContainer}>
                                    <View style={modalStyle.iconFrame}>
                                        <Icon
                                            name='camera-burst'
                                            color='#1877F2'
                                            size={30}
                                        />
                                    </View>
                                    <Text style={modalStyle.fontText}>Gallery</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >


            <Modal animationType="slide" visible={isPreviewModalOpen} transparent={true} onRequestClose={() => { setPreviewModalOpen(false); setImage(null); }}>
                <View style={modalStyle.previewScreen}>
                    <Image source={{ uri: image }} style={modalStyle.previewImage} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
                        <TouchableOpacity onPress={() => { setPreviewModalOpen(false); setImage(null); }}>
                            <Text style={modalStyle.optionNo}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={uploadImage}>
                            <Text style={modalStyle.optionYes}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>



            <TouchableOpacity onPress={handleUploadImage}>
                <Text style={inStyle.txt2}>Upload Profile Picture</Text>
            </TouchableOpacity>

            <ConfirmModal
                subject={'Remove Profile Photo?'}
                setConfirmModalOpen={setIsConfirmModalOpen}
                isConfirmModalOpen={isConfirmModalOpen}
                onPress={deletePhoto}
            />

        </View >

    )
}