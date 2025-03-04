import ListItem from "@/components/ListItem";
import Loader from "@/components/Loader";
import SearchBar from "@/components/SearchBar";
import { Interest } from "@/types";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

// this is the main task. which is calling api and searching results
export default function Search() {
  // this will act as our cache storage. it will store interests array for query string key.
  // e.g: {'a': [], 'ap':[], ....}
  const cache = new Map<String, Interest[]>();
  // we will use this for rendering purposes and storing interests data
  const [listItems, setListItems] = useState<Interest[]>([]);
  // this will help in showing loader on screen during api calls
  const [isLoading, setIsLoading] = useState(false);

  /**
   * This method will go through the cache Map() and see if there are any keys matching searched query
   */
  const searchCacheResult = (query: string) => {
    // first it gets al the keys from cache/MAP()
    const cachedQueriesKeys = Array.from(cache.keys());
    // they it wil filter is out by checking if key sarts with the query
    const matchedQueriesKeys = cachedQueriesKeys.filter((key) =>
      query.startsWith(key.toString())
    );
    // lastly it will sort it in increasing/descending order of keys length.
    // we only want the key that matches the most. and that key will be at 0 index.
    // it will give us result as e.g: ['apple','app', 'ap','a']  // we only want to use the [0] index item. in this case 'apple'
    const sortedQueriesKeys = matchedQueriesKeys.sort(
      (a, b) => b.length - a.length
    );
    // returns null if no keys are found.
    return sortedQueriesKeys.length > 0
      ? cache.get(sortedQueriesKeys[0])
      : null;
  };

  /**
   * this method will filter any items/results passed to it based on the name of the interest that matches the query.
   */
  const filterResults = (items: Interest[], query: string) => {
    // lower case query for better results
    query = query.toLowerCase();
    // filter items and return only those, whose name begins with the query.
    const result = items.filter((item) =>
      item.name.toLowerCase().startsWith(query)
    );
    return result;
  };

  /**
   * this method will run every time debounce Value changes. basically when user types something
   */
  const onSearch = async (query: string) => {
    // first search cache result. i.e. see if any key inside Map matches with the query string
    const cachedResults = searchCacheResult(query);
    if (cachedResults) {
      // if any cache keys are found, then filter them out by their names. see if any names matches the query
      const filtered = filterResults(cachedResults, query);
      // set the result instantly, so user don't see blank page.
      setListItems(filtered);
    }

    try {
      // set loading to tru to show loader
      setIsLoading(true);
      // api call to backend/api
      const response = await fetch(
        `https://be-v2.convose.com/autocomplete/interests?q=${query}&limit=12&from=0`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language":
              "en-GB,en;q=0.9,en-US;q=0.8,de-DE;q=0.7,de;q=0.6",
            Authorization: "Jy8RZCXvvc6pZQUu2QZ2", // Please use this auth token for this task
            Connection: "keep-alive",
            Host: "be-v2.convose.com",
          },
        }
      );
      // get the json data from response.
      const data = await response.json();
      // returned data has a field called autocomplete
      const newResults: Interest[] = data.autocomplete;
      // set the newResult to searched query. so something liek this {"apple": [{},{},{}....]}
      cache.set(query, newResults);
      // now here filter the previous and new results. we don't want duplicates in our render
      setListItems((prev) => [
        // filter prev results first. see if the interest name matches the query string
        ...filterResults(prev, query),
        // now Filter newResults to keep only items that are not already in prev
        // For each newItem in newResults, check if any item in prev has the same id
        // Only include newItem if (no) matching id is found in prev. this way we only keep the fresh ones. the ones thar r new.
        ...newResults.filter(
          (newItem) => !prev.some((existing) => existing.id === newItem.id)
        ),
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      // set loading to false in finally block. to hide loader
      setIsLoading(false);
    }
  };

  /**
   * we want to show some data initially inside the list. so that's why calling onSearch() with empty query to get initial data.
   */
  useEffect(() => {
    onSearch("");
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        {/* loader while api call */}
        {isLoading && <Loader />}
        {/* interest list. flatlist for better performance */}
        <FlatList
          data={listItems}
          inverted={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <ListItem key={item.id} interest={item} />
          )}
        />
      </View>

      {/* search bar at the bottom */}
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
    padding: 10,
    paddingTop: 0,
  },
  bottomContainer: {
    width: "100%",
    paddingTop: 7,
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
