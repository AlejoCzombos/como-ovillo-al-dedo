import { NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";
import { validateFirebaseIdToken } from "@/utils/authorizationMiddleware";

const db = admin.firestore();

export async function GET(request: Request) {
  try {
    const idToken = await validateFirebaseIdToken(request);
    if (!idToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const snapshot = await db.collection("productos").get();
    const productos = snapshot.docs.map((doc) => doc.data());

    const productosResponse = productos
      .map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        stock: producto.stock,
        image: producto.image,
      }))
      .sort((a, b) => a.id - b.id);

    return NextResponse.json(productosResponse, { status: 200 });
  } catch (e) {
    console.log("Error:", e);
    return NextResponse.json({ message: "Error al obtener los productos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const idToken = await validateFirebaseIdToken(request);
    if (!idToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();

    const product = {
      ...body,
      imagen: null,
    };

    const newProductRef = db.collection("productos").doc();

    newProductRef.set(product);

    return NextResponse.json({ message: "producto creado" }, { status: 201 });
  } catch (e) {
    console.log("Transaction failure:", e);
    return NextResponse.json({ message: "Error al crear el producto" }, { status: 500 });
  }
}
