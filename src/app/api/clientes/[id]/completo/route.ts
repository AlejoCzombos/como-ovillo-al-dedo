import { NextRequest, NextResponse } from "next/server"
import admin from "@/lib/firebase/firebaseAdmin"
import { validateFirebaseIdToken } from "@/utils/authorizationMiddleware";

const db = admin.firestore()

export async function GET(request: NextRequest, {params} : {params: {id: string}}) {
  try{
    const idToken = await validateFirebaseIdToken(request)
    if (!idToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
    }

    const clientId = params.id
    const clientRef = db.collection('clientes').doc(clientId)
    const cliente = await clientRef.get()

    if (!cliente.exists) {
      return NextResponse.json({ message: 'Cliente no encontrado' }, { status: 404 })
    }

    const clientData = cliente.data();

    return NextResponse.json(clientData, { status: 200 })
  }catch(e){
    console.log('Error:', e)
    return NextResponse.json({ message: 'Error al obtener el cliente' }, { status: 500 })
  }
}