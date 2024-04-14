import { NextResponse } from "next/server"
import app from "@/lib/firebase/firebase"
import { getFirestore, getDoc, updateDoc, doc } from "firebase/firestore"

const db = getFirestore(app)

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const { cliente_id: clientId, puntos: points } = body;

        if (!clientId || isNaN(points)) {
            return NextResponse.json({ message: 'Faltan parámetros' }, { status: 400 })
        }

        const clientRef = doc(db, `clientes/${clientId}`)
        const client = await getDoc(clientRef)

        if (!client.exists()) {
            return NextResponse.json({ message: 'Cliente no encontrado' }, { status: 404 })
        }

        if (client.data().puntos < points) {
            return NextResponse.json({ message: 'No hay suficientes puntos' }, { status: 400 })
        }

        const newPoints = client.data().puntos - points

        await updateDoc(clientRef, { puntos: newPoints })
        return NextResponse.json({ puntosActuales : newPoints }, { status: 200 })
    }catch(e){
        //console.log('Error:', e)
        return NextResponse.json({ message: 'Error al obtener los clientes' }, { status: 500 })
    }

}