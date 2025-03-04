import { Interest } from "@/types";
import { formatTotalUsers } from "@/utils/sharedFunctions";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// component to render each interest list item.
const ListItem = ({ interest }: { interest: Interest }) => {
  // call the format total method to format numbers. like 1200 -> 1.2k
  const formattedTotalUsers = formatTotalUsers(interest.match);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.avatarContainer}>
        {interest.avatar ? (
          <Image source={{ uri: interest.avatar }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatarPlaceholder,
              {
                backgroundColor: interest.color,
              },
            ]}
          >
            <Text style={styles.avatarPlaceholderText}>{interest.name[0]}</Text>
          </View>
        )}
      </View>

      <View style={styles.interestMetadata}>
        <Text style={styles.interestText}>{interest.name}</Text>
        {interest.match > 0 && (
          <View style={styles.totalUsersContainer}>
            <Text style={styles.interestText}>{`(`}</Text>
            <Text style={styles.interestText}>{`${formattedTotalUsers}`}</Text>
            <FontAwesome5 name="user-alt" size={9} color="black" />
            <Text style={styles.interestText}>{`)`}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    columnGap: 10,
  },
  avatarContainer: {
    width: 30,
    height: 30,
    borderRadius: 99,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholderText: {
    textAlign: "center",
    color: "white",
  },
  interestMetadata: {
    flexDirection: "row",
    columnGap: 5,
  },
  interestText: {
    color: "#929497",
    fontSize: 14,
  },
  totalUsersContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
  },
});
