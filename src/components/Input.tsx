import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  password?: boolean;
  rules?: any;
  isDisabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  password = false,
  rules,
  isDisabled = false,
}) => {
  const { control } = useFormContext();

  return (
    <div className="w-full text-2xl">
      <label className="text-white" htmlFor={name}>
        {label}:
      </label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <input
              disabled={isDisabled}
              {...field}
              type={type}
              id={name}
              defaultValue={""}
              className={`w-full p-2 bg-secondary-100 rounded-xl ${
                password ? "bg-secondary-200 border-white border-2" : ""
              } ${fieldState.error ? "border-red-500" : ""}`}
            />
            {fieldState.error && (
              <span className="text-red-500 text-lg">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Input;
