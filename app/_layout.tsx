import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        {/* hme screen */}
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Home",
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
        {/* task/main search screen */}
        <Stack.Screen
          name="search/index"
          options={{
            headerTitle: "Add Interests To Your Profile",
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
