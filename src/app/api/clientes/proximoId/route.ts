import { NextResponse } from "next/server"
import admin from "@/lib/firebase/firebaseAdmin"
import { validateFirebaseIdToken } from "@/utils/authorizationMiddleware";

const db = admin.firestore()

export async function GET(request: Request) {
    try{
        const idToken = await validateFirebaseIdToken(request)
        if (!idToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
        }
        
        const metadataRef = db.collection("metadata").doc("cliente_id")
        const metadata = await metadataRef.get()

        if (!metadata.exists){
            return NextResponse.json({ message: 'Metadata no encontrada' }, { status: 404 })
        }

        const clientIdData = metadata.data()

        const ultimoId = clientIdData?.ultimo
        const nextId = ultimoId + 1

        return NextResponse.json({ nextId: nextId }, { status: 200 })
    }
    catch(e){
        console.log('Error:', e)
        return NextResponse.json({ message: 'Error al obtener los clientes' }, { status: 500 })
    }
}