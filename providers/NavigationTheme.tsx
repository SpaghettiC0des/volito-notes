import { PropsWithChildren, useMemo } from "react";

import { Theme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { useTheme } from "tamagui";

export function NavigationTheme({ children }: PropsWithChildren) {
  const tamaguiTheme = useTheme();
  const colorScheme = useColorScheme();

  const navigationTheme = useMemo(() => {
    let partialTheme: Partial<Theme> = {};
    const isDark = colorScheme === "dark";
    if (isDark) {
      partialTheme = {
        colors: {
          background: tamaguiTheme.black1.val,
          card: tamaguiTheme.black2.val,
          text: tamaguiTheme.gray10.val,
          border: tamaguiTheme.gray3.val,
          primary: tamaguiTheme.red10.val,
          notification: tamaguiTheme.purple1.val,
        },
      };
    }

    return {
      dark: isDark,
      colors: {
        background: tamaguiTheme.white1.val,
        card: tamaguiTheme.white2.val,
        text: tamaguiTheme.gray10.val,
        border: tamaguiTheme.gray3.val,
        primary: tamaguiTheme.red10.val,
        notification: tamaguiTheme.purple1.val,
        ...partialTheme.colors,
      },
    };
  }, [
    colorScheme,
    tamaguiTheme.black1.val,
    tamaguiTheme.black2.val,
    tamaguiTheme.gray10.val,
    tamaguiTheme.gray3.val,
    tamaguiTheme.purple1.val,
    tamaguiTheme.red10.val,
    tamaguiTheme.white1.val,
    tamaguiTheme.white2.val,
  ]);

  return <ThemeProvider value={navigationTheme}>{children}</ThemeProvider>;
}
