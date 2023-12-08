import { StyleSheet } from "react-native";

const cardStyles = StyleSheet.create({
    commentBox: {
        flex: 1,
        backgroundColor: '#ECECEC',
        padding: 8,
        borderRadius: 10
    },

    viewCount: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#d9d9d9',
        borderRadius: 10,
        paddingHorizontal: 5
    },

    shareBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 200,
    },

    sendBtn: {
        paddingLeft: 8,
    },

    optionContent: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 15,
        marginRight: 15
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
        paddingBottom: 12,
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
});

export { cardStyles }

