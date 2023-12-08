import { SAMLAuthProvider, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Share, Image, TouchableOpacity, TextInput, FlatList, ScrollView, TouchableWithoutFeedback, RefreshControl, Alert } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, database } from '../firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { get, onValue, ref, set, update } from 'firebase/database';
import { async } from '@firebase/util';
import { defaultPFP } from '../Screens/Profile';
import { wordFilter } from './services/WordFilter';
import { cardStyles } from '../styles/cardstyle';
import { commentStyles } from '../styles/commentstyle';

const Item = ({ userDATA, handleShare, otherProfile, yourComments, postComments, postCommentsVisibility, setCommentText, sendComment, onChat, commentSectionVisibility, item, photoURL, mood, viewCount, postTextOriginal, postTextProcessed, TouchableOpacityValue }) => {
    const [text, setText] = useState(null);

    const [userData, setUserData] = useState([]);
    const [userImage, setUserImage] = useState(null);
    const [userName, setUserName] = useState(null);
    const [moodText, setMoodText] = useState(null);
    const [postCommentsVisibilityMain, setPostCommentsVisibilityMain] = useState(postCommentsVisibility);
    const [noCommentsVisibility, setNoCommentsVisibility] = useState('none');
    const [chatVisibility, setChatVisibility] = useState('flex');
    const [friendIcon, setFriendIcon] = useState('account-heart-outline');

    //update real-time isShowing state and fullPost text to show
    const [fullPost, setPostTextProcessed] = useState(postTextProcessed);
    const [isShowing, setIsShowing] = useState(false);

    //update display property of the view count to show and hide
    const [isViewCountShow, setViewCountShow] = useState('flex');


    useEffect(() => {

        get(ref(database, 'userData/' + item.uid)).then((snapshot) => {
            setUserData(snapshot.val());
            checkAnonimity(snapshot.val());
        });

        onValue(ref(database, 'userData/' + item.uid), (snapshot) => {
            setUserData(snapshot.val());
            checkAnonimity(snapshot.val());
        })

        onValue(ref(database, 'friends/' + auth.currentUser.uid + '/' + item.uid), (snapshot) => {
            if (snapshot.exists()){
                setFriendIcon('account-heart');
            } else {
                setFriendIcon('account-heart-outline');
            }
        })

        // get(ref(database, 'postsGlobal/' + item.postId)).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         setNoCommentsVisibility('none');
        //     } else {
        //         setNoCommentsVisibility('flex');
        //         setPostCommentsVisibilityMain('none');
        //     }
        // })

        if (commentSectionVisibility == 'none') {
            onValue(ref(database, 'comments/' + item.postId), (snapshot) => {
                if (snapshot.exists()) {
                    setNoCommentsVisibility('none');
                } else {
                    setNoCommentsVisibility('flex');
                    setPostCommentsVisibilityMain('none');
                }
            })
        }

        //hide chat icon from current user's posts
        if (item.uid == auth.currentUser.uid) {
            setChatVisibility('none');
        }

    }, [])

    const viewFullPost = () => {
        if (isShowing == false) { setPostTextProcessed(postTextOriginal); setIsShowing(true); setViewCountShow('none'); }
        else { setPostTextProcessed(postTextProcessed); setIsShowing(false); setViewCountShow('flex'); }
    };

    const checkAnonimity = (data) => {
        if (data.anonimity) {
            setUserName(data.generatedName);
            setUserImage(defaultPFP);
        } else {
            setUserName(data.userName);
            setUserImage(data.userImg);
        }

        if (data.mood == 'How are you Feeling \ntoday?') {
            setMoodText('Not Selected');
        } else {
            setMoodText(data.mood);
        }
    }

    const addFriend = () => {
        get(ref(database, 'friends/' + auth.currentUser.uid + '/' + item.uid)).then((snapshot) => {
            if (snapshot.exists()){
                set(ref(database, 'friends/' + auth.currentUser.uid + '/' + item.uid), null).catch((error) => {
                    alert(error)
                });
            } else {
                set(ref(database, 'friends/' + auth.currentUser.uid + '/' + item.uid), item.uid).catch((error) => {
                    alert(error)
                });
            }
        })
    
    }

    // const handleShare = async() => {
    //     console.log("share pressed")
    //     const shareOptions =  {
    //         message: postTextOriginal + "\n\nShared from IMU App."
    //     }

    //     try{
    //         const shareResponse = await Share.share(shareOptions);
    //     } catch(error) {
    //         console.log('Share error -> ',error);
    //     }
    // }

    return (

        <View style={cardStyles.card}>

            <View style={cardStyles.cardHead}>
                <TouchableOpacity onPress={otherProfile}>
                    <View style={cardStyles.namePicContainer}>
                        <View>
                            <Image source={{ uri: userImage }} style={cardStyles.userimg} />
                            <Image source={userData.moodlet} style={cardStyles.moodlet} />
                        </View>

                        <View>
                            <Text style={cardStyles.name}>{userName}</Text>
                            <Text style={cardStyles.mood}>{moodText}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{ flexDirection:'row',display: chatVisibility}}>
                    <TouchableOpacity onPress={() => addFriend()} style={{marginRight:12 }}>
                        <MaterialCommunityIcons name={friendIcon} color={'#1877F2'} size={32}  />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onChat()}>
                        <MaterialCommunityIcons name="message-text-outline" color={'#1877F2'} size={32} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity activeOpacity={TouchableOpacityValue} onPress={viewFullPost}>
                <View style={{ backgroundColor: item.color, width: '100%', minHeight: 290 }}>
                    <Text style={cardStyles.post_text}>{fullPost}</Text>

                    <View style={[cardStyles.optionContent, { display: isViewCountShow }]}>
                        <TouchableOpacity onPress={() => handleShare()} style={cardStyles.shareBtn}>
                            <MaterialCommunityIcons name="share-variant-outline" color={'#1877F2'} size={18}/>
                        </TouchableOpacity>
                        {/* <View style={cardStyles.viewCount}>
                            <Image source={require('../assets/view-count.png')} style={{ width: 30, height: 30, marginRight: 5 }} />
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#1877F2', textAlignVertical: 'center' }}>20</Text>
                        </View> */}
                    </View>
                </View>
            </TouchableOpacity>

            <View style={{ display: commentSectionVisibility }}>

                <TouchableOpacity onPress={yourComments}>
                    <Text style={commentStyles.yourComments}>View Your Comments</Text>
                </TouchableOpacity>

                <View style={cardStyles.cardBottom}>

                    <View style={cardStyles.picCommentContainer}>

                        <View>
                            <Image source={{ uri: photoURL }} style={commentStyles.userimg} />
                            <Image source={mood} style={commentStyles.moodlet} />
                        </View>

                        <TextInput
                            placeholder="Your Thoughts ?"
                            style={cardStyles.commentBox}
                            onChangeText={(value) => { setCommentText(value); setText(value); }}
                            value={text}
                        />

                        <TouchableOpacity style={cardStyles.sendBtn} onPress={() => { sendComment(); setText(''); }}>
                            <MaterialCommunityIcons name="send" color={'#1877F2'} size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ display: postCommentsVisibilityMain }}>
                <TouchableOpacity onPress={postComments}>
                    <Text style={commentStyles.yourComments}>View Comments</Text>
                </TouchableOpacity>
            </View>

            <View style={{ display: noCommentsVisibility }}>
                <Text style={commentStyles.noComments}>No Comments</Text>
            </View>
        </View>

    )

}

