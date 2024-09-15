import { useCallback, useEffect, useState } from "react";

import {
  ChevronRight,
  Notebook,
  NotepadText,
  Pencil,
  MapPin,
} from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FlatList } from "react-native";
import { db } from "shared/firebase";
import { Note } from "shared/models";
import {
  SizableText,
  YStack,
  ListItem,
  Separator,
  Button,
  Spinner,
} from "tamagui";

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      const snapshot = await getDocs(collection(db, "notes"));

      setNotes(
        snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Note,
        ),
      );
    } catch (e) {
      __DEV__ && console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change.type);
        if (change.type === "added") {
          setNotes((prev) => {
            const next = [
              ...prev,
              { id: change.doc.id, ...change.doc.data() } as Note,
            ];

            return next
              .sort((a, z) => {
                const aDate = a.date.toMillis();
                const zDate = z.date.toMillis();

                return zDate - aDate;
              })
              .filter(
                (v, i, a) =>
                  a.findIndex((t) => t.id === v.id && t.name === v.name) === i,
              );
          });
        }
        if (change.type === "modified") {
          setNotes((prev) =>
            prev.map((note) =>
              note.id === change.doc.id
                ? ({ id: change.doc.id, ...change.doc.data() } as Note)
                : note,
            ),
          );
        }

        if (change.type === "removed") {
          setNotes((prev) => prev.filter((note) => note.id !== change.doc.id));
        }
      });
      setIsLoading(false);
    });
    return unsubscribe;
  }, [isLoading]);

  if (notes.length > 0) {
    return (
      <YStack fullscreen>
        <FlatList
          data={notes}
          ItemSeparatorComponent={Separator}
          refreshing={isLoading}
          renderItem={({ item }) => (
            <Link
              asChild
              href={{
                pathname: `/notes/view`,
                // @ts-expect-error
                params: { ...item, date: item.date.toMillis() },
              }}
            >
              <ListItem
                hoverTheme
                pressTheme
                icon={item.location ? MapPin : Notebook}
                iconAfter={ChevronRight}
                subTitle={item.body}
                textProps={{ numberOfLines: 1 }}
                title={item.title}
              />
            </Link>
          )}
          onRefresh={fetchNotes}
        />
        <Link asChild href="/notes/create">
          <Button
            circular
            bg="$red10"
            bottom="$3"
            elevation="$2"
            icon={<Pencil size="$2" />}
            pos="absolute"
            right="$2"
            size="$6"
          />
        </Link>
      </YStack>
    );
  }

  return (
    <YStack fullscreen justifyContent="center">
      <NotepadText alignSelf="center" color="$red9" size="$12" />
      <SizableText color="$gray10" mt="$3" size="$8" textAlign="center">
        Welcome to Volito Notes!
      </SizableText>
      {isLoading && <Spinner />}
      <Link asChild href="/notes/create">
        <Button
          circular
          bg="$red10"
          bottom="$3"
          elevation="$2"
          icon={<Pencil size="$2" />}
          pos="absolute"
          right="$2"
          size="$6"
        />
      </Link>
    </YStack>
  );
}
