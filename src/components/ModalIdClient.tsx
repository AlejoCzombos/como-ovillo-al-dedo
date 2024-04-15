"use client";

import { useRef } from "react";
import { qrState, useQr } from "@/lib/store/Qr";

export default function ModalIdClient({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { setResult } = useQr() as qrState;

  const modal = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === modal.current) {
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const idClient = form.idClient.value;
    setResult(idClient);
    setIsOpen(false);
  };

  return (
    <div
      ref={modal}
      onClick={(e) => {
        handleClick(e);
      }}
      className="bg-black/65 fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-secondary-700 rounded-lg w-[80%] max-w-xl p-5 shadow-lg text-white"
      >
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-lg">Numero de Cliente:</label>
          <input
            autoFocus
            type="number"
            id="idClient"
            placeholder="14"
            className="border-b-2 border-slate-500 bg-transparent text-white px-1 py-1.5 focus:outline-none focus:border-slate-300"
          />
        </div>
        <div className="flex flex-row justify-end gap-4 mt-5">
          <button className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-500 transition-all ease-in-out">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
