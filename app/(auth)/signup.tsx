import { useCallback, useState } from "react";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useToastController } from "@tamagui/toast";
import { Stack } from "expo-router";
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Fragment } from "react/jsx-runtime";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Text, Label, YStack } from "tamagui";
import * as v from "valibot";

const schema = v.object({
  email: v.pipe(
    v.string("Email is required"),
    v.email("Invalid email"),
    v.minLength(3, "Email is too short"),
  ),
  password: v.pipe(
    v.string("Password is required"),
    v.minLength(6, "Password is too short"),
    v.maxLength(30, "Password is too long"),
  ),
});

type LoginSchema = v.InferOutput<typeof schema>;

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: valibotResolver(schema),
  });

  const toast = useToastController();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignIn = useCallback(
    async ({ email, password }: LoginSchema) => {
      try {
        setIsSigningUp(true);

        await signInWithEmailAndPassword(getAuth(), email, password);
      } catch (e) {
        const error = e as AuthError;
        toast.show(`Something went wrong: ${error.code}`, {
          customData: { type: "error" },
        });
      } finally {
        setIsSigningUp(false);
      }
    },
    [toast],
  );
  const handleSignUp = useCallback(
    async ({ email, password }: LoginSchema) => {
      try {
        setIsSigningUp(true);
        await createUserWithEmailAndPassword(getAuth(), email, password);
        await handleSignIn({ email, password });
        toast.show("Account created successfully", {
          customData: { type: "success" },
        });
      } catch (e) {
        const error = e as AuthError;
        toast.show(`Something went wrong: ${error.code}`, {
          customData: { type: "error" },
        });
      } finally {
        setIsSigningUp(false);
      }
    },
    [handleSignIn, toast],
  );

  return (
    <Fragment>
      <Stack.Screen options={{ title: "Sign up" }} />
      <YStack fullscreen justifyContent="center">
        <Form mx="$6" onSubmit={handleSubmit(handleSignUp)}>
          <Label>E-mail</Label>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => {
              return (
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  placeholder="user@email.com"
                  textContentType="emailAddress"
                  value={value}
                  onChangeText={onChange}
                />
              );
            }}
          />

          {errors.email && (
            <Text color="$red10" mt="$2">
              {errors.email.message}
            </Text>
          )}
          <Label>Password</Label>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => {
              return (
                <Input
                  secureTextEntry
                  autoCorrect={false}
                  textContentType="password"
                  value={value}
                  onChangeText={onChange}
                />
              );
            }}
          />
          {errors.password && (
            <Text color="$red10" mt="$2">
              {errors.password.message}
            </Text>
          )}
          <Form.Trigger asChild>
            <Button
              disabled={isSigningUp}
              // eslint-disable-next-line react-native/no-inline-styles
              disabledStyle={{ bg: "$gray7" }}
              mt="$2"
              variant="outlined"
            >
              Create an account
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </Fragment>
  );
}
