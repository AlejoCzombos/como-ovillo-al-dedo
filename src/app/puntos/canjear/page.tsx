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

    const data = fetch("/api/clientes/puntos/canjear", {
      method: "POST",
      body: JSON.stringify({ puntos: totalPoints, cliente_id: result }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.promise(
      data.then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Error al canjear los puntos");
        }
      }),
      {
        loading: "Canjeando puntos...",
        success: (data) =>
          `Puntos canjeados\nPuntos restantes: ${data.puntosActuales}`,
        error: "Error al canjear los puntos",
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
          className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-5 sm:px-0"
        >
          <div className="w-full p-2 text-2xl">
            <label className="text-white" htmlFor="totalPoints">
              Puntos a canjear:
            </label>
            <input
              type="number"
              id="totalPoints"
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
