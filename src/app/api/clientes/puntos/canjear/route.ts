import { NextResponse } from "next/server"
import app from "@/lib/firebase/firebase"
import { getFirestore, getDoc, updateDoc, doc } from "firebase/firestore"
import { validatePassword } from "@/utils/password-validation";

const db = getFirestore(app)

export async function POST(request: Request) {
    try{
        if (!await validatePassword(request)) {
            return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
        }
        const body = await request.json();
        const { cliente_id: clientId, puntos: points } = body;

        if (!clientId || isNaN(points)) {
            return NextResponse.json({ message: 'Faltan parámetros' }, { status: 406 })
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
        const clientName = client.data().nombre

        await updateDoc(clientRef, { puntos: newPoints })
        return NextResponse.json({ currentPoints : newPoints, name : clientName }, { status: 200 })
    }catch(e){
        console.log('Error:', e)
        return NextResponse.json({ message: 'Error al obtener los clientes' }, { status: 500 })
    }

}