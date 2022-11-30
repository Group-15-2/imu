import * as React from 'react';
import { SectionList, Text, View } from 'react-native';
import setstyles from '../styles/SettingsStyles';

<<<<<<< HEAD
export default function Settings() {
  return (
    <View style={setstyles.container}>
      <SectionList
        sections={[
          {title: 'Profile', data: ['User Name', 'Profile Details', 'Profile Picture']},
          {title: 'Privacy', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          {title: 'Log Out', data: ['Log Out', 'Change Account']},
        ]}
        renderItem={({item}) => <Text style={setstyles.item}>{item}</Text>}
        renderSectionHeader={({section}) => <Text style={setstyles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => `basicListEntry-${item.title}`}
      />
=======

export default function Settings() {  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the profile screen</Text>
>>>>>>> 5a2284bcbea746c628edbfcaed75eaf8a88b1527
    </View>
  );
}
