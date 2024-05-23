import { NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";
import { validateFirebaseIdToken } from "@/utils/authorizationMiddleware";

const db = admin.firestore();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const idToken = await validateFirebaseIdToken(request);
    if (!idToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const productId = params.id;

    const productRef = db.collection("productos").doc(productId);
    const product = await productRef.get();
    if (!product.exists) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(product.data(), { status: 200 });
  } catch (e) {
    console.log("Error:", e);
    return NextResponse.json({ message: "Error al obtener el producto" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const idToken = await validateFirebaseIdToken(request);
    if (!idToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const productId = params.id;

    const productRef = db.collection("productos").doc(productId);
    const product = await productRef.get();
    if (!product.exists) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    await productRef.update(body);

    return NextResponse.json({ message: "Producto actualizado" }, { status: 200 });
  } catch (e) {
    console.log("Error:", e);
    return NextResponse.json({ message: "Error al actualizar el producto" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const idToken = await validateFirebaseIdToken(request);
    if (!idToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    const productId = params.id;

    const productRef = db.collection("productos").doc(productId);
    const product = await productRef.get();
    if (!product.exists) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    await productRef.delete();
    return Response.json({ message: "Producto eliminado" }, { status: 200 });
  } catch (e) {
    console.log("Error:", e);
    return Response.json({ message: "Error al eliminar el producto" }, { status: 500 });
  }
}
