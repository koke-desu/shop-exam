import { getFirestore, collection, doc, getDocs } from "firebase/firestore";
import { initialize } from "./initialize";
import { Item as ItemType } from "./type";

export class ItemInterface {
  public static getAll = () => {
    initialize();
    const db = getFirestore();
    return getDocs(collection(db, "items")).then((snaps) => {
      return snaps.docs.map((doc) => doc.data());
    });
  };
}
