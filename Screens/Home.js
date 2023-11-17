import { get, onValue, ref, update } from 'firebase/database';
import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import Card from '../components/card';
import { auth, database } from '../firebaseConfig';
import { styles } from '../styles/globalStyles';
import { isExpired } from './CheckAuthScreen';


//moodlet data
const moodletDATA = [
  {
    id: 0,
    link: require('../assets/moodlets/happy.png'),
    mood: 'Feeling Happy!'
  },
  {
    id: 1,
    link: require('../assets/moodlets/better.png'),
    mood: 'Feeling Better!'
  },
  {
    id: 2,
    link: require('../assets/moodlets/good.png'),
    mood: 'Feeling Good!'
  },
  {
    id: 3,
    link: require('../assets/moodlets/pensive.png'),
    mood: 'Feeling Pensive!'
  },
  {
    id: 4,
    link: require('../assets/moodlets/anguish.png'),
    mood: 'Feeling Anguish!'
  },
  {
    id: 5,
    link: require('../assets/moodlets/not-good.png'),
    mood: 'Feeling Not Good!'
  },
  {
    id: 6,
    link: require('../assets/moodlets/sad.png'),
    mood: 'Feeling Sad!'
  },
];

//flatlist item
const Item = ({ item, backgroundColor, onPress, onLongPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
      <View style={[backgroundColor, { padding: 5, borderRadius: 100 }]} >
        <Image source={item.link} style={styles.mood} />
      </View>
    </TouchableWithoutFeedback>
  );
};

//moodlet data to pass other screens
export let mood;
export let isLogOut;

//setter for isLogout vaiable
//this will indicate the state of logged out or logged in
export const setisLogOut = (value) => {
  isLogOut = value;
}

export default function Home({ navigation }) {
  //update selected imgLink of the FlatList
  const [imgLink, setImgLink] = useState(require('../assets/moodlets/add.png'));

  //update selectedId of the FlatList
  const [selectedId, setSelectedId] = useState(null);

  //update selectedColor of the FlatList
  const [selectedMood, setSelectedMood] = useState("Loading");
  //backend database ref
  const userDataRef = ref(database, 'userData/' + auth.currentUser.uid);

  //everytime imgLink change, mood will update
  useEffect(() => {
    mood = imgLink;
  }, [imgLink]);

  //identify the status of get info from backend
  const [isGetSuccess, setIsGetSuccess] = useState(null);

  //get data from backend and update
  useEffect(() => {
    onValue(userDataRef, () => {
      get(userDataRef).then((snapshot) => {
        setSelectedId(snapshot.val().moodId);
        setImgLink(snapshot.val().moodlet);
        setSelectedMood(snapshot.val().mood);
      })
        .catch((e) => {
          setIsGetSuccess(e);
        })
    })
  }, [isGetSuccess]);

  //this will disable the go back
  //refresh every time isLogout variable change
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      //if isLogout true, disable the back handler
      if (isLogOut || isExpired) {
        navigation.dispatch(e.data.action);
      }
    });
  }, [isLogOut, isExpired]);


  const renderItem = ({ item }) => {

    //check the item id and selectedId, if they match background color get changed
    const backgroundColor = item.id === selectedId ? '#9EB8CF' : 'rgba(195, 226, 255, 0)';

    //selects an item from the flatlist on press
    const onPressEvent = () => {
      setSelectedId(item.id);
      setImgLink(item.link);
      setSelectedMood(item.mood);

      //update in backend
      update(userDataRef, {
        moodlet: item.link,
        mood: item.mood,
        moodId: item.id
      })
    };

    //deselects an item from the flatlist on press hold
    const onLongPressEvent = () => {
      setSelectedId(null);
      setImgLink(require('../assets/moodlets/add.png'));
      setSelectedMood('How are you Feeling \ntoday?');

      //update in backend
      update(userDataRef, {
        moodlet: require('../assets/moodlets/add.png'),
        mood: "How are you Feeling \ntoday?",
        moodId: null
      })
    };

    return (
      <Item
        item={item}
        onPress={onPressEvent}
        backgroundColor={{ backgroundColor }}
        onLongPress={onLongPressEvent}
      />
    )
  };

  //set and updates the display properties of the header section
  const [isHeaderShow, setHeaderShow] = useState('flex');

  //set and updates the display properties of the moodlet
  const [isMoodletOpen, setMooodletOpen] = useState('none');

  //Open the moodlet and hide header section
  const MoodletOpen = () => {
    setHeaderShow('none');
    setMooodletOpen('flex');
  };

  //close the moodlet and show header section
  const MoodletClose = () => {
    setHeaderShow('flex');
    setMooodletOpen('none');
  };

  return (
    <SafeAreaView>
      <View style={[styles.topSelector, { display: isHeaderShow }]}>
        <Text style={styles.heading}>
          {selectedMood}
        </Text>


        <TouchableOpacity style={styles.button} onPress={MoodletOpen}>
          <Image source={imgLink} style={styles.buttonInner} />
        </TouchableOpacity>


      </View>

      <View style={{ alignSelf: 'center', display: isMoodletOpen }} >
        <View style={[styles.moodlet]}>
          <TouchableOpacity onPress={MoodletClose}>
            <Image source={require('../assets/moodlets/close.png')} style={[styles.mood, { margin: 6 }]} />
          </TouchableOpacity>
          <FlatList
            numColumns={7}
            data={moodletDATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </View>
      </View>

        <Card mood={imgLink} navigation={navigation} postDataRef={'postsGlobal'} />

    </SafeAreaView>

  );
};
