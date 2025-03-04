import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);
  return (
    <TextInput
      placeholder="Search interests..."
      style={styles.input}
      placeholderTextColor={"#999"}
      autoFocus
      value={query}
      onChangeText={setQuery}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderRadius: 99,
    padding: 15,
    backgroundColor: "#eee",
    fontSize: 16,
  },
});
