"use client";

import { qrState, useQr } from "@/lib/store/Qr";
import QrReader from "./QrReader";
import { useRef } from "react";

export default function ModalQr() {
  const { setIsOpen } = useQr() as qrState;
  const modal = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === modal.current) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={modal}
      onClick={(e) => {
        handleClick(e);
      }}
      className="bg-black/65 fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center"
    >
      <div className="bg-secondary-600 rounded-lg w-[80%] max-w-xl p-5 shadow-lg text-white">
        <QrReader />
      </div>
    </div>
  );
}
