"use client";

import BigButton from "@/components/BigButton";
import Input from "@/components/Input";
import { useState } from "react";
import toast from "react-hot-toast";
import PasswordForm from "@/components/PasswordForm";

export default function ListarClientes() {
  const [clients, setClients] = useState<Cliente[]>();
  const [searchValue, setSearchValue] = useState<string>("");

  const onSubmit = async (formData: passwordForm) => {
    const { password } = formData;

    const toastPromise = toast.loading("Buscando clientes...");
    const data = await fetch(`/api/clientes?password=${password}`);

    const response = await data.json();
    if (data.status === 200) {
      toast.success(`Clientes encontrados`, {
        id: toastPromise,
      });
      setClients(response);
    } else if (data.status === 401) {
      toast.error("Contraseña incorrecta", { id: toastPromise });
    } else if (data.status === 404) {
      toast.error("El cliente no existe", { id: toastPromise });
    } else {
      toast.error("Error al buscar el cliente", { id: toastPromise });
    }
  };

  return (
    <main className="flex justify-center min-h-[85vh] max-h-[85dvh] w-full m-auto relative py-5">
      <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
        Lista de clientes
      </h2>
      {!clients && <PasswordForm onSubmit={onSubmit} />}
      {clients && (
        <section className="mt-40">
          <div className="w-full text-xl flex justify-center items-center gap-2 py-2">
            <label className="text-white" htmlFor="searchValue">
              Buscar:
            </label>
            <input
              type="text"
              id="searchValue"
              className="w-full px-2 py-1 bg-secondary-100 rounded-xl"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className=" max-h-[calc(100vh-100px)] overflow-y-auto">
            <table className="w-full max-w-4xl mx-auto bg-white  rounded-lg shadow-md overflow-hidden">
              <thead className="bg-secondary-500 text-white">
                <tr>
                  <th className="px-4 py-3">N° Cliente</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Apellido</th>
                  <th className="px-4 py-3 text-end">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {clients
                  .filter(
                    (client) =>
                      (client.nombre
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                        client.apellido
                          ?.toLowerCase()
                          .includes(searchValue.toLowerCase())) &&
                      client.id.toString().startsWith(searchValue)
                  )
                  .map((client) => (
                    <tr key={client.id}>
                      <td className="px-4 py-3 font-semibold">{client.id}</td>
                      <td className="px-4 py-3">{client.nombre}</td>
                      <td className="px-4 py-3">{client.apellido}</td>
                      <td className="px-4 py-3 text-end">{client.puntos}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}
