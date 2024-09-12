import { NotepadText } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Button, SizableText, View, YStack } from "tamagui";

export function WelcomeView() {
  return (
    <View flex={1} justifyContent="center">
      <YStack alignSelf="center" width="70%">
        <NotepadText alignSelf="center" color="$red8" size="$12" />
        <SizableText
          color="$gray11"
          fontWeight="600"
          mb="$4"
          size="$9"
          textAlign="center"
        >
          Volito Notes
        </SizableText>
        <Link asChild href="/(auth)/login-modal">
          <Button mb="$2">Login</Button>
        </Link>
        <Link asChild href="/(auth)/signup-modal">
          <Button>Sign up</Button>
        </Link>
      </YStack>
    </View>
  );
}
