import { Atom, AudioWaveform } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Japan Trains",
          tabBarIcon: ({ color }) => <Atom color={color} />,
          // headerRight: () => (
          //   <Link asChild href="/modal">
          //     <Button bg="$purple8" color="$purple12" mr="$4">
          //       Hello!
          //     </Button>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => <AudioWaveform color={color} />,
        }}
      />
    </Tabs>
  );
}
