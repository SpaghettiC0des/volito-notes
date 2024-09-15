import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { useColorScheme } from "react-native";
import {
  PortalProvider,
  TamaguiProvider,
  type TamaguiProviderProps,
} from "tamagui";

import { CurrentToast } from "./CurrentToast";
import { config } from "../tamagui.config";
import { NavigationTheme } from "./NavigationTheme";

export function Provider({
  children,
  ...rest
}: Omit<TamaguiProviderProps, "config">) {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === "dark" ? "dark" : "light"}
      {...rest}
    >
      <PortalProvider>
        <ToastProvider
          duration={6000}
          native={
            [
              /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
              // 'mobile'
            ]
          }
          swipeDirection="horizontal"
        >
          <NavigationTheme>{children}</NavigationTheme>
          <CurrentToast />
          <ToastViewport left={0} right={0} top="$8" />
        </ToastProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
}
