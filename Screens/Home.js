import React, { useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import Card from '../components/card';
import { styles } from '../styles/globalStyles';

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

const Item = ({ item, backgroundColor, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[backgroundColor, { padding: 5, borderRadius: 100 }]} >
        <Image source={item.link} style={styles.mood} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function Home() {

  const [imgLink, setImgLink] = useState(require('../assets/moodlets/add.png'));

  //update selectedId of the FlatList
  const [selectedId, setSelectedId] = useState(0);

  //update selectedColor of the FlatList
  const [selectedMood, setSelectedMood] = useState('How are you Feeling \ntoday?');

  const renderItem = ({ item }) => {

    //check the item id and selectedId, if they match borderWidth gets 3 else borderWidth gets 1
    const backgroundColor = item.id === selectedId ? '#9EB8CF' : 'rgba(195, 226, 255, 0)';

    return (
      <Item
        item={item}
        onPress={() => { setSelectedId(item.id); setImgLink(item.link); setSelectedMood(item.mood); }}
        backgroundColor={{ backgroundColor }}
      />
    )
  };

  return (
    <SafeAreaView>
      {/* heading */}
      <View style={styles.topSelector}>
        <Text style={styles.heading}>
          {selectedMood}
        </Text>
        <TouchableOpacity style={styles.button}>
          {/* <Icon name="plus" size={16} style={styles.buttonInner} /> */}
          <Image source={imgLink} style={styles.buttonInner} />
        </TouchableOpacity>

      </View>
      <View style={styles.moodlet}>
        <Image source={require('../assets/moodlets/close.png')} style={[styles.mood, { margin: 6 }]} />
        <FlatList
          numColumns={7}
          data={moodletDATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
      <ScrollView>
        <Card />
        <Card />
        <Card />
      </ScrollView>
    </SafeAreaView>

  );
};