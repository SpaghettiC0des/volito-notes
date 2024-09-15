import { useCallback, useEffect, useState } from "react";

import { valibotResolver } from "@hookform/resolvers/valibot";
import DatePicker from "@react-native-community/datetimepicker";
import { Check } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { Stack } from "expo-router";
import {
  FirestoreError,
  Timestamp,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { Fragment } from "react/jsx-runtime";
import { Controller, useForm } from "react-hook-form";
import { db } from "shared/firebase";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Label,
  Text,
  TextArea,
  XStack,
} from "tamagui";
import * as v from "valibot";
import {
  useForegroundPermissions,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";
import { NoteTransient } from "shared/models";
const schema = v.object({
  title: v.string("Title is required"),
  body: v.string("Body is required"),
  date: v.date(),
  attachLocation: v.boolean(),
});
type FormSchema = v.InferOutput<typeof schema>;
export default function NoteCreate() {
  const toast = useToastController();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: valibotResolver(schema),
    defaultValues: {
      date: new Date(),
    },
  });

  const [status, requestLoationPermission] = useForegroundPermissions();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    requestLoationPermission();
  }, [requestLoationPermission]);

  const handleSave = useCallback(
    async ({ date, body, title, attachLocation }: FormSchema) => {
      try {
        setIsSaving(true);
        const colRef = collection(db, "notes");
        const newNoteDocRef = doc(colRef);

        let location: LocationObject | null = null;

        if (attachLocation) {
          location = await getCurrentPositionAsync();
        }

        await setDoc(newNoteDocRef, {
          title,
          body,
          date: Timestamp.fromDate(date),
          location: location?.coords,
        } as NoteTransient);
        toast.show(`Saved!`, {
          customData: { type: "success" },
        });
      } catch (e) {
        __DEV__ && console.error(e);
        const error = e as FirestoreError;
        toast.show(`Something went wrong: ${error.code}`, {
          customData: { type: "error" },
        });
      } finally {
        setIsSaving(false);
      }
    },
    [toast],
  );
  return (
    <Fragment>
      <Stack.Screen options={{ title: "New Note" }} />
      <Form gap="$2" mx="$2" onSubmit={handleSubmit(handleSave)}>
        <Label>Title</Label>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChangeText={onChange} />
          )}
        />
        {errors.title && <Text color="$red10">{errors.title.message}</Text>}
        <Label>Body</Label>
        <Controller
          control={control}
          name="body"
          render={({ field: { onChange, value } }) => (
            <TextArea size="$4" value={value} onChangeText={onChange} />
          )}
        />
        {errors.body && <Text color="$red10">{errors.body.message}</Text>}

        <Controller
          control={control}
          name="attachLocation"
          render={({ field: { onChange, value, name } }) => (
            <XStack alignItems="center" gap="$4">
              <Checkbox
                disabled={!status?.granted}
                checked={value}
                id={name}
                onCheckedChange={(v) => {
                  onChange(v);
                }}
              >
                <Checkbox.Indicator>
                  <Check />
                </Checkbox.Indicator>
              </Checkbox>

              <Label htmlFor={name}>
                Include location{" "}
                {status?.granted ? "" : "(Permission Required)"}
              </Label>
            </XStack>
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              mode="date"
              value={value}
              onChange={(_, date) => {
                onChange(date);
              }}
            />
          )}
        />
        <Form.Trigger asChild>
          <Button disabled={isSaving} bg="$red10" mt="$5">
            Save
          </Button>
        </Form.Trigger>
      </Form>
    </Fragment>
  );
}
