import { ChangeEvent } from "react";
import { storage } from "../api/firebaseConfig.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { alertMassage } from "./alerts.js";

/** upload Recipe Image max. 4 allowed */
export const uploadRecipeImg = (e: ChangeEvent, id: string, number: number) => {
  const imageRef = ref(storage, `recipe/${id}-${number}`);
  return uploadImage(e, imageRef);
};

/** upload User Image just one allowed */
export const uploadUserImg = (e: ChangeEvent, id: string) => {
  const imageRef = ref(storage, `user/user-${id}`);
  return uploadImage(e, imageRef);
};

const uploadImage = async (e: ChangeEvent, imageRef: StorageReference) => {
  try {
    const myInput = e.target as HTMLInputElement;
    const myImage = myInput.files && myInput.files[0];

    return uploadBytes(imageRef, myImage as File).then((res) =>
      getDownloadURL(res.ref).then((url) => {
        alertMassage("Ihr Foto wurde erfolgreich hochgeladen");
        return url;
      })
    );
  } catch {
    alertMassage(
      "Beim Hochladen Ihres Fotos ist ein Fehler aufgetreten",
      "error"
    );
  }
};
