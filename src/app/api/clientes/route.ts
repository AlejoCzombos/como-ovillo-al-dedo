import { NextResponse } from "next/server"
import app from "@/lib/firebase/firebase"
import { getFirestore, collection, getDocs, getDoc, updateDoc, doc, runTransaction, deleteDoc } from "firebase/firestore"

const db = getFirestore(app)

export async function GET() {
  try{
    const snapshot = await getDocs(collection(db, "clientes"))
    const clientes = snapshot.docs.map(doc => doc.data())
    return NextResponse.json(clientes, { status: 200 })
  }catch(e){
    console.log('Error:', e)
    return NextResponse.json({ message: 'Error al obtener los clientes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
    
  //Transacción para incrementar el id del cliente y de la metadata
  try {
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

