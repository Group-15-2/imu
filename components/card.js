import { updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, ScrollView, TouchableWithoutFeedback, RefreshControl } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, database } from '../firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { get, ref } from 'firebase/database';

const Item = ({ userDATA, item, userName, userImage, moodText, isViewCountShow, viewFullPost, photoURL, mood, viewCount, TouchableOpacityValue, fullPost, backgroundColor }) => {
    return (

        <View style={cardStyles.card}>

            <View style={cardStyles.cardHead}>
                <TouchableOpacity>
                    <View style={cardStyles.namePicContainer}>
                        <View>
                            <Image source={{ uri: userImage }} style={cardStyles.userimg} />
                            <Image source={userDATA.moodlet} style={cardStyles.moodlet} />
                        </View>

                        <View>
                            <Text style={cardStyles.name}>{userName}</Text>
                            <Text style={cardStyles.mood}>{moodText}</Text>
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity>
                    <MaterialCommunityIcons name="message-text-outline" color={'#1877F2'} size={42} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={TouchableOpacityValue} onPress={viewFullPost}>
                <View style={{ backgroundColor: backgroundColor, width: '100%', minHeight: 290 }}>
                    <Text style={cardStyles.post_text}>{fullPost}</Text>

                    <View style={[cardStyles.viewCount, { display: isViewCountShow }]}>
                        <Image source={require('../assets/view-count.png')} style={{ width: 30, height: 30, marginRight: 5 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff', textAlignVertical: 'center' }}>{viewCount}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={cardStyles.cardBottom}>

                <View style={cardStyles.picCommentContainer}>

                    <View>
                        <Image source={{ uri: photoURL }} style={cardStyles.userimg} />
                        <Image source={mood} style={cardStyles.moodlet} />
                    </View>

                    <TextInput
                        placeholder="Your Thoughts ?"
                        style={cardStyles.commentBox}
                    />
                </View>

            </View>
        </View>

    )

}

export default function Card({ mood }) {

    const [DATA, setDATA] = useState([]);
    const [postDATA, setPostDATA] = useState([]);
    const [isDataProcessed, setIsDataProcessed] = useState(null);

    const getDataBackEnd = () => {
        get(ref(database, 'postsGlobal')).then((snapshot) => {
            const data = snapshot.val();
            const posts = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            setPostDATA(posts);

        });
    }

    useEffect(() => {
        getDataBackEnd();
    }, [])

    useEffect(() => {
        const FD = [];

        Object.values(postDATA).map(element => {


            get(ref(database, 'userData/' + element.uid)).then((snapshot) => {
                const userData = snapshot.val();

                const lastData = { element, userData };
                FD.push(lastData)

                setDATA(FD);
            })
        });
    }, [postDATA])

    console.log(DATA);



    //setter and getter for profile image url
    const [photoURL, setPhotoURL] = useState(null);

    //everytime refocus the screen, this will rerendered
    useFocusEffect(
        React.useCallback(() => {
            setPhotoURL(auth.currentUser.photoURL);
        }, [])
    );

    // const [userDATA, setUserDATA] = useState(null);

    const [selectedId, setSelectedId] = useState(null);

    //update real-time isShowing state and fullPost text to show
    // const [fullPost, setPostTextProcessed] = useState(null);
    // const [isShowing, setIsShowing] = useState(false);

    //update display property of the view count to show and hide
    // const [isViewCountShow, setViewCountShow] = useState('flex');

    const renderItem = ({ item }) => {

        var isShowing = item.postId === selectedId ? true : false;


        let viewCount = 270;

        //postTextOriginal stores the raw string of post
        //postTextProcessed stores the max characters of the post text
        //TouchableOpacityValue holds the opacity value of TouchableOpacity Element

        var postTextOriginal = item.element.post;
        var postTextProcessed;
        var TouchableOpacityValue;

        var post;
        var isViewCountShow = 'flex';

        //Process the max characters of the original post text to show in the post
        //If characters are larger than 100, postTextOriginal slices to first 100 characters with '...' string
        //TouchableOpacityValue sets to 0.6
        if (postTextOriginal.length > 100) {
            postTextProcessed = postTextOriginal.slice(0, 100) + '....';
            TouchableOpacityValue = 0.6;
        }

        //Show postTextOriginal else
        //TouchableOpacityValue sets to 1
        else {
            postTextProcessed = postTextOriginal;
            TouchableOpacityValue = 1;
        }

        post = postTextProcessed;

        var userName, userImage, moodText;

        if (item.userData.anonimity) {
            userName = item.userData.generatedName;
            userImage = "https://firebasestorage.googleapis.com/v0/b/project-imu.appspot.com/o/profile_default%2Fprofile-image.png?alt=media&token=b77c1557-4e43-41e2-ad60-6ca0ecf07475";
        } else {
            userName = item.userData.userName;
            userImage = item.userData.userImg;
        }

        if (item.userData.mood == 'How are you Feeling \ntoday?') {
            moodText = 'Not Selected';
        } else {
            moodText = item.userData.mood;
        }

        //This function makes post to touch and expand to view full text of the post
        //on full post, hides the view count
        const viewFullPost = () => {

            setSelectedId(item.element.postId);
            // if (isShowing == false) { setPostTextProcessed(postTextOriginal); setIsShowing(true); setViewCountShow('none'); }
            // else { setPostTextProcessed(postTextProcessed); setIsShowing(false); setViewCountShow('flex'); }

            if (isShowing == false) {
                post = postTextOriginal;
                isShowing = true;
                isViewCountShow = 'none';
            } else {
                post = postTextProcessed;
                isShowing = false;
                isViewCountShow = 'flex';
            }
            console.log(post);
            console.log(isShowing);
        };


        return (
            <Item
                fullPost={post}
                mood={mood}
                TouchableOpacityValue={TouchableOpacityValue}
                isViewCountShow={isViewCountShow}
                photoURL={photoURL}
                viewCount={item.element.viewCount}
                viewFullPost={viewFullPost}
                backgroundColor={item.element.color}
                userDATA={item.userData}
                item={item}
                userImage={userImage}
                userName={userName}
                moodText={moodText}
            />
        )


    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getDataBackEnd();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);



    return (

        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.element.postId}
            extraData={selectedId}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />

    );
};

const cardStyles = StyleSheet.create({

    commentBox: {
        flex: 1,
        backgroundColor: '#ECECEC',
        padding: 10,
        borderRadius: 50
    },

    viewCount: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        paddingBottom: 15,
        paddingRight: 15
    },

    cardHead: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cardBottom: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    namePicContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    picCommentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    card: {
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 10,
    },

    pfp: {
        display: "flex",
        flexDirection: "row",
    },

    moodlet: {
        right: 10,
        bottom: 0,
        width: 12,
        height: 12,
    },

    profile_image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },

    commenter_profile_image: {
        width: 40,
        height: 40,
        borderRadius: 30,
    },

    name: {
        // fontFamily: "Jakartha",
        fontSize: 14,
        fontWeight: '800',
        color: "#242323",
    },
    mood: {
        fontSize: 10,
        fontWeight: '600',
        color: "#504F4F",
    },
    userimg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 13
    },

    moodlet: {
        right: -45,
        bottom: 15,
        width: 20,
        height: 20,
        marginBottom: -20
    },
    post_text: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        minHeight: 290,
        paddingHorizontal: 5,
    }
})
