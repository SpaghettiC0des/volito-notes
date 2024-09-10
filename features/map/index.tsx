import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { View } from "tamagui";

import { trains } from "shared/train";

type Props = { prefectureId: string; lineId: string };
export function TrainMap({ lineId, prefectureId }: Props) {
  const prefecture = trains.find(
    (station) => station.id === Number(prefectureId),
  );
  const line = prefecture?.lines.find((l) => l.id === Number(lineId));

  if (!line) return null;

  return (
    <View flex={1}>
      <MapView
        region={{
          latitude: line.lat,
          longitude: line.lng,
          longitudeDelta: 0.5,
          latitudeDelta: 0.5,
        }}
        style={styles.container}
      >
        {line.stations.map((station) => {
          return (
            <Marker
              key={station.id}
              coordinate={{
                latitude: station.location.lat,
                longitude: station.location.lng,
              }}
              description={"Postal Code: " + station.location.postalCode.en}
              title={station.name.en}
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
