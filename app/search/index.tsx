import SearchBar from "@/components/SearchBar";
import { StyleSheet, View } from "react-native";

export default function Search() {
  const onSearch = async (query: string) => {
    console.log("MAKE API CALL");
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}></View>

      <View style={styles.bottomContainer}>
        <SearchBar onSearch={onSearch} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bottomContainer: {
    width: "100%",
    padding: 10,
  },
  interest: {
    borderWidth: 1,
    borderColor: "dodgerblue",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
});
