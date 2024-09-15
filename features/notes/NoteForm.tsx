import { useCallback, useEffect, useState } from "react";

import { valibotResolver } from "@hookform/resolvers/valibot";
import DatePicker from "@react-native-community/datetimepicker";
import { Check } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { useForegroundPermissions } from "expo-location";
import { Stack } from "expo-router";
import { Fragment } from "react/jsx-runtime";
import { Controller, useForm } from "react-hook-form";
import { Note } from "shared/models";
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
import { Alert } from "react-native";
const schema = v.object({
  title: v.string("Title is required"),
  body: v.string("Body is required"),
  date: v.date(),
  attachLocation: v.optional(v.boolean()),
});
export type NoteFormSchema = v.InferOutput<typeof schema>;

type Props = {
  onSave: (note: NoteFormSchema) => Promise<any>;
  /** Note to edit */
  note?: Note | null;
};

export function NoteForm({ onSave, note }: Props) {
  const toast = useToastController();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormSchema>({
    resolver: valibotResolver(schema),
    defaultValues: {
      date: new Date(),
    },
  });

  useEffect(() => {
    note &&
      reset({
        ...note,
        date: note.date.toDate(),
        attachLocation: !!note.location,
      });
  }, [note, reset]);

  const [status, requestLoationPermission] = useForegroundPermissions();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    requestLoationPermission();
  }, [requestLoationPermission]);

  const handleSave = useCallback(
    async (data: NoteFormSchema) => {
      try {
        setIsSaving(true);
        await onSave(data);
        toast.show(`Saved!`, {
          customData: { type: "success" },
        });
      } catch (e) {
        __DEV__ && console.error(e);
        const error = e as Error;
        toast.show(`Something went wrong: ${error.message}`, {
          customData: { type: "error" },
        });
      } finally {
        setIsSaving(false);
      }
    },
    [onSave, toast],
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
                checked={value}
                disabled={!status?.granted}
                id={name}
                onCheckedChange={(val) => {
                  onChange(val);
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
          <Button bg="$red10" disabled={isSaving} mt="$5">
            Save
          </Button>
        </Form.Trigger>
      </Form>
    </Fragment>
  );
}
