import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initialize } from "./initialize";

export class storageInterface {
  public static upload = async (path: string, file: File) => {
    initialize();
    const storage = getStorage();
    const imgRef = ref(storage, path);

    const res = await uploadBytes(imgRef, file);
    const result = await getDownloadURL(res.ref).then((url) => {
      return url;
    });

    return result;
  };
}
