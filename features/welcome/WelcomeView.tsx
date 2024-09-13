import { NotepadText } from "@tamagui/lucide-icons";
import { Link, Stack } from "expo-router";
import { Fragment } from "react/jsx-runtime";
import { Button, SizableText, View, YStack } from "tamagui";

export function WelcomeView() {
  return (
    <Fragment>
      <Stack.Screen options={{ headerShown: false }} />
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
          <Link asChild href="/(auth)/login">
            <Button bg="$red9" color="$white1" mb="$2">
              Login
            </Button>
          </Link>
          <Link asChild href="/(auth)/signup">
            <Button variant="outlined">Sign up</Button>
          </Link>
        </YStack>
      </View>
    </Fragment>
  );
}
