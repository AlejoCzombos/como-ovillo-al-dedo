// utils/password-validation.ts
import app from "@/lib/firebase/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);

export async function validatePassword(request: Request): Promise<boolean> {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");

  if (!password) {
    return false;
  }

  const passwordDoc = await getDoc(doc(db, "metadata/autorizacion"));
  const correctPassword = passwordDoc.data()?.contrasenia;

  return password === correctPassword;
}