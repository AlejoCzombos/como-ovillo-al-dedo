"use client";

import React, { useState } from "react";
import BigButton from "./BigButton";

export default function ClientSearchForm({
  onSubmit,
  buttonLabel,
}: {
  onSubmit: (formData: ClientSearchForm) => void;
  buttonLabel?: string;
}) {
  const [clientId, setClientId] = useState<number>();
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientId(parseInt(value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!clientId) {
      setError("El campo N° Cliente es obligatorio");
      return;
    }
    const response = {
      clientId,
    };
    onSubmit(response);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-3 w-full max-w-md px-5 sm:px-0"
    >
      <div className="w-full text-2xl">
        <label className="text-white" htmlFor="clientId">
          N° Cliente:
        </label>
        <input
          name="clientId"
          type="number"
          value={clientId || ""}
          className="w-full p-2 bg-secondary-100 rounded-xl"
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-lg">{error}</p>}
      </div>
      <BigButton text={buttonLabel || "BUSCAR CLIENTE"} className="mt-3" />
    </form>
  );
}
