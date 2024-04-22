"use client";

import BigButton from "@/components/BigButton";
import Input from "@/components/Input";
import toast from "react-hot-toast";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { createClient } from "@/utils/api.client";

type FormValues = {
  firstname: string;
  lastName: string;
  DNI: number;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: number;
  password: string;
};

export default function CrearCliente() {
  const methods = useForm<FormValues>();
  const { handleSubmit, reset } = methods;
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);

    const {
      firstname,
      lastName,
      DNI,
      email,
      phone,
      address,
      city,
      postcode,
      password,
    } = data;

    const clientData = {
      nombre: firstname,
      apellido: lastName,
      DNI: DNI,
      correo: email,
      telefono: phone,
      localizacion: {
        direccion: address,
        ciudad: city,
        codigoPostal: postcode,
      },
    };

    const toastPromise = toast.loading("Creando cliente...");

    const response = await createClient(password, clientData);

    if (response.status === 201) {
      toast.success("Cliente creado", { id: toastPromise });
      router.push("/admin/clientes");
    } else if (response.status === 401) {
      toast.error("Contraseña incorrecta", { id: toastPromise });
    } else {
      toast.error("Error al crear el cliente", { id: toastPromise });
    }
  };
  return (
    <FormProvider {...methods}>
      <main className="min-h-[85vh] w-full m-auto py-5">
        <h2 className="text-4xl text-center w-[80%] text-white font-semibold m-auto py-5">
          Crear Cliente
        </h2>
        <form
          className="flex flex-col justify-center gap-4 w-[80%] m-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Nombre"
            name="firstname"
            rules={{ required: "Este campo es requerido" }}
          />
          <Input
            label="Apellido"
            name="lastName"
            rules={{ required: "Este campo es requerido" }}
          />
          <Input
            label="DNI"
            name="DNI"
            type="number"
            rules={{
              required: "Este campo es requerido",
              minLength: {
                value: 7,
                message: "El DNI debe tener al menos 7 dígitos",
              },
              maxLength: {
                value: 8,
                message: "El DNI debe tener como máximo 8 dígitos",
              },
            }}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            rules={{
              required: "Este campo es requerido",
              pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
            }}
          />
          <Input label="Teléfono" name="phone" type="number" />
          <Input label="Dirección" name="address" />
          <Input label="Ciudad" name="city" />
          <Input
            label="Código Postal"
            name="postcode"
            type="number"
            rules={{
              required: "Este campo es requerido",
              minLength: {
                value: 4,
                message: "El código postal debe tener al menos 4 dígitos",
              },
              maxLength: {
                value: 5,
                message: "El código postal debe tener exactamente 5 dígitos",
              },
            }}
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            password
            rules={{ required: "Este campo es requerido" }}
          />
          <BigButton text="CREAR CLIENTE" />
        </form>
      </main>
    </FormProvider>
  );
}
