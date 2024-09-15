/* eslint-disable react-native/no-inline-styles */
import { useCallback, useEffect, useState } from "react";

import { valibotResolver } from "@hookform/resolvers/valibot";
import DatePicker from "@react-native-community/datetimepicker";
import { Check } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { useForegroundPermissions } from "expo-location";
import { Stack, useRouter } from "expo-router";
import { deleteDoc, doc } from "firebase/firestore";
import { Fragment } from "react/jsx-runtime";
import { Controller, useForm } from "react-hook-form";
import { db } from "shared/firebase";
import { Note } from "shared/models";
import {
  AlertDialog,
  Button,
  Checkbox,
  Form,
  Input,
  Label,
  Text,
  TextArea,
  XStack,
  YStack,
} from "tamagui";
import * as v from "valibot";
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
  const router = useRouter();

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
            {note ? "Update" : "Save"}
          </Button>
        </Form.Trigger>
        <AlertDialog>
          {note && (
            <AlertDialog.Trigger asChild>
              <Button borderColor="$red10" variant="outlined">
                Delete
              </Button>
            </AlertDialog.Trigger>
          )}
          <AlertDialog.Portal>
            <AlertDialog.Overlay
              key="overlay"
              animation="quick"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
              opacity={0.5}
            />
            <AlertDialog.Content
              key="content"
              bordered
              elevate
              animation={[
                "quick",
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              opacity={1}
              scale={1}
              width="90%"
              x={0}
              y={0}
            >
              <YStack gap>
                <AlertDialog.Title>Delete</AlertDialog.Title>
                <AlertDialog.Description>
                  Delete this note?
                </AlertDialog.Description>

                <XStack gap="$3" justifyContent="flex-end">
                  <AlertDialog.Cancel asChild>
                    <Button>Cancel</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <Button
                      theme="active"
                      onPressIn={async () => {
                        try {
                          await deleteDoc(doc(db, "notes", note!.id));
                          router.back();
                        } catch (e) {
                          toast.show(`Something went wrong: ${e.message}`, {
                            customData: { type: "error" },
                          });
                        }
                      }}
                    >
                      Yes
                    </Button>
                  </AlertDialog.Action>
                </XStack>
              </YStack>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog>
      </Form>
    </Fragment>
  );
}
