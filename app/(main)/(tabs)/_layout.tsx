/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { Notebook, Map } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { Stack, Tabs } from "expo-router";
import { AuthError, getAuth, signOut } from "firebase/auth";
import { Fragment } from "react/jsx-runtime";
import { AlertDialog, Button, Text, XStack, YStack, useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();
  const toast = useToastController();

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
            headerRight: () => (
              <AlertDialog>
                <AlertDialog.Trigger asChild>
                  <Text mr="$3">Logout</Text>
                </AlertDialog.Trigger>

                <AlertDialog.Portal>
                  <AlertDialog.Overlay
                    key="overlay"
                    animation="quick"
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                    opacity={0.5}
                  />
                  <AlertDialog.Content
                    key="content"
                    bordered
                    elevate
                    animation={[
                      "quick",
                      {
                        opacity: {
                          overshootClamping: true,
                        },
                      },
                    ]}
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                    opacity={1}
                    scale={1}
                    width="90%"
                    x={0}
                    y={0}
                  >
                    <YStack gap>
                      <AlertDialog.Title>Logout</AlertDialog.Title>
                      <AlertDialog.Description>
                        Proceed?
                      </AlertDialog.Description>

                      <XStack gap="$3" justifyContent="flex-end">
                        <AlertDialog.Cancel asChild>
                          <Button>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <Button
                            theme="active"
                            onPressIn={async () => {
                              try {
                                await signOut(getAuth());
                              } catch (e) {
                                const error = e as AuthError;
                                toast.show(
                                  `Something went wrong: ${error.code}`,
                                  {
                                    customData: { type: "error" },
                                  },
                                );
                              }
                            }}
                          >
                            Yes
                          </Button>
                        </AlertDialog.Action>
                      </XStack>
                    </YStack>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog>
            ),
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
