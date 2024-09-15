import { useCallback, useEffect, useState } from "react";

import { Stack, useLocalSearchParams } from "expo-router";
import {
  FirestoreError,
  Timestamp,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Fragment } from "react/jsx-runtime";
import { db } from "shared/firebase";
import { Note, NoteTransient } from "shared/models";
import { NoteForm, NoteFormSchema } from "features/notes";
import { LocationObject, getCurrentPositionAsync } from "expo-location";

export default function NoteById() {
  const navNote = useLocalSearchParams() as any;
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      try {
        // @ts-expect-error
        const noteDocRef = await getDoc(doc(db, "notes", id));
        setNote({
          id: noteDocRef.id,
          ...noteDocRef.data(),
        } as Note);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fn();
  }, []);

  const handleUpdate = useCallback(
    async ({ date, body, title, attachLocation }: NoteFormSchema) => {
      try {
        const newNoteDocRef = doc(db, "notes", navNote.id);

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
    [],
  );
  return (
    <Fragment>
      <Stack.Screen options={{ title: "View Note" }} />
      <NoteForm
        note={
          note || {
            ...navNote,
            date: Timestamp.fromMillis(navNote.date),
          }
        }
        onSave={handleUpdate}
      />
    </Fragment>
  );
}
