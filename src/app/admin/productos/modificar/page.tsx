"use client";

import BigButton from "@/components/BigButton";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { getClientComplete, updateClient } from "@/utils/api.clients";
import { useRouter } from "next/navigation";
import ClientSearchForm from "@/components/ClientSearchForm";
import useAuthStore from "@/lib/store/authStore";

export default function ModificarCliente() {
  const [client, setClient] = useState<Cliente>();
  const methodsModifyClient = useForm<FormValuesModifyClient>();
  const token = useAuthStore((state) => state.token) || "";
  const { handleSubmit: handleSubmitModifyClient } = methodsModifyClient;

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValuesModifyClient> = async (data) => {
    const { firstname, lastName, DNI, email, phone, address, city, postcode, clientId } = data;

    const clientBody = {
      nombre: firstname,
      apellido: lastName,
      DNI,
      correo: email,
      celular: phone,
      localizacion: {
        direccion: address,
        ciudad: city,
        codigo_postal: postcode,
      },
    };

    const toastPromise = toast.loading("Modificando cliente...");
    const response = await updateClient(clientId, token, clientBody);

    if (response.status === 200) {
      toast.success("Cliente modificado", { id: toastPromise });
      setClient(undefined);
      router.push("/admin/clientes");
    } else if (response.status === 401) {
      toast.error("Contraseña incorrecta", { id: toastPromise });
    } else if (response.status === 404) {
      toast.error("El cliente no existe", { id: toastPromise });
    } else {
      toast.error("Error al modificar el cliente", { id: toastPromise });
    }
  };

  useEffect(() => {
    if (client) {
      const {
        id: clientId,
        puntos: points,
        nombre: firstname,
        apellido: lastName,
        DNI,
        correo: email,
        celular: phone,
        localizacion: { direccion: address, ciudad: city, codigo_postal: postcode },
      } = client;
      methodsModifyClient.reset({
        clientId,
        points,
        firstname,
        lastName,
        DNI,
        email,
        phone,
        address,
        city,
        postcode,
      });
    }
  }, [client]);

  const onSubmitFindCLient = async (formData: ClientSearchForm) => {
    const { clientId } = formData;

    const toastPromise = toast.loading("Buscando cliente...");
    const data = await getClientComplete(clientId, token);

    const response = await data.json();
    if (data.status === 200) {
      toast.success(`Cliente encontrado`, {
        id: toastPromise,
      });
      setClient(response);
    } else if (data.status === 401) {
      toast.error("Contraseña incorrecta", { id: toastPromise });
    } else if (data.status === 403) {
      toast.error("No tienes permisos para realizar esta acción", { id: toastPromise });
    } else if (data.status === 404) {
      toast.error("El cliente no existe", { id: toastPromise });
    } else {
      toast.error("Error al buscar el cliente", { id: toastPromise });
    }
  };

  return (
    <FormProvider {...methods}>
      <main className="flex justify-center min-h-[85vh] w-full m-auto relative py-5">
        <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
          Crear Producto
        </h2>
        <form
          className="flex flex-col justify-center gap-4 max-w-2xl w-[80%] m-auto mt-40"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input label="Nombre" name="name" rules={{ required: "El nombre es requerido" }} />
          <Input
            label="Categoria"
            name="category"
            rules={{ required: "La categoría es requerido" }}
          />
          <Input
            label="Porcentaje de descuento"
            name="discountPercentage"
            type="number"
            rules={{ required: "El porcentaje de descuento es requerido" }}
          />
          <Input
            label="Puntos"
            name="pointsAmount"
            type="number"
            rules={{ required: "Los puntos son requeridos" }}
          />
          <Input
            label="Imagen"
            name="image"
            type="file"
            rules={{ required: "La imagen es requerida" }}
          />
          <BigButton text="CREAR PRODUCTO" className="mt-3" />
        </form>
      </main>
    </FormProvider>
  );
}
