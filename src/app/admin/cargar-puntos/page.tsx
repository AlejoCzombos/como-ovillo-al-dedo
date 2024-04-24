"use client";

import ModalIdClient from "@/components/ModalIdClient";
import ModalQr from "@/components/ModalQr";
import BigButton from "@/components/BigButton";
import { qrState, useQr } from "@/lib/store/Qr";
import { useState } from "react";
import toast from "react-hot-toast";
import UpdatePointsForm from "@/components/UpdatePointForm";

export default function CargarPuntos() {
  const { result, setIsOpen, isOpen, setResult } = useQr() as qrState;
  const [idClientIsOpen, setIdClientIsOpen] = useState<boolean>(false);
  const [wasCharged, setWasCharged] = useState<boolean>(false);
  const [updatePointsResponse, setUpdatePointsResponse] =
    useState<UpdatePointsResponse>();

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (formData: UpdatePointsForm) => {
    const { amount, password } = formData;

    const toastPromise = toast.loading("Cargando puntos...");
    const data = await fetch(
      `/api/clientes/puntos/cargar?password=${password}`,
      {
        method: "POST",
        body: JSON.stringify({ monto: amount, cliente_id: result }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await data.json();
    if (data.status === 200) {
      toast.remove(toastPromise);
      setUpdatePointsResponse(response);
      setWasCharged(true);
    } else if (data.status === 401) {
      toast.error("Contraseña incorrecta", { id: toastPromise });
    } else if (data.status === 404) {
      toast.error("El cliente no existe", { id: toastPromise });
    } else {
      toast.error("Error al cargar los puntos", { id: toastPromise });
    }

    setResult("");
  };

  return (
    <main className="flex justify-center min-h-[85vh] w-full m-auto relative">
      {!wasCharged && (
        <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
          Cargar Puntos
        </h2>
      )}
      {!result && !wasCharged && (
        <section className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-5 sm:px-0">
          <BigButton text="ESCANEAR CON QR" onClick={handleClick} />
          <BigButton
            text="CARGAR POR NUMERO DE CLIENTE"
            onClick={() => setIdClientIsOpen(true)}
          />
        </section>
      )}
      {result && (
        <UpdatePointsForm
          onSubmit={handleSubmit}
          labelTitule="Monto"
          buttonLabel="CARGAR PUNTOS"
          isCash={true}
        />
      )}
      {wasCharged && !result && (
        <section className="flex flex-col items-center justify-center w-full max-w-md px-5 sm:px-0">
          <p className="text-white font-semibold text-4xl text-center mb-2">
            ¡Puntos cargados correctamente!
          </p>
          <p className="text-white font-semibold text-2xl">
            <span className="text-secondary-500">
              {updatePointsResponse?.name}
            </span>{" "}
            ahora tiene:
          </p>
          <p className="text-secondary-500 text-4xl font-semibold">
            {updatePointsResponse?.currentPoints} puntos
          </p>
        </section>
      )}
      {isOpen && <ModalQr />}
      {idClientIsOpen && (
        <ModalIdClient isOpen={idClientIsOpen} setIsOpen={setIdClientIsOpen} />
      )}
    </main>
  );
}
