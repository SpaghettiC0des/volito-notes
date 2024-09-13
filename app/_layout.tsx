import { useEffect } from "react";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import "shared/firebase";

import { Provider } from "../providers/Provider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Provider>
      <Stack
        screenOptions={({ route }) => {
          return {
            presentation: route.name.includes("modal") ? "modal" : undefined,
            headerBackTitleVisible: false,
          };
        }}
      >
        {/* <Stack.Screen */}
        {/*   name="index" */}
        {/*   options={{ */}
        {/*     headerShown: false, */}
        {/*   }} */}
        {/* /> */}
        {/**/}
        {/* <Stack.Screen */}
        {/*   name="(auth)/login" */}
        {/*   options={{ */}
        {/*     title: "Login", */}
        {/*   }} */}
        {/* /> */}
        {/**/}
        {/* <Stack.Screen */}
        {/*   name="(auth)/signup" */}
        {/*   options={{ */}
        {/*     title: "Sign up", */}
        {/*     // presentation: "modal", */}
        {/*   }} */}
        {/* /> */}

        {/* <Stack.Screen */}
        {/*   name="modal" */}
        {/*   options={{ */}
        {/*     title: "Tamagui + Expo", */}
        {/*     presentation: "modal", */}
        {/*     animation: "slide_from_right", */}
        {/*     gestureEnabled: true, */}
        {/*     gestureDirection: "horizontal", */}
        {/*   }} */}
        {/* /> */}
      </Stack>
    </Provider>
  );
}
