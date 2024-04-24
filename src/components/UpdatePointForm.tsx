import React, { useState } from "react";
import BigButton from "./BigButton";
import DollarIcon from "./Icons";
import { QuantityIcon } from "@/components/Icons";

interface PointsUploadFormProps {
  onSubmit: (formData: UpdatePointsForm) => void;
  labelTitule: string;
  labelPlaceholder?: string;
  buttonLabel: string;
  isCash: boolean;
}

export default function UpdatePointsForm({
  onSubmit,
  labelTitule,
  labelPlaceholder,
  buttonLabel,
  isCash,
}: PointsUploadFormProps) {
  const [amount, setAmount] = useState<number>();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount || !password) {
      setError("Por favor completa todos los campos");
      return;
    }
    const response = {
      amount,
      password,
    };
    onSubmit(response);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-2 w-full max-w-md px-5 sm:px-0"
    >
      <div className="w-full text-2xl">
        <label className="text-white" htmlFor="amount">
          {labelTitule}:
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
            {isCash ? (
              <DollarIcon className="size-7 stroke-secondary-700" />
            ) : (
              <QuantityIcon className="size-7 fill-secondary-700" />
            )}
          </div>
          <input
            type="number"
            id="amount"
            placeholder={labelPlaceholder}
            value={amount}
            onChange={handleChangeAmount}
            className="w-full p-2 bg-secondary-100 rounded-xl ps-11"
          />
        </div>
      </div>
      <div className="w-full text-2xl mb-4">
        <label className="text-white" htmlFor="password">
          Contraseña:
        </label>
        <input
          type="password"
          id="password"
          placeholder="•••••••••"
          value={password}
          onChange={handleChangePassword}
          className="w-full p-1 px-2 bg-secondary-100 border-secondary-300 border-2 rounded-xl text-3xl"
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <BigButton text={buttonLabel} />
    </form>
  );
}
