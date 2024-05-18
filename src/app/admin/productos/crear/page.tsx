"use client";

import BigButton from "@/components/BigButton";
import Input from "@/components/Input";
import toast from "react-hot-toast";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClient, getNextClientId } from "@/utils/api.client";
import { useEffect } from "react";
import useAuthStore from "@/lib/store/authStore";

export default function CrearProducto() {
  const methods = useForm<FormValuesCreateClient>();
  const { handleSubmit, reset } = methods;
  const token = useAuthStore((state) => state.token) || "";
  const router = useRouter();

  useEffect(() => {
    const newToast = toast.loading("Cargando próximo ID de cliente...");
    async function fetchNextId() {
      const response = await getNextClientId(token);
      const data = await response.json();
      reset({ ...data });
      toast.success("ID de cliente cargado", { id: newToast });
    }
    fetchNextId();
  }, []);

  const onSubmit: SubmitHandler<FormValuesCreateClient> = async (data) => {
    const { firstname, lastName, DNI, email, phone, address, city, postcode } = data;

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
    const response = await createClient(token, clientData);

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
      <main className="flex justify-center min-h-[85vh] w-full m-auto relative py-5">
        <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
          Crear Cliente
        </h2>
        <form
          className="flex flex-col justify-center gap-4 max-w-2xl w-[80%] m-auto mt-40"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input label="Próximo N° Cliente" name="nextId" type="number" isDisabled={true} />
          <Input label="Nombre" name="firstname" rules={{ required: "Este campo es requerido" }} />
          <Input label="Apellido" name="lastName" rules={{ required: "Este campo es requerido" }} />
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
          <BigButton text="CREAR CLIENTE" className="mt-3" />
        </form>
      </main>
    </FormProvider>
  );
}
