import { NextResponse } from "next/server"
import admin from "@/lib/firebase/firebaseAdmin"
import { validateFirebaseIdToken } from "@/utils/authorizationMiddleware";

const db = admin.firestore()

export async function GET(request: Request) {
  try {
    const idToken = await validateFirebaseIdToken(request)
        if (!idToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
        }

    const snapshot = await db.collection("clientes").get();
    const clientes = snapshot.docs.map((doc) => doc.data());

    const clientesResponse = clientes.map((cliente) => ({
      id: cliente.id,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      puntos: cliente.puntos
    })).sort((a, b) => a.id - b.id);

    return NextResponse.json(clientesResponse, { status: 200 });
  } catch (e) {
    console.log('Error:', e);
    return NextResponse.json({ message: 'Error al obtener los clientes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const idToken = await validateFirebaseIdToken(request)
    if (!idToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json();

    await db.runTransaction(async (transaction) => {
      const metadataRef = db.collection("metadata").doc("cliente_id")
      const nextId = await transaction.get(metadataRef);

      const newId = (nextId.data()?.ultimo || 0) + 1;
      
      const client = {
        ...body,
        puntos: 0,
        id: newId
      };

      const newUserRef = db.collection("clientes").doc(newId.toString());

      await transaction.set(newUserRef, client);
    
      await transaction.update(metadataRef, {
        ultimo: newId
      });
    });

    return NextResponse.json({ message: 'Cliente creado' }, { status: 201 });
  } catch (e) {
    console.log('Transaction failure:', e);
    return NextResponse.json({ message: 'Error al crear el cliente' }, { status: 500 });
  }
}