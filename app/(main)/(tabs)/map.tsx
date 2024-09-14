import { Map } from "@tamagui/lucide-icons";
import { SizableText, YStack } from "tamagui";

export default function TabOneScreen() {
  return (
    <YStack fullscreen justifyContent="center">
      <Map alignSelf="center" color="$red9" size="$12" />
      <SizableText color="$gray10" mt="$3" size="$6" textAlign="center">
        Add a note to see it here!
      </SizableText>
    </YStack>
  );
}
