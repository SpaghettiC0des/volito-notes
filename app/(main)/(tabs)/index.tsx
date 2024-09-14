import { NotepadText } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { SizableText, YStack } from "tamagui";

export default function TabOneScreen() {
  const router = useRouter();
  return (
    <YStack fullscreen justifyContent="center">
      <NotepadText alignSelf="center" color="$red9" size="$12" />
      <SizableText color="$gray10" mt="$3" size="$8" textAlign="center">
        Welcome to Volito Notes!
      </SizableText>
    </YStack>
  );
}
