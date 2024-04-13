import { NextResponse } from "next/server"
import app from "@/lib/firebase/firebase"
import { getFirestore, collection, getDocs, getDoc, updateDoc, doc, runTransaction } from "firebase/firestore"

const db = getFirestore(app)

export async function GET() {
  const snapshot = await getDocs(collection(db, "clientes"))
  const clientes = snapshot.docs.map(doc => doc.data())
  return NextResponse.json(clientes)
}

export async function POST(request: Request) {
  const body = await request.json()
    
  //Transacción para incrementar el id del cliente
  try {
    await runTransaction(db, async (transaction) => {
      const metadataId = doc(db, "metadata/cliente_id")
      const nextId = await transaction.get(metadataId)

      const newId = (nextId.data()?.ultimo || 0) + 1

      console.log('NextId:', nextId.data()?.ultimo)
      console.log('NextId:', newId)
      
      const client = {
        ...body,
        id: newId
      }

      await transaction.set(doc(db, "clientes", newId.toString()), client)
      
      await transaction.update(metadataId, {
        ultimo: newId
      })

      console.log('Client:', client)
    });
    console.log('Transaction success!')
  }catch (e) {
    console.log('Transaction failure:', e)
  }

  
  
  //console.log(body)
  return NextResponse.json({ name: 'John Doe' })
}

export async function PUT(request: Request) {
  console.log("PUT")
  return Response.json({ name: 'John Doe' })
}

export async function DELETE(request: Request) {
  console.log("DELETE")
  return Response.json({ name: 'John Doe' })
}

