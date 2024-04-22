import React, { useState } from "react";
import BigButton from "./BigButton";

export default function PasswordForm({
  onSubmit,
  buttonLabel,
}: {
  onSubmit: (formData: passwordForm) => void;
  buttonLabel?: string;
}) {
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password) {
      setError("Por favor ingresa la contraseña");
      return;
    }
    const response = {
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
        <label className="text-white" htmlFor="password">
          Contraseña:
        </label>
        <input
          name="password"
          type="password"
          placeholder="•••••••••"
          value={password || ""}
          className="w-full p-2 bg-secondary-100 rounded-xl"
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-lg">{error}</p>}
      </div>
      <BigButton text={buttonLabel || "BUSCAR CLIENTES"} className="mt-3" />
    </form>
  );
}
