import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
    style = {styles.View}
    >
      <Text>Just getting started.</Text>
      <Link
        href={"/login"}
        style={styles.navButton}
      >
        Login Page
      </Link>
    </View>
  );
}


const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButton: {
    width: 100,
    height: 20,
    backgroundColor: "cyan",
    borderRadius: 8,
    textAlign: "center",
  }
})