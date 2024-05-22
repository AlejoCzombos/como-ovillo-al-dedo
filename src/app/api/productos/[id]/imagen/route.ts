import { NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";
import { validateFirebaseIdToken } from "@/utils/authorizationMiddleware";
import { getDownloadURL as getDowloadURLServer } from "firebase-admin/storage";

const db = admin.firestore();
const serverBucket = admin.storage();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const idToken = await validateFirebaseIdToken(request);
    if (!idToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Genera un nombre de archivo único
    const imageName = `${Date.now()}_image.jpg`;

    // Ahora puedes guardar el Buffer en Firebase Storage
    const imageRef = serverBucket.bucket().file(`productos/${imageName}`);
    await imageRef.save(buffer);
    const imageUrl = await getDowloadURLServer(imageRef);

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
