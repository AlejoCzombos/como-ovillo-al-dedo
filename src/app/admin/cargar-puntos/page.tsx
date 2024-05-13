"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UpdatePointsForm from "@/components/UpdatePointForm";
import { chargePoints } from "@/utils/api.points";
import useAuthStore from "@/lib/store/authStore";

export default function CargarPuntos() {
  const [wasUpdated, setWasUpdated] = useState<boolean>(false);
  const [clientData, setClientData] = useState<clientData>();
  const token = useAuthStore((state) => state.token) || "";

  const handleSubmit = async (formData: UpdatePointsForm) => {
    const { amount, clientId } = formData;

    const toastPromise = toast.loading("Cargando puntos...");
    const data = await chargePoints(clientId, amount, token);

    const response = await data.json();
    if (data.status === 200) {
      toast.success(`Puntos cargados correctamente`, { id: toastPromise });
      setClientData(response);
      setWasUpdated(true);
    } else if (data.status === 401) {
      toast.error("Contraseña incorrecta", { id: toastPromise });
    } else if (data.status === 404) {
      toast.error("El cliente no existe", { id: toastPromise });
    } else {
      toast.error("Error al cargar los puntos", { id: toastPromise });
    }
  };

  return (
    <main className="flex justify-center min-h-[85vh] w-full m-auto relative">
      {!wasUpdated && (
        <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
          Cargar Puntos
        </h2>
      )}
      {!wasUpdated ? (
        <UpdatePointsForm
          onSubmit={handleSubmit}
          labelTitule="Monto"
          buttonLabel="CARGAR PUNTOS"
          isCash={true}
        />
      ) : (
        <section className="flex flex-col items-center justify-center w-full max-w-md px-5 sm:px-0">
          <p className="text-white font-semibold text-4xl text-center mb-2">
            ¡Puntos cargados correctamente!
          </p>
          <p className="text-white font-semibold text-2xl">
            <span className="text-secondary-500">{clientData?.name}</span> ahora tiene:
          </p>
          <p className="text-secondary-500 text-4xl font-semibold">
            {clientData?.currentPoints} puntos
          </p>
        </section>
      )}
    </main>
  );
}
