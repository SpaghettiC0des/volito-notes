import { useCallback } from "react";

import {
  FirestoreError,
  Timestamp,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "shared/firebase";
import { getCurrentPositionAsync, LocationObject } from "expo-location";
import { NoteTransient } from "shared/models";
import { NoteForm, NoteFormSchema } from "features/notes";

export default function NoteCreate() {
  const handleSave = useCallback(
    async ({ date, body, title, attachLocation }: NoteFormSchema) => {
      try {
        const colRef = collection(db, "notes");
        const newNoteDocRef = doc(colRef);

        let location: LocationObject | null = null;

        if (attachLocation) {
          location = await getCurrentPositionAsync();
        }

        return setDoc(newNoteDocRef, {
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
  return <NoteForm onSave={handleSave} />;
}
