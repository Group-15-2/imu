import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    fontFamily: 'my-custom-font'
  },

  topSelector: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30.24,
    marginLeft: 16,
    paddingTop: 10,
    color: '#1877F2'
  },

  button: {
    alignItems: "center",
    padding: 16,
    backgroundColor: '#C3E2FF',
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
  },

  buttonInner: {
    alignItems: "center",
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 8,
    width: 35,
    height: 35
  },

  moodlet: {
    backgroundColor: '#C3E2FF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    marginTop: 32
  },

  mood: {
    width: 25,
    height: 25,
  }
});

export { styles }  