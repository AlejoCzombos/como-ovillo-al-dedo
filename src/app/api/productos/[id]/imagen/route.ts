import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";
import { validateFirebaseIdToken } from "@/utils/authorizationMiddleware";
import { getDownloadURL as getDowloadURLServer } from "firebase-admin/storage";

const db = admin.firestore();
const serverBucket = admin.storage();

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const idToken = await validateFirebaseIdToken(request);
    if (!idToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const update = searchParams.get("update");

    const productId = params.id;
    const productRef = db.collection("productos").doc(productId);
    const product = await productRef.get();
    if (!product.exists) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    if (update) {
      const imageUrl = product.data()?.imagen;
      const imagePath = getPathStorageFromUrl(imageUrl);
      const imageRef = serverBucket.bucket().file(imagePath);
      await imageRef.delete();
    }

    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Genera un nombre de archivo único
    const imageName = `${Date.now()}_image.jpg`;

    // Ahora puedes guardar el Buffer en Firebase Storage
    const imageRef = serverBucket.bucket().file(`productos/${imageName}`);
    await imageRef.save(buffer);
    const imageUrl = await getDowloadURLServer(imageRef);

    await productRef.update({
      imagen: imageUrl,
    });

    return NextResponse.json({ message: "Producto actualizado" }, { status: 200 });
  } catch (e) {
    console.log("Error:", e);
    return NextResponse.json({ message: "Error al actualizar el producto" }, { status: 500 });
  }
}

function getPathStorageFromUrl(url: string) {
  const baseUrl = "https://firebasestorage.googleapis.com/v0/b/como-ovillo-al-dedo.appspot.com/o/";
  let imagePath: string = url.replace(baseUrl, "");
  const indexOfEndPath = imagePath.indexOf("?");
  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = imagePath.replace("%2F", "/");
  return imagePath;
}
