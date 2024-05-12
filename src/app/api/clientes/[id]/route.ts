import { NextResponse } from "next/server"
import admin from "@/lib/firebase/firebaseAdmin"
import {validateFirebaseIdToken} from "@/utils/authorizationMiddleware";

const db = admin.firestore()

export async function GET({params} : {params: {id: string}}) {
  
  try{
    const clientId = params.id
    const clientRef = db.collection('clientes').doc(clientId)
    const cliente = await clientRef.get()

    if (!cliente.exists) {
      return NextResponse.json({ message: 'Cliente no encontrado' }, { status: 404 })
    }

    const clientData = cliente.data();

    const clientResponse = {
      firstname: clientData?.nombre,
      points: clientData?.puntos
    }

    return NextResponse.json(clientResponse, { status: 200 })
  }catch(e){
    console.log('Error:', e)
    return NextResponse.json({ message: 'Error al obtener el cliente' }, { status: 500 })
  }
}

export async function PUT(request: Request, {params} : {params: {id: string}}) {
  
  try {
    const idToken = await validateFirebaseIdToken(request)
    if (!idToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()
    const clientId = params.id
    const clientRef = db.collection('clientes').doc(clientId)
    const cliente = await clientRef.get()

    if (!cliente.exists) {
      return NextResponse.json({ message: 'Cliente no encontrado' }, { status: 404 })
    }

    await clientRef.update(body)

    return NextResponse.json({ message: 'Cliente actualizado' }, { status: 200 })
  }catch(e){
    console.log('Error:', e)
    return NextResponse.json({ message: 'Error al actualizar el cliente' }, { status: 500 })
  }
}

export async function DELETE(request: Request, {params} : {params: {id: string}}) {
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

    await clientRef.delete()
    return Response.json({ message: 'Cliente eliminado' }, { status: 200 })
  }catch(e){
    console.log('Error:', e)
    return Response.json({ message: 'Error al eliminar el cliente' }, { status: 500 })
  }
}