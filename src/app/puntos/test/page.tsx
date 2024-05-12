"use client";

import useAuthStore from "@/lib/store/authStore";
import { log } from "console";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

export default function TestPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const login = useAuthStore((state) => state.login);
  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data.email, data.password);
      if (response) {
        console.log("Login successful");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <main className="flex justify-center min-h-[85vh] w-full m-auto relative">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <input type="text" placeholder="Email" {...register("email", { required: true })} />
        {errors.email && <span className="text-red-500">Este campo es requerido</span>}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span className="text-red-500">Este campo es requerido</span>}
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
