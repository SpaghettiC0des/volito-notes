import { Link } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { Button, View } from "tamagui";

export default function Main() {
  return (
    <View>
      <Link asChild href="/(main)/(tabs)">
        <Button>Go to notes</Button>
      </Link>
      <Button
        onPress={() => {
          signOut(getAuth());
        }}
      >
        Logout
      </Button>
    </View>
  );
}
