import { useRouter } from "expo-router";

import { PrefectureList } from "features/train-station-list";

export default function TabOneScreen() {
  const router = useRouter();
  return (
    <PrefectureList
      onItemPress={(item) => {
        router.navigate({
          pathname: "/lines",
          params: { prefectureId: item.id },
        });
      }}
    />
  );
}
