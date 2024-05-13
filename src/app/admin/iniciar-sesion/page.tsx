"use client";

import BigButton from "@/components/BigButton";
import useAuthStore from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const onSubmit = async (data: FormData) => {
    try {
      const loginToast = toast.loading("Iniciando sesión...");
      const response = await login(data.email, data.password);
      if (response) {
        toast.success("Sesión iniciada", { id: loginToast });
        router.push("/admin");
      } else {
        toast.error("Correo o contraseña incorrectos", { id: loginToast });
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <main className="flex justify-center min-h-[85vh] w-full m-auto relative py-5">
      <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
        Iniciar sesión
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4 max-w-2xl w-[80%] m-auto mt-40"
      >
        <div className="w-full text-2xl">
          <label className="text-white" htmlFor="password">
            Correo electrónico:
          </label>
          <input
            className="w-full p-2 bg-secondary-100 rounded-xl"
            type="text"
            placeholder="correo@gmail.com"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500 text-lg">Este campo es requerido</span>}
        </div>
        <div className="w-full text-2xl">
          <label className="text-white" htmlFor="password">
            Contraseña:
          </label>
          <input
            className="w-full p-2 bg-secondary-100 rounded-xl"
            type="password"
            placeholder="•••••••••"
            {...register("password", { required: true })}
          />
          {errors.password && <span className="text-red-500 text-lg">Este campo es requerido</span>}
        </div>
        <BigButton text="INICIAR SESIÓN" className="mt-3" />
      </form>
    </main>
  );
}
