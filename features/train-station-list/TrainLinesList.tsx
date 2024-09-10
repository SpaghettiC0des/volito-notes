import { FlashList } from "@shopify/flash-list";
import { ListItem, ListItemTitle, Separator, Text } from "tamagui";

import { trains } from "shared/train";

type Props = { prefectureId: string; onItemPress: (item: any) => void };

export function TrainLinesList({ onItemPress, prefectureId }: Props) {
  const station = trains.find(
    (prefecture) => prefecture.id === Number(prefectureId),
  );

  if (!station) return <Text>No stations found</Text>;

  return (
    <FlashList
      data={station.lines}
      estimatedItemSize={100}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => (
        <ListItem onPress={() => onItemPress(item)}>
          <ListItemTitle>{item.name?.en ?? "no name"}</ListItemTitle>
        </ListItem>
      )}
    />
  );
}
