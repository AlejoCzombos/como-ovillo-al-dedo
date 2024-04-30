import { NextResponse } from "next/server"
import app from "@/lib/firebase/firebase"
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore"

const db = getFirestore(app)

export async function GET() {
    try{
        const metadataRef = doc(db, "metadata/cliente_id")
        const metadata = await getDoc(metadataRef)
        const nextId = metadata.data()?.ultimo + 1

        return NextResponse.json({ nextId: nextId }, { status: 200 })
    }
    catch(e){
        console.log('Error:', e)
        return NextResponse.json({ message: 'Error al obtener los clientes' }, { status: 500 })
    }
}