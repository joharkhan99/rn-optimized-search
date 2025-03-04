import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={"/search"} style={styles.button}>
        <Text style={styles.buttonText}>+ Interests</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "dodgerblue",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 99,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 500,
  },
});
