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
import { Item as ItemType, Review } from "./type";
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

  // 商品購入処理。今は、downloadedを1増やすだけ。
  public static buy = async (itemId: string) => {
    initialize();
    const db = getFirestore();
    const item = await this.get(itemId);

    return updateDoc(doc(db, `items/${itemId}`), { downloaded: item.downloaded + 1 });
  };

  // レビューを追加
  public static addReview = async (itemId: string, review: Review) => {
    initialize();

    const db = getFirestore();
    const item = await this.get(itemId);

    const newReview = { ...review, timeStamp: Timestamp.fromDate(item.timeStamp.toDate()) };
    console.log({ reviews: [...item.reviews, newReview] });
    return updateDoc(doc(db, `items/${itemId}`), { reviews: [...item.reviews, newReview] });
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
