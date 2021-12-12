import { getFirestore, collection, doc, getDocs } from "firebase/firestore";
import { initialize } from "./initialize";
import { Item as ItemType } from "./type";
import dayjs from "dayjs";

export class ItemInterface {
  public static getAll = () => {
    initialize();
    const db = getFirestore();
    return getDocs(collection(db, "items")).then((snaps) => {
      return snaps.docs.map(
        (doc) => ({ ...doc.data(), timeStamp: dayjs(doc.data().timeStamp) } as ItemType)
      );
    });
  };
}
