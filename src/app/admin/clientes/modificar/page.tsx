"use client";

import BigButton from "@/components/BigButton";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { getClientComplete, updateClient } from "@/utils/api.client";
import { useRouter } from "next/navigation";
import ClientSearchForm from "@/components/ClientSearchForm";
import useAuthStore from "@/lib/store/authStore";

type FormValues = {
  clientId: number;
  points: number;
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

type FormValuesFindClient = {
  clientId: number;
  password: string;
};

export default function ModificarCliente() {
  const [client, setClient] = useState<Cliente>();
  const [password, setPassword] = useState<string>("");
  const methodsModifyClient = useForm<FormValues>();
  const token = useAuthStore((state) => state.token) || "";
  const { handleSubmit: handleSubmitModifyClient } = methodsModifyClient;

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
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
    const { clientId, password } = formData;
    setPassword(password);

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
    } else if (data.status === 404) {
      toast.error("El cliente no existe", { id: toastPromise });
    } else {
      toast.error("Error al buscar el cliente", { id: toastPromise });
    }
  };

  return (
    <main className="flex justify-center min-h-[85vh] w-full m-auto relative py-5">
      <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
        Modificar cliente
      </h2>
      {!client && <ClientSearchForm onSubmit={onSubmitFindCLient} />}
      {client && (
        <FormProvider {...methodsModifyClient}>
          <form
            className="flex flex-col justify-center gap-4 max-w-2xl w-[80%] m-auto mt-40"
            onSubmit={handleSubmitModifyClient(onSubmit)}
          >
            <div className="flex gap-5">
              <Input label="N° Cliente" name="clientId" type="number" isDisabled={true} />
              <Input label="Puntos" name="points" type="number" isDisabled={true} />
            </div>
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
              rules={{ required: "Este campo es requerido" }}
            />
            <Input label="Teléfono" name="phone" type="tel" />
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
                  message: "El código postal debe tener máximo 5 dígitos",
                },
              }}
            />
            <BigButton text="ACTUALIZAR CLIENTE" className="mt-3" />
          </form>
        </FormProvider>
      )}
    </main>
  );
}
