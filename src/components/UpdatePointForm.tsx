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
  const [clientId, setClientId] = useState<number>();
  const [error, setError] = useState<string>("");

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const handleChangeClientId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientId(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount || !clientId) {
      setError("Por favor completa todos los campos");
      return;
    }
    const response = {
      amount,
      clientId,
    };
    onSubmit(response);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-2 w-full max-w-md px-5 sm:px-0"
    >
      <div className="w-full text-2xl">
        <label className="text-white" htmlFor="clientId">
          N° Cliente:
        </label>
        <input
          name="clientId"
          type="number"
          placeholder="14"
          value={clientId}
          className="w-full p-2 bg-secondary-100 rounded-xl"
          onChange={handleChangeClientId}
        />
        {error && <p className="text-red-500 text-lg">{error}</p>}
      </div>
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
      <BigButton text={buttonLabel} className="mt-5" />
    </form>
  );
}
