import { useState, useEffect } from "react";

import { collection, query, onSnapshot, where } from "firebase/firestore";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { db } from "shared/firebase";
import { Note } from "shared/models";
import { View } from "tamagui";

export default function TabOneScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "notes"), where("date", "!=", null));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
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
  return (
    <View flex={1}>
      <MapView style={styles.container}>
        {notes.map(({ location, body, id, title }) => {
          return (
            <Marker
              key={id}
              coordinate={{
                latitude: location!.latitude,
                longitude: location!.longitude,
              }}
              description={body}
              title={title}
            />
          );
        })}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});
