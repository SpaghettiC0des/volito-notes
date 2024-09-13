import { Fragment } from "react";

import { Stack } from "expo-router";
import { WelcomeView } from "features/welcome";

export default function WelcomeScreen() {
  return (
    <Fragment>
      <Stack.Screen />
      <WelcomeView />
    </Fragment>
  );
}
