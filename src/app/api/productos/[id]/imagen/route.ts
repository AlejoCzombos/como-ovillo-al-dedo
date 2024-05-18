import { NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";
import { validateFirebaseIdToken } from "@/utils/authorizationMiddleware";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL as getDowloadURLServer } from "firebase-admin/storage";
import app from "@/lib/firebase/firebase";

import fs from "fs";
import path from "path";

const db = admin.firestore();
const serverBucket = admin.storage();
const bucket = getStorage(app);

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const idToken = await validateFirebaseIdToken(request);
    if (!idToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // const formData = await request.formData();
    // const image = formData.get("imagen") as File;
    // console.log("Image:", image);
    // if (!image) {
    //   return NextResponse.json({ message: "Imagen no encontrada" }, { status: 400 });
    // }
    // const imageName = `${Date.now()}_${image.name}`;
    // const buffer = fs.readFileSync(path.resolve(__dirname, image.path));
    // // Ahora puedes guardar el Buffer en Firebase Storage
    // const imageRef = serverBucket.bucket().file(`productos/${imageName}`);
    // await imageRef.save(buffer);
    // const imageUrl = await getDowloadURLServer(imageRef);

    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Genera un nombre de archivo único
    const imageName = `${Date.now()}_image.jpg`;

    // Ahora puedes guardar el Buffer en Firebase Storage
    const imageRef = serverBucket.bucket().file(`productos/${imageName}`);
    await imageRef.save(buffer);
    const imageUrl = await getDowloadURLServer(imageRef);

    console.log("Image URL:", imageUrl);

    const productId = params.id;

    const productRef = db.collection("productos").doc(productId);
    const product = await productRef.get();
    if (!product.exists) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    await productRef.update({
      imagen: imageUrl,
    });

    return NextResponse.json({ message: "Producto actualizado" }, { status: 200 });
  } catch (e) {
    console.log("Error:", e);
    return NextResponse.json({ message: "Error al actualizar el producto" }, { status: 500 });
  }
}
