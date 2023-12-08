import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { chatStyles } from "../styles/chatstyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { database } from "../firebaseConfig";
import { onValue, ref} from "firebase/database";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../styles/aboutstyle";

export default function AboutUs({ navigation }) {
  const [data, setData] = useState([]);
  const [errorVisibility, setErrorVisibility] = useState("none");
  // const [linkVisibility, setLinkVisibility] = useState('none');

  // const openURL = async (url) => {
  // let result = await WebBrowser.openBrowserAsync(url);
  // console.log(result);
  // };

  useEffect(() => {
    onValue(ref(database, "aboutUs"), (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        setData(data);
      } else {
        setData(null);
      }

      // if (snapshot.child("link").val() !== null) {
      //     setLinkVisibility('flex');
      //   } else {
      //     setLinkVisibility('none');
      //   }
    });
  }, []);

  useEffect(() => {
    if (data) {
      setErrorVisibility("none");
    } else {
      setErrorVisibility("flex");
    }

    // if (data.link !== null) {
    //     setLinkVisibility('flex');
    // } else {
    //     setLinkVisibility('none');
    // }
  }, [data]);

  return (
    <SafeAreaView>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={{ justifyContent: "center" }}
        >
          <MaterialCommunityIcons name="chevron-left" size={34} />
        </TouchableOpacity>
        <Text style={chatStyles.header}>About Us</Text>
      </View>
      <View style={chatStyles.card}>
        <Text
          style={{
            color: "#1877F2",
            fontWeight: "bold",
            textAlign: "center",
            display: errorVisibility,
          }}
        >
          No Data Available
        </Text>
        <View style={{ alignItems: "center", padding: 10 }}>
          <Image
            source={require("../assets/icon1.png")}
            style={{ width: 100, height: 100 }}
          />
          <View style={styles.container}>
            <Text style={styles.heading1}>Welcome to Imu!</Text>

            <Text style={styles.paragraph}>
              We are a team of three dedicated students from the Open University
              who came together to create this innovative Android application as
              part of our academic journey. Our passion for technology and
              learning drove us to develop a solution that we believe will make
              a positive impact on users' lives.
            </Text>

            <Text style={styles.heading2}>Meet the team</Text>

            <Text style={styles.memberName}>D.A. Munaweera - s92078189</Text>

            <Text style={styles.memberName}>M.D.Ipalawatta - s92075691</Text>

            <Text style={styles.memberName}>
              D.P.DE.W.M.S.M.K. Wasalamudali - s92078092
            </Text>

            <Text style={styles.heading2}>Special Thanks</Text>

            <Text style={styles.paragraph}>
              We extend our sincere gratitude to our supervisor, Mrs. Erandathi
              Dias, whose guidance and support were instrumental in shaping our
              project. Her expertise and encouragement fueled our motivation to
              strive for excellence.
            </Text>

            <Text style={styles.heading1}>
Thank You!
            </Text>
          </View>
          {/* <TouchableOpacity onPress={() => openURL(data.link)} style={{display: linkVisibility}}>
                <Text style={{ color: '#1877F2', fontWeight: 'bold', textAlign: 'center'}}>View Project Documentation</Text>
            </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
