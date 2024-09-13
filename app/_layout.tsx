import { useEffect } from "react";

import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import "shared/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";

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

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      SplashScreen.hideAsync();
      if (user) {
        router.replace("/(main)");
        return;
      }
      router.replace("/");
    });

    return unsubscribe;
  }, [router]);

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
      />
    </Provider>
  );
}
