<<<<<<< HEAD
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {

    //Change color of the dots according to selected page
    let backgroundColor;
    backgroundColor = selected ? '#1877F2' : 'rgba(0, 0, 0, 0.3)';

    //Change width of the dots according to selected page
    let width;
    width = selected ? 24 : 10;

    return (
        <View 
            style={{
                width,
                height: 4,
                borderRadius:2,
                marginHorizontal: 2,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("SignUp")}
        onDone={() => navigation.navigate("SignUp")}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/1.png')} />,
            title: 'It\'s Okay!',
            subtitle: 'Life isn\'t always easy, and we understand that.',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/2.png')} />,
            title: 'One step at a time.',
            subtitle: 'We all are human, We all can reach happiness.',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/3.png')} />,
            title: 'We are here to help.',
            subtitle: "Whatever it maybe we can help you! Just relax and talk.",
          },
        ]}
        imageContainerStyles={{height:300, marginBottom:250, width:'100%'}}
        titleStyles={{color:'#000'}}
        subTitleStyles={{marginBottom:280, fontSize:18}}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
=======

>>>>>>> origin/authentication
