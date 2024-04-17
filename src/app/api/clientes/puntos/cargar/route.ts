import { NextResponse } from "next/server"
import app from "@/lib/firebase/firebase"
import { getFirestore, doc, getDoc, runTransaction } from "firebase/firestore"
import { validatePassword } from "@/utils/password-validation";

const db = getFirestore(app)

export async function POST(request: Request) {
    try{
        if (!await validatePassword(request)) {
            return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
        }
        const body = await request.json();
        const { cliente_id: clientId, monto: amount } = body;

        if (!clientId || isNaN(amount)) {
            return NextResponse.json({ message: 'Faltan parámetros' }, { status: 406 })
        }

        const clientRef = doc(db, `clientes/${clientId}`);
        const clientSnapshot = await getDoc(clientRef);

        if (!clientSnapshot.exists()) {
            return NextResponse.json({ message: 'Cliente no encontrado' }, { status: 404 });
        }
        
        let newPoints;
        await runTransaction(db, async (transaction) => {
            const metadataId = doc(db, "metadata/puntos")
            const pointsMetadata = await transaction.get(metadataId)
            
            const percentage = (pointsMetadata.data()?.porcentaje) / 100
            const points = amount * percentage
            
            const client = await transaction.get(clientRef)
            
            if (!client.exists()) {
                return 
            }

            newPoints = client.data().puntos + points

            await transaction.update(clientRef, { puntos: newPoints })     
        });

        return NextResponse.json({puntosActuales: newPoints}, { status: 200 })
    }catch(e){
        console.log('Error:', e)
        return NextResponse.json({ message: 'Error al obtener los clientes' }, { status: 500 })
    }

}