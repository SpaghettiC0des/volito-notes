import { useLocalSearchParams, useRouter } from "expo-router";

import { TrainLinesList } from "features/train-station-list";

export default function Lines() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <TrainLinesList
      prefectureId={params.prefectureId as string}
      onItemPress={(item) =>
        router.navigate({
          pathname: "/map",
          params: { lineId: item.id, prefectureId: params.prefectureId },
        })
      }
    />
  );
}
