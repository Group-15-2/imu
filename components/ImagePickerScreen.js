import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { inStyle } from '../styles/instyle';
import { auth, storage } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { modalStyle } from '../styles/modalStyle';
import { getDownloadURL, ref, uploadBytes, deleteObject, } from "firebase/storage";
import ConfirmModal from '../components/ConfirmModal';


export default function ImagePickerScreen({ setIsLoaderOpen }) {

    //getter and setter for picked image
    const [image, setImage] = useState(null);

    //getters and setters for modal visibility state
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSelectModalOpen, setSelectModalOpen] = useState(false);
    const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);

    //create a reference to the uploaded profile picture in firebase storage
    const imageRef = ref(storage, auth.currentUser.uid);

    //upload image function
    const uploadImage = async () => {

        setIsLoaderOpen(true);

        //create a blob
        const response = await fetch(image);
        const blob = await response.blob();

        setPreviewModalOpen(false);
        setImage(null);

        //upload to firebase storage
        uploadBytes(imageRef, blob, {
            contentType: 'image/jpeg',
        })
            .then((snapshot) => {
                //get the url for the image
                getDownloadURL(imageRef)
                    .then((url) => {
                        //update profile picture link
                        authUpdatePFP(url);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            })
    };

    //update profile picture url in firebase auth function
    const authUpdatePFP = (url) => {
        updateProfile(auth.currentUser, {
            photoURL: url
        }).then(() => {
            setIsLoaderOpen(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    //delete profile picture function
    const deletePhoto = () => {

        setIsLoaderOpen(true);
        setIsConfirmModalOpen(false);

        //delete image from firebase storage
        deleteObject(imageRef).then(() => {
            //clear profile picture url
            authUpdatePFP('');
        }).catch((error) => {
            console.log(error);
            if (error.code == 'storage/object-not-found') {
                //clear profile picture url
                authUpdatePFP('');
            }
        });
    }




    //pick image from gallery function
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        //if image picked....
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setSelectModalOpen(false);
            setPreviewModalOpen(true);
        };
    };

    //pick image from camera function
    const pickCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        //if image picked....
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setSelectModalOpen(false);
            setPreviewModalOpen(true);
        };
    }

    //choose photo pick options
    const handleUploadImage = () => {
        setSelectModalOpen(true);
    }





    return (
        <View style={{ alignSelf: 'center', top: -10 }}>

            <Modal animationType="slide" visible={isSelectModalOpen} transparent={true} onRequestClose={() => setSelectModalOpen(false)}>
                <View style={modalStyle.selectScreen}>
                    <View style={modalStyle.container}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={modalStyle.header}>Change Profile Picture</Text>

                            <TouchableOpacity onPress={() => { setIsConfirmModalOpen(true); setSelectModalOpen(false); }}>
                                <Icon
                                    name='delete'
                                    color='#D9D9D9'
                                    size={30}
                                    style={{ bottom: 2 }}
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
                                    <Text style={modalStyle.fontText}>Camera</Text>
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
                <Text style={inStyle.txt2}>Change Profile Picture</Text>
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