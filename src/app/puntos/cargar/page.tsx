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

    const data = fetch("/api/clientes/puntos/cargar", {
      method: "POST",
      body: JSON.stringify({ monto: totalSale, cliente_id: result }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.promise(
      data.then((res) => res.json()),
      {
        loading: "Cargando puntos...",
        success: (data) =>
          `Puntos cargados\nPuntos actuales: ${data.puntosActuales}`,
        error: "Error al cargar los puntos",
      }
    );

    setResult("");
    form.reset();
  };

  return (
    <main className="flex justify-center min-h-[100vw] w-full m-auto">
      {!result && (
        <section className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-5 sm:px-0 relative">
          <h2 className="text-3xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
            Carga de Puntos
          </h2>
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
          className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-5 sm:px-0"
        >
          <div className="w-full p-2 text-2xl">
            <label className="text-white" htmlFor="totalSale">
              Monto de la venta:
            </label>
            <input
              type="number"
              id="totalSale"
              className="w-full p-2 bg-secondary-100 rounded-xl"
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
