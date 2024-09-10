import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { View, Text } from "tamagui";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View margin={10}>
        <Text>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: "#2e78b7",
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
