"use client";

import ModalIdClient from "@/components/ModalIdClient";
import ModalQr from "@/components/ModalQr";
import BigButton from "@/components/BigButton";
import { qrState, useQr } from "@/lib/store/Qr";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CargarPuntos() {
  const { result, setIsOpen, isOpen, setResult } = useQr() as qrState;
  const [idClientIsOpen, setIdClientIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const totalSale = form.totalSale.value;
    const password = form.password.value;

    const toastPromise = toast.loading("Cargando puntos...");
    const data = await fetch(
      `/api/clientes/puntos/cargar?password=${password}`,
      {
        method: "POST",
        body: JSON.stringify({ monto: totalSale, cliente_id: result }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await data.json();
    if (data.status === 200) {
      toast.success(
        `Puntos cargados\nPuntos totales: ${response.puntosActuales}`,
        {
          id: toastPromise,
        }
      );
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
    <main className="flex justify-center min-h-[85vh] w-full m-auto relative">
      <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
        Carga de Puntos
      </h2>
      {!result && (
        <section className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-5 sm:px-0">
          <BigButton text="ESCANEAR CON QR" onClick={handleClick} />
          <BigButton
            text="CARGAR POR NUMERO DE CLIENTE"
            onClick={() => setIdClientIsOpen(true)}
          />
        </section>
      )}
      {result && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-2 w-full max-w-md px-5 sm:px-0"
        >
          <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
            Carga de Puntos
          </h2>
          <div className="w-full text-2xl">
            <label className="text-white" htmlFor="totalSale">
              Monto de la venta:
            </label>
            <input
              type="number"
              id="totalSale"
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
              className="w-full p-2 bg-secondary-200 border-white border-2 rounded-xl"
            />
          </div>
          <BigButton text="CARGAR PUNTOS" />
        </form>
      )}
      {isOpen && <ModalQr />}
      {idClientIsOpen && (
        <ModalIdClient isOpen={idClientIsOpen} setIsOpen={setIdClientIsOpen} />
      )}
    </main>
  );
}
