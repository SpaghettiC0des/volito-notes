import { Link } from "expo-router";
import { Button, Text } from "tamagui";

export default function Main() {
  return (
    <Link asChild href="/(main)/(tabs)">
      <Button>Go to notes</Button>
    </Link>
  );
}
