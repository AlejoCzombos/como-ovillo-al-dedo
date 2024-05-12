import { NextResponse } from "next/server"
import admin from "@/lib/firebase/firebaseAdmin"
import { validateFirebaseIdToken } from "@/utils/authorizationMiddleware";

const db = admin.firestore()

export async function POST(request: Request) {
    try{
        const idToken = await validateFirebaseIdToken(request)
        if (!idToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
        }

        const body = await request.json();
        const { cliente_id: clientId, puntos: points } = body;

        if (!clientId || isNaN(points)) {
            return NextResponse.json({ message: 'Faltan parámetros' }, { status: 406 })
        }

        const clientRef = db.collection("clientes").doc(clientId)
        const client = await clientRef.get()

        if (!client.exists) {
            return NextResponse.json({ message: 'Cliente no encontrado' }, { status: 404 })
        }

        const clientData = client.data()

        if (clientData?.puntos < points) {
            return NextResponse.json({ message: 'No hay suficientes puntos' }, { status: 400 })
        }

        const newPoints = clientData?.puntos - points
        const clientName = clientData?.nombre
        
        await clientRef.update({ puntos: newPoints })

        return NextResponse.json({ currentPoints : newPoints, name : clientName }, { status: 200 })
    }catch(e){
        console.log('Error:', e)
        return NextResponse.json({ message: 'Error al obtener los clientes' }, { status: 500 })
    }

}