import { NotepadText } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Button, SizableText, View, YStack } from "tamagui";

export function WelcomeView() {
  return (
    <View flex={1} justifyContent="center">
      <YStack alignSelf="center" width="70%">
        <NotepadText alignSelf="center" color="$red9" size="$12" />
        <SizableText
          color="$gray10"
          fontWeight="600"
          mb="$4"
          size="$9"
          textAlign="center"
        >
          Volito Notes
        </SizableText>
        <Link asChild href="/(auth)/login-modal">
          <Button bg="$red9" mb="$2">
            Login
          </Button>
        </Link>
        <Link asChild href="/(auth)/signup-modal">
          <Button bg="$gray5">Sign up</Button>
        </Link>
      </YStack>
    </View>
  );
}
