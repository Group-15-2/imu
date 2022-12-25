import React, { useState, useEffect } from 'react';
import { Text, View, Image, SafeAreaView, Switch, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styled } from '../styles/feedStyle';
import { useFocusEffect } from '@react-navigation/native';
import { mood, setisLogOut } from './Home';
import { Divider, SocialIcon } from '@rneui/themed';
import { inStyle } from '../styles/instyle';
import { auth } from '../firebaseConfig';
import { GraphRequest, GraphRequestManager, AccessToken, LoginManager } from "react-native-fbsdk-next";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ImagePickerScreen from '../components/ImagePickerScreen';
import ConfirmModal from '../components/ConfirmModal';
import ReAuthenticateModal from '../components/ReAuthenticateModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import EditDetailModal from '../components/EditDetailModal';
import ChangeEmailModal from '../components/ChangeEmailModal';
import LoadingModal from '../components/LoadingModal';


export default function ProfileScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  //update moodlet image link from the home
  const [imgLink, setImgLink] = useState(null);


  //everytime Profile screen focuses, updates the imgLink
  useFocusEffect(
    React.useCallback(() => {
      setImgLink(mood);

    }, [])
  );

  useEffect(() => {
    setName(auth.currentUser.displayName);
    setEmail(auth.currentUser.email);
    setPFP(auth.currentUser.photoURL);
    setPhoneNo(auth.currentUser.phoneNumber);
    setUID(auth.currentUser.uid);

    if (auth.currentUser.photoURL == '' || auth.currentUser.photoURL == null) {
      setPFP('https://firebasestorage.googleapis.com/v0/b/project-imu.appspot.com/o/profile_default%2Fprofile-image.png?alt=media&token=b77c1557-4e43-41e2-ad60-6ca0ecf07475');
    }

  }, [auth.currentUser.email, auth.currentUser.phoneNumber, auth.currentUser.displayName, auth.currentUser.photoURL, auth.currentUser.uid]);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [PFP, setPFP] = useState();
  const [UID, setUID] = useState();
  const [generatedName, setGeneratedName] = useState();

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isReAuthenticateModalOpenPassword, setReAuthenticateModalOpenPassword] = useState(false);
  const [isReAuthenticateModalOpenEmail, setReAuthenticateModalOpenEmail] = useState(false);
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [isNameModalOpen, setNameModalOpen] = useState(false);
  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
  const [isEmailChangeModalOpen, setEmailChangeModalOpen] = useState(false);

  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  const handleLogOut = () => {
    setisLogOut(true);
    auth.signOut();
    GoogleSignin.signOut();
    // LoginManager.logOut();
    navigation.navigate('SignIn');
  }



  return (
    <SafeAreaView >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styled.header}>
          Profile
        </Text>

        <TouchableOpacity onPress={() => setConfirmModalOpen(true)}>
          <View style={{ flexDirection: 'row', marginRight: 16, paddingTop: 33, }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#504F4F', paddingRight: 10 }}>Logout</Text>
            <Image source={require('../assets/logout.png')} style={{ height: 30, width: 30 }} />
          </View>
        </TouchableOpacity>

      </View>

      <View style={styled.card}>
        <ScrollView>


          <View style={styled.userinfo}>
            <View style={{ alignSelf: 'center' }}>
              <Image source={{ uri: PFP }} style={styled.userimg} />
              <Image source={imgLink} style={styled.moodlet} />
            </View>

            <ImagePickerScreen setIsLoaderOpen={setIsLoaderOpen} />



            <View>
              <Text style={styled.id}>ID = {UID}</Text>
            </View>
          </View>


          <Divider style={styled.divider} />

          <View style={styled.details}>
            <Text style={styled.userd}>Your Name</Text>
            <View style={styled.input}>
              <Text style={styled.txtint}>{name}</Text>
              <TouchableOpacity style={styled.editbtn} onPress={() => setNameModalOpen(true)}>
                <Icon
                  name='square-edit-outline'
                  color='#000'
                  size={18}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styled.details}>
            <Text style={styled.userd}>Your Email</Text>
            <View style={styled.input}>
              <Text style={styled.txtint}>{email}</Text>
              <TouchableOpacity style={styled.editbtn} onPress={() => setReAuthenticateModalOpenEmail(true)}>
                <Icon
                  name='square-edit-outline'
                  color='#000'
                  size={18}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styled.details}>
            <Text style={styled.userd}>Phone Number</Text>
            <View style={styled.input}>
              <Text style={styled.txtint}>{phoneNo}</Text>
              <TouchableOpacity style={styled.editbtn} onPress={() => setPhoneModalOpen(true)}>
                <Icon
                  name='square-edit-outline'
                  color='#000'
                  size={18}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Divider style={styled.divider} />


          <View style={{ flexDirection: 'row' }}>
            <Text style={styled.anonymity}>Anonymity</Text>
            <Switch
              style={styled.btn}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View style={styled.details}>
            <Text style={styled.userd}>Generated Name</Text>
            <View style={styled.input}>
              <Text style={styled.txtint}>{generatedName}</Text>
              <TouchableOpacity style={styled.editbtn}>
                <Icon
                  name='refresh'
                  color='#000'
                  size={18}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Divider style={styled.divider} />


          <TouchableOpacity activeOpacity={.7} style={[inStyle.txtInt, { marginBottom: 40 }]} onPress={() => setReAuthenticateModalOpenPassword(true)}>
            <Text style={inStyle.txt}>Change Password</Text>
          </TouchableOpacity>





          <ConfirmModal
            isConfirmModalOpen={isConfirmModalOpen}
            subject={'Do you really want to Logout?'}
            setConfirmModalOpen={setConfirmModalOpen}
            onPress={handleLogOut}
          />

          <ReAuthenticateModal
            isReAuthenticateModalOpen={isReAuthenticateModalOpenPassword}
            setReAuthenticateModalOpen={setReAuthenticateModalOpenPassword}
            setActionModalOpen={setChangePasswordModalOpen}
          />

          <ReAuthenticateModal
            isReAuthenticateModalOpen={isReAuthenticateModalOpenEmail}
            setReAuthenticateModalOpen={setReAuthenticateModalOpenEmail}
            setActionModalOpen={setEmailChangeModalOpen}
          />

          <ChangePasswordModal
            isChangePasswordModalOpen={isChangePasswordModalOpen}
            setChangePasswordModalOpen={setChangePasswordModalOpen}
          />

          <ChangeEmailModal
            visibility={isEmailChangeModalOpen}
            setVisibility={setEmailChangeModalOpen}
          />

          <EditDetailModal
            type={'name'}
            setVisibility={setNameModalOpen}
            visibility={isNameModalOpen}
            value={name}
          />

          <EditDetailModal
            type={'phone-number'}
            setVisibility={setPhoneModalOpen}
            visibility={isPhoneModalOpen}
            value={phoneNo}
          />

          <LoadingModal visibility={isLoaderOpen} />

        </ScrollView>
      </View>
    </SafeAreaView >
  );
}

