"use client";

import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
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

    const onSubmit = async (data: FormData) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            console.log("Usuario logueado:", userCredential.user);
            // Redirigir a la página de inicio después de iniciar sesión
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
