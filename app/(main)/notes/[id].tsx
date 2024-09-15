import { useEffect, useState } from "react";

import { Stack, useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { Fragment } from "react/jsx-runtime";
import { db } from "shared/firebase";
import { Note } from "shared/models";
import { Text } from "tamagui";
import { NoteForm } from "features/notes";

export default function NoteById() {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      try {
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

  return (
    <Fragment>
      <Stack.Screen options={{ title: "View Note" }} />
      <NoteForm note={note} onSave={async () => {}} />
    </Fragment>
  );
}
