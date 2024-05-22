"use client";

import ClientSearchForm from "@/components/ClientSearchForm";
import { getClientPoints } from "@/utils/api.clients";
import { useState } from "react";
import toast from "react-hot-toast";

export default function VerPuntos() {
  const [client, setClient] = useState<clientData>();

  const handleSubmit = async (formData: ClientSearchForm) => {
    const { clientId } = formData;

    const toastPromise = toast.loading("Buscando cliente...");
    const data = await getClientPoints(clientId);

    const response = await data.json();
    if (data.status === 200) {
      toast.success(`Cliente encontrado`, {
        id: toastPromise,
      });
      setClient(response);
    } else if (data.status === 404) {
      toast.error("El cliente no existe", { id: toastPromise });
    } else {
      toast.error("Error al buscar el cliente", { id: toastPromise });
    }
  };

  return (
    <main className="flex justify-center min-h-[85vh] w-full m-auto relative">
      <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
        Consultar puntos
      </h2>
      {!client && <ClientSearchForm onSubmit={handleSubmit} buttonLabel="CONSULTAR PUNTOS" />}
      {client && (
        <div className="flex flex-col items-center justify-center text-center gap-3 w-full max-w-lg px-5 sm:px-0">
          <h3 className="text-white font-semibold text-4xl">
            Hola <span className="text-secondary-500">{client.name}</span> tenes un total de{" "}
          </h3>
          <p className="text-secondary-500 text-6xl font-semibold">{client.currentPoints} puntos</p>
          <p className="text-white text-xl">
            ¡¡¡Seguí comprando para sumar más puntos y así canjearlos por recompensas!!!
          </p>
        </div>
      )}
    </main>
  );
}
