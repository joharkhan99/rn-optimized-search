import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const SkeletonListItem = () => {
  return (
    <View style={styles.skeletonItem}>
      <View style={styles.skeletonAvatar} />
      <View style={styles.skeletonTextContainer}>
        <View style={styles.skeletonText} />
      </View>
    </View>
  );
};

export default SkeletonListItem;

const styles = StyleSheet.create({
  skeletonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    flex: 1,
    height: "100%",
  },
  skeletonAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
  },
  skeletonTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  skeletonText: {
    width: "80%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
});
