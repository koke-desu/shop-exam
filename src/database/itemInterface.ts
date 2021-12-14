import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { initialize } from "./initialize";
import { Item as ItemType } from "./type";
import dayjs from "dayjs";

export class ItemInterface {
  public static getAll = () => {
    initialize();
    const db = getFirestore();
    return getDocs(collection(db, "items")).then((snaps) => {
      return snaps.docs.map(
        (doc) => ({ ...doc.data(), timeStamp: dayjs(doc.data().timeStamp.toDate()) } as ItemType)
      );
    });
  };

  public static get = (id: string) => {
    initialize();
    const db = getFirestore();
    return getDoc(doc(db, `items/${id}`)).then((snap) => {
      return { ...snap.data(), timeStamp: dayjs(snap.data()?.timeStamp.toDate()) } as ItemType;
    });
  };

  public static create = async (item: ItemType) => {
    initialize();
    const db = getFirestore();
    const res = await addDoc(collection(db, "items"), {
      ...item,
      timeStamp: Timestamp.fromDate(item.timeStamp.toDate()),
    });

    await updateDoc(res, { id: res.id });

    return res;
  };
}
