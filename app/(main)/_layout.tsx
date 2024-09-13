import { Stack } from "expo-router";

export default function MainScreenLayout() {
  return (
    <Stack
      screenOptions={{ headerBackTitleVisible: false, headerShown: false }}
    />
  );
}
