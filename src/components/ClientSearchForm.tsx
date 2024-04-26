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
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "clientId") {
      setClientId(parseInt(value));
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!clientId || !password) {
      if (!clientId || password) setError("El campo N° Cliente es obligatorio");
      if (clientId || !password) setError("El campo Contraseña es obligatorio");
      if (!clientId && !password) setError("Los campos son obligatorios");
      return;
    }
    const response = {
      clientId,
      password,
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
      </div>
      <div className="w-full text-2xl">
        <label className="text-white" htmlFor="password">
          Contraseña:
        </label>
        <input
          name="password"
          type="password"
          placeholder="•••••••••"
          value={password || ""}
          className="w-full p-1 px-2 bg-secondary-100 border-secondary-300 border-2 rounded-xl text-3xl"
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-lg">{error}</p>}
      </div>
      <BigButton text={buttonLabel || "BUSCAR CLIENTE"} className="mt-3" />
    </form>
  );
}
