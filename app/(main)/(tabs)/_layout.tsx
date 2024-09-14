import { Notebook, Map } from "@tamagui/lucide-icons";
import { Stack, Tabs } from "expo-router";
import { Fragment } from "react/jsx-runtime";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Fragment>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.red10.val,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Notes List",
            tabBarIcon: ({ color }) => <Notebook color={color} />,
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
          name="map"
          options={{
            title: "Map",
            tabBarIcon: ({ color }) => <Map color={color} />,
            // headerRight: () => (
            //   <Link asChild href="/modal">
            //     <Button bg="$purple8" color="$purple12" mr="$4">
            //       Hello!
            //     </Button>
            //   </Link>
            // ),
          }}
        />
      </Tabs>
    </Fragment>
  );
}
