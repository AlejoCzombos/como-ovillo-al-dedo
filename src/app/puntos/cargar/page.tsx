"use client";

import { qrState, useQr } from "@/lib/store/Qr";

export default function CargarPuntos() {
  const { result } = useQr() as qrState;
  return (
    <main className="flex justify-center min-h-full h-screen w-full m-auto">
      <section className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-5">
        <button className="bg-tertiary-200 text-secondary-500 py-4 text-3xl w-full font-semibold drop-shadow-lg rounded-3xl hover:bg-tertiary-100 transition-colors ease-in-out">
          ESCANEAR CON QR
        </button>
        <button className="bg-tertiary-200 text-secondary-500 py-4 text-3xl w-full font-semibold drop-shadow-lg rounded-3xl hover:bg-tertiary-100 transition-colors ease-in-out">
          CARGAR POR NUMERO DE CLIENTE
        </button>
      </section>
    </main>
  );
}
