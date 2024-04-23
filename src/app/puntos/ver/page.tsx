"use client";

import BigButton from "@/components/BigButton";
import { useState } from "react";
import toast from "react-hot-toast";

interface client {
  firstname: string;
  points: number;
}

export default function VerPuntos() {
  const [client, setClient] = useState<client>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const clientId = form.clientId.value;

    const toastPromise = toast.loading("Buscando cliente...");
    const data = await fetch(`/api/clientes/${clientId}`);

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

    form.reset();
  };

  return (
    <main className="flex justify-center min-h-[85vh] w-full m-auto relative">
      <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
        Consultar puntos
      </h2>
      {!client && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-5 w-full max-w-md px-5 sm:px-0"
        >
          <div className="w-full text-2xl">
            <label className="text-white" htmlFor="clientId">
              Número de Cliente:
            </label>
            <input
              type="number"
              id="clientId"
              className="w-full p-2 bg-secondary-100 rounded-xl"
            />
          </div>
          <BigButton text="VER PUNTOS" />
        </form>
      )}
      {client && (
        <div className="flex flex-col items-center justify-center text-center gap-3 w-full max-w-lg px-5 sm:px-0">
          <h3 className="text-white font-semibold text-4xl">
            Hola <span className="text-secondary-500">{client.firstname}</span>{" "}
            tenes un total de{" "}
          </h3>
          <p className="text-secondary-500 text-6xl font-semibold">
            {client.points} puntos
          </p>
          <p className="text-white text-xl">
            ¡¡¡Seguí comprando para sumar más puntos y así canjearlos por
            recompensas!!!
          </p>
        </div>
      )}
    </main>
  );
}
