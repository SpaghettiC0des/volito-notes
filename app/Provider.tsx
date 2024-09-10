import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { useColorScheme } from "react-native";
import { TamaguiProvider, type TamaguiProviderProps } from "tamagui";

import { CurrentToast } from "./CurrentToast";
import { config } from "../tamagui.config";

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
        {children}
        <CurrentToast />
        <ToastViewport left={0} right={0} top="$8" />
      </ToastProvider>
    </TamaguiProvider>
  );
}
