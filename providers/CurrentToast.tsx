import { useMemo } from "react";

import { Toast, useToastController, useToastState } from "@tamagui/toast";
import { Button, H4, ThemeName, XStack, YStack, isWeb } from "tamagui";

export function CurrentToast() {
  const currentToast = useToastState();

  const variant = useMemo((): ThemeName => {
    switch (currentToast?.customData?.type) {
      case "success":
        return "light_green";
      case "info":
        return "light_blue";
      case "error":
        return "red";
      case "warning":
        return "yellow";
      default:
        return "purple";
    }
  }, [currentToast?.customData?.type]);

  if (!currentToast || currentToast.isHandledNatively) return null;

  return (
    <Toast
      key={currentToast.id}
      animation="quick"
      br="$6"
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      theme={variant}
      viewportName={currentToast.viewportName}
      y={isWeb ? "$12" : 0}
    >
      <YStack ai="center" gap="$2" p="$2">
        <Toast.Title fow="bold">{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  );
}

export function ToastControl() {
  const toast = useToastController();

  return (
    <YStack ai="center" gap="$2">
      <H4>Toast demo</H4>
      <XStack gap="$2" jc="center">
        <Button
          onPress={() => {
            toast.show("Successfully saved!", {
              message: "Don't worry, we've got your data.",
            });
          }}
        >
          Show
        </Button>
        <Button
          onPress={() => {
            toast.hide();
          }}
        >
          Hide
        </Button>
      </XStack>
    </YStack>
  );
}
