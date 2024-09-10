import { useLocalSearchParams } from "expo-router";

import { TrainMap } from "features/map";

export default function Map() {
  const params = useLocalSearchParams();
  return (
    <TrainMap
      lineId={params.lineId as string}
      prefectureId={params.prefectureId as string}
    />
  );
}
