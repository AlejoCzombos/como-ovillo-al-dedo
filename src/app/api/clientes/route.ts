import { NextResponse } from "next/server"
import app from "@/lib/firebase/firebase"
import { getFirestore, collection, getDocs, doc, runTransaction } from "firebase/firestore"
import { validatePassword } from "@/utils/password-validation";

const db = getFirestore(app)

export async function GET(request: Request) {
  try{
    if (!await validatePassword(request)) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }
    validatePassword(request)
    const snapshot = await getDocs(collection(db, "clientes"))
    const clientes = snapshot.docs.map(doc => doc.data())
    return NextResponse.json(clientes, { status: 200 })
  }catch(e){
    console.log('Error:', e)
    return NextResponse.json({ message: 'Error al obtener los clientes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  //Transacción para incrementar el id del cliente y de la metadata
  try {
    if (!await validatePassword(request)) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }
    const body = await request.json()

    await runTransaction(db, async (transaction) => {
      const metadataId = doc(db, "metadata/cliente_id")
      const nextId = await transaction.get(metadataId)

      const newId = (nextId.data()?.ultimo || 0) + 1
      
      const client = {
        ...body,
        puntos: 0,
        id: newId
      }

      await transaction.set(doc(db, "clientes", newId.toString()), client)
      
      await transaction.update(metadataId, {
        ultimo: newId
      })
    });
    return NextResponse.json({ message: 'Cliente creado' }, { status: 201 })
  }catch (e) {
    console.log('Transaction failure:', e)
    return NextResponse.json({ message: 'Error al crear el cliente' }, { status: 500 })
  }
}
