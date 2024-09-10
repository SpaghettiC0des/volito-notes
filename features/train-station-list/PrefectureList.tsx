import { FlashList } from "@shopify/flash-list";
import { ListItem, ListItemTitle, Separator } from "tamagui";

import { trains } from "shared/train";

type Props = { onItemPress: (item: any) => void };
export function PrefectureList({ onItemPress }: Props) {
  return (
    <FlashList
      data={trains.sort((a, b) => a.name.en.localeCompare(b.name.en))}
      estimatedItemSize={100}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => (
        <ListItem onPress={() => onItemPress(item)}>
          <ListItemTitle>{item.name.en}</ListItemTitle>
        </ListItem>
      )}
    />
  );
}
