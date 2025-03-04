import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

// props for search component
interface Props {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  // this is our local input query for state updates
  const [query, setQuery] = useState("");
  // we are passing it to debounce hook with 300 ms. so when query cahnges then debouce will start acting its behavour.
  // The debounced value will update only after 300ms of inactivity
  const debouncedQuery = useDebounce(query, 300);

  // Whenever the debounced query changes (after 300ms delay),
  // call the onSearch function to trigger the search.
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
