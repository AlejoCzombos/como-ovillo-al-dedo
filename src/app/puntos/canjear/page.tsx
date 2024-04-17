"use client";

import ModalIdClient from "@/components/ModalIdClient";
import ModalQr from "@/components/ModalQr";
import BigButton from "@/components/BigButton";
import { qrState, useQr } from "@/lib/store/Qr";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CanjearPuntos() {
  const { result, setIsOpen, isOpen, setResult } = useQr() as qrState;
  const [idClientIsOpen, setIdClientIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const totalPoints = form.totalPoints.value;
    const password = form.password.value;

    const toastPromise = toast.loading("Cargando puntos...");
    const data = await fetch(
      `/api/clientes/puntos/canjear?password=${password}`,
      {
        method: "POST",
        body: JSON.stringify({ puntos: totalPoints, cliente_id: result }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await data.json();
    if (data.status === 200) {
      toast.success(
        `Puntos cargados\nPuntos restantes: ${response.puntosTotales}`,
        {
          id: toastPromise,
        }
      );
    } else if (data.status === 400) {
      toast.error("No hay suficientes puntos", { id: toastPromise });
    } else if (data.status === 401) {
      toast.error("Contraseña incorrecta", { id: toastPromise });
    } else if (data.status === 404) {
      toast.error("El cliente no existe", { id: toastPromise });
    } else {
      toast.error("Error al cargar los puntos", { id: toastPromise });
    }

    setResult("");
    form.reset();
  };

  return (
    <main className="flex justify-center min-h-[100vw] w-full m-auto">
      {!result && (
        <section className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-5 sm:px-0 relative">
          <h2 className="text-3xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
            Canjeo de Puntos
          </h2>
          <BigButton text="ESCANEAR CON QR" onClick={handleClick} />
          <BigButton
            text="CANJEAR POR NUMERO DE CLIENTE"
            onClick={() => setIdClientIsOpen(true)}
          />
        </section>
      )}
      {result && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-2 w-full max-w-md px-5 sm:px-0"
        >
          <div className="w-full text-2xl">
            <label className="text-white" htmlFor="totalPoints">
              Puntos a canjear:
            </label>
            <input
              type="number"
              id="totalPoints"
              className="w-full p-2 bg-secondary-100 rounded-xl"
            />
          </div>
          <div className="w-full text-2xl mb-4">
            <label className="text-white" htmlFor="password">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 bg-secondary-100 rounded-xl"
            />
          </div>
          <BigButton text="CANJEAR PUNTOS" />
        </form>
      )}
      {isOpen && <ModalQr />}
      {idClientIsOpen && (
        <ModalIdClient isOpen={idClientIsOpen} setIsOpen={setIdClientIsOpen} />
      )}
    </main>
  );
}
