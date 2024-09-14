import { LocationObjectCoords } from "expo-location";
import { DocumentData, Timestamp } from "firebase/firestore";

export interface Note extends DocumentData {
  title: string;
  body: string;
  date: Timestamp;
  /**
   * Optional location data used to display a pin on the map.
   **/
  location?: LocationObjectCoords;
}
