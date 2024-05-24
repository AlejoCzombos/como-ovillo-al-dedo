import { NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";
import { validateFirebaseIdToken } from "@/utils/authorizationMiddleware";
import { getDownloadURL } from "firebase-admin/storage";
import fs from "fs";
import path from "path";

const db = admin.firestore();
const serverBucket = admin.storage();

export async function GET(request: Request) {
  try {
    const snapshot = await db.collection("productos").get();
    const productos = snapshot.docs.map((doc) => doc.data()).sort((a, b) => a.puntos - b.puntos);

    return NextResponse.json(productos, { status: 200 });
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

    const productData = {
      ...body,
      imagen: null,
    };

    const newProductRef = db.collection("productos").doc();
    newProductRef.set({ ...productData, id: newProductRef.id });

    const product = await newProductRef.get();

    return NextResponse.json({ id: product.id }, { status: 201 });
  } catch (e) {
    console.log("Transaction failure:", e);
    return NextResponse.json({ message: "Error al crear el producto" }, { status: 500 });
  }
}
