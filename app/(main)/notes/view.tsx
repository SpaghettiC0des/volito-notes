import { useCallback } from "react";

import { LocationObject, getCurrentPositionAsync } from "expo-location";
import { Stack, useLocalSearchParams } from "expo-router";
import { NoteForm, NoteFormSchema } from "features/notes";
import { FirestoreError, Timestamp, doc, updateDoc } from "firebase/firestore";
import { Fragment } from "react/jsx-runtime";
import { db } from "shared/firebase";
import { NoteTransient } from "shared/models";

export default function NoteById() {
  const note = useLocalSearchParams() as any;

  const handleUpdate = useCallback(
    async ({ date, body, title, attachLocation }: NoteFormSchema) => {
      try {
        const newNoteDocRef = doc(db, "notes", note.id);

        let location: LocationObject | null = null;

        if (attachLocation) {
          location = await getCurrentPositionAsync();
        }

        return updateDoc(newNoteDocRef, {
          title,
          body,
          date: Timestamp.fromDate(date),
          location: location?.coords ?? null,
        } as NoteTransient);
      } catch (e) {
        const error = e as FirestoreError;
        throw new Error(error.code);
      }
    },
    [note.id],
  );

  return (
    <Fragment>
      <Stack.Screen options={{ title: "View Note" }} />
      <NoteForm
        note={{
          ...note,
          date: Timestamp.fromMillis(note.date),
        }}
        onSave={handleUpdate}
      />
    </Fragment>
  );
}
