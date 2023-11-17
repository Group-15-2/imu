import { StyleSheet } from "react-native";

const commentStyles = StyleSheet.create({
    userimg: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginRight: 13
    },
    moodlet: {
        right: -30,
        bottom: 15,
        width: 15,
        height: 15,
        marginBottom: -20
    },
    yourComments: {
        padding: 5,
        color: '#1877F2',
        fontWeight: 'bold'
    },
    noComments: {
        padding: 5,
        color: '#1877F2',
    },
});

export { commentStyles }