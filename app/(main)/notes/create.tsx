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
import { useRouter } from "expo-router";

export default function NoteCreate() {
  const router = useRouter();
  const handleSave = useCallback(
    async ({ date, body, title, attachLocation }: NoteFormSchema) => {
      try {
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
          location: location?.coords ?? null,
        } as NoteTransient);
        router.back();
      } catch (e) {
        const error = e as FirestoreError;
        throw new Error(error.code);
      }
    },
    [],
  );
  return <NoteForm onSave={handleSave} />;
}
