import { NextResponse } from "next/server"
import app from "@/lib/firebase/firebase"
import { getFirestore, getDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { validatePassword } from "@/utils/password-validation";


const db = getFirestore(app)

export async function GET(request: Request, {params} : {params: {id: string}}) {
  try{
    if (!await validatePassword(request)) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }
    const clientRef = doc(db, `clientes/${params.id}`)
    const clientSnapshot = await getDoc(clientRef)

    if (!clientSnapshot.exists()) {
      return NextResponse.json({ message: 'Cliente no encontrado' }, { status: 404 })
    }

    const clientData = clientSnapshot.data();

    return NextResponse.json(clientData, { status: 200 })
  }catch(e){
    console.log('Error:', e)
    return NextResponse.json({ message: 'Error al obtener el cliente' }, { status: 500 })
  }
}