export default function Card({ mood, navigation, postDataRef }) {

    const [DATA, setDATA] = useState([]);
    const [postDATA, setPostDATA] = useState([]);
    const [isPostsAvailable, setIsPostsAvailable] = useState(false);

    const getDataBackEnd = () => {
        setRefreshing(true);

        get(ref(database, postDataRef)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const posts = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setPostDATA(posts.reverse());
                setRefreshing(false);
                setIsPostsAvailable(true);
            } else {
                setIsPostsAvailable(false);
            }

        });

    }

    useEffect(() => {
        getDataBackEnd();
    }, [])



    // useEffect(() => {
    //     const FD = [];

    //     Object.values(postDATA).map(element => {
    //         get(ref(database, 'userData/' + element.uid)).then((snapshot) => {
    //             const userData = snapshot.val();

    //             const lastData = { element, userData, isShowing: false };
    //             FD.push(lastData)

    //             setDATA(FD);

    //             setRefreshing(false);
    //         })
    //     });

    // }, [postDATA])

    // console.log(DATA);



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
    const [fullPost, setPostTextProcessed] = useState(null);
    const [isShowing, setIsShowing] = useState(null);

    //update display property of the view count to show and hide
    const [isViewCountShow, setViewCountShow] = useState('flex');
    const [commentText, setCommentText] = useState('');




    const renderItem = ({ item }) => {



        //postTextOriginal stores the raw string of post
        //postTextProcessed stores the max characters of the post text
        //TouchableOpacityValue holds the opacity value of TouchableOpacity Element

        var postTextOriginal = '';
        postTextOriginal = item.post;
        var postTextProcessed = '';
        var TouchableOpacityValue = 0;

        // var post;
        // var isViewCountShow = 'flex';

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


        var commentSectionVisibility, postCommentsVisibility;
        

        // if (item.userData.anonimity) {
        //     userName = item.userData.generatedName;
        //     userImage = "https://firebasestorage.googleapis.com/v0/b/project-imu.appspot.com/o/profile_default%2Fprofile-image.png?alt=media&token=b77c1557-4e43-41e2-ad60-6ca0ecf07475";
        // } else {
        //     userName = item.userData.userName;
        //     userImage = item.userData.userImg;
        // }

        // if (item.userData.mood == 'How are you Feeling \ntoday?') {
        //     moodText = 'Not Selected';
        // } else {
        //     moodText = item.userData.mood;
        // }


        if (item.uid === auth.currentUser.uid) {
            commentSectionVisibility = 'none';
            postCommentsVisibility = 'flex';
        } else {
            commentSectionVisibility = 'flex';
            postCommentsVisibility = 'none'
        }



        const onChatPress = () => {

            get(ref(database, 'messagesGlobal/chatHead/' + auth.currentUser.uid + '/' + item.uid)).then((snapshot) => {
                if (snapshot.exists()) {

                    update(ref(database, 'messagesGlobal/' + '/chatHead/' + auth.currentUser.uid + '/' + item.uid), {
                        unreadCount: 0
                    }).then(() => {

                        navigation.navigate('ChatBox', { userId: item.uid, chatRoomId: snapshot.val().chatRoomId });
                    })
                } else {
                    navigation.navigate('ChatBox', { userId: item.uid, chatRoomId: null });
                }
            })
        }

        // const setCommentText = (value) => {
        //     commentText = value;
        // }

        const sendComment = () => {
            if (commentText.trim()) {

                var commentData;
                const commentTextFiltered = wordFilter(commentText);
                setCommentText('');
                get(ref(database, 'comments/' + item.postId + '/' + auth.currentUser.uid)).then((snapshot) => {
                    if (snapshot.exists()) {
                        commentData = snapshot.val();
                    } else {
                        commentData = [];
                    }

                    set(ref(database, 'comments/' + item.postId + '/' + auth.currentUser.uid), [
                        ...commentData,
                        {
                            userId: auth.currentUser.uid,
                            comment: commentTextFiltered,
                            time: Date()
                        }
                    ])
                })
            }
        }

        const yourComments = () => {
            get(ref(database, 'comments/' + item.postId + '/' + auth.currentUser.uid)).then((snapshot) => {
                if (snapshot.exists()) {
                    navigation.navigate("YourComments", { postId: item.postId });
                } else {
                    Alert.alert(
                        "You haven't commented yet!",
                        "",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            })
        }

        const postComments = () => {
            get(ref(database, 'comments/' + item.postId)).then((snapshot) => {
                if (snapshot.exists()) {
                    navigation.navigate("ViewComments", { postId: item.postId });
                } else {
                    Alert.alert(
                        "Don't have comments yet!",
                        "",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            })
        }

        const otherProfile = () => {
            navigation.navigate("OtherProfile", { userId: item.uid });
        }

        const shareOptions =  {
            message: postTextOriginal + "\n\nShared from IMU App."
        }

        const handleShare = async() => {
            console.log("share pressed")
            try{
                const shareResponse = await Share.share(shareOptions);
            } catch(error) {
                console.log('Share error -> ',error);
            }
        }


        return (
            <Item
                // fullPost={post}
                mood={mood}
                // TouchableOpacityValue={TouchableOpacityValue}
                // isViewCountShow={isViewCountShow}
                photoURL={photoURL}
                // viewCount={item.element.viewCount}
                // viewFullPost={viewFullPost}
                // backgroundColor={item.element.color}
                // userDATA={item.userData}
                // item={item}
                // userImage={userImage}
                // userName={userName}
                // moodText={moodText}
                onChat={onChatPress}
                handleShare={handleShare}
                commentSectionVisibility={commentSectionVisibility}
                setCommentText={setCommentText}
                sendComment={sendComment}
                yourComments={yourComments}
                postCommentsVisibility={postCommentsVisibility}
                postComments={postComments}
                postTextProcessed={postTextProcessed}
                postTextOriginal={postTextOriginal}
                TouchableOpacityValue={TouchableOpacityValue}
                otherProfile={otherProfile}

                item={item}
            />
        )


    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        getDataBackEnd();
    }, []);



    return (
        <View style={{maxHeight: '100%'}}>
            <Text style={{ color: '#1877F2', fontWeight: 'bold', textAlign: 'center' }}>{isPostsAvailable ? '' : 'No Posts Available'}</Text>
            <FlatList
                data={postDATA}
                renderItem={renderItem}
                keyExtractor={item => item.postId}
                extraData={selectedId}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />

        </View>

    );
};
