import { NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";
import { validateFirebaseIdToken } from "@/utils/authorizationMiddleware";

const db = admin.firestore();

export async function POST(request: Request) {
  try {
    const idToken = await validateFirebaseIdToken(request);
    if (!idToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { cliente_id: clientId, monto: amount } = body;

    if (!clientId || isNaN(amount)) {
      return NextResponse.json({ message: "Faltan parámetros" }, { status: 406 });
    }

    const clientRef = db.collection("clientes").doc(String(clientId));
    const client = await clientRef.get();

    if (!client.exists) {
      return NextResponse.json({ message: "Cliente no encontrado" }, { status: 404 });
    }

    let newPoints;
    await db.runTransaction(async (transaction) => {
      const metadataRef = db.collection("metadata").doc("puntos");
      const pointsMetadata = await transaction.get(metadataRef);

      const percentage = pointsMetadata.data()?.porcentaje / 100;
      const points = amount * percentage;

      const client = await transaction.get(clientRef);

      newPoints = Math.round(client.data()?.puntos + points);

      await transaction.update(clientRef, { puntos: newPoints });
    });

    const clientName = client.data()?.nombre;

    return NextResponse.json({ currentPoints: newPoints, name: clientName }, { status: 200 });
  } catch (e) {
    console.log("Error:", e);
    return NextResponse.json({ message: "Error al obtener los clientes" }, { status: 500 });
  }
}
