import {
  ChevronRight,
  Notebook,
  NotepadText,
  Pencil,
  MapPin,
} from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    const fn = async () => {
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
    };
    fn();
  }, []);

  if (notes.length > 0) {
    return (
      <YStack fullscreen>
        <FlatList
          data={notes}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <Link href={`/notes/${item.id}`} asChild>
              <ListItem
                textProps={{ numberOfLines: 1 }}
                hoverTheme
                pressTheme
                icon={item.location ? MapPin : Notebook}
                iconAfter={ChevronRight}
                subTitle={item.body}
                title={item.title}
              />
            </Link>
          )}
        />
        <Link asChild href="/notes/create">
          <Button
            elevation="$2"
            circular
            size="$6"
            bg="$red10"
            icon={<Pencil size="$2" />}
            pos="absolute"
            right="$2"
            bottom="$3"
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
    </YStack>
  );
}
