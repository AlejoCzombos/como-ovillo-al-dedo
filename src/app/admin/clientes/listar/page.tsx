"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "@/lib/store/authStore";
import { getAllClients } from "@/utils/api.clients";

export default function ListarClientes() {
  const [clients, setClients] = useState<Cliente[]>();
  const [searchValue, setSearchValue] = useState<string>("");
  const token = useAuthStore((state) => state.token) || "";

  useEffect(() => {
    const fetchClients = async () => {
      const toastPromise = toast.loading("Obteniendo clientes...");
      const response = await getAllClients(token);
      if (response.status === 200) {
        toast.success("Clientes obtenidos correctamente", { id: toastPromise });
        const data = await response.json();
        setClients(data);
      } else {
        toast.error("Error al obtener los clientes", { id: toastPromise });
      }
    };
    fetchClients();
  }, []);

  return (
    <main className="flex justify-center min-h-[85vh] max-h-[85dvh] w-full min-w-full m-auto relative py-5">
      <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
        Lista de clientes
      </h2>
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
          <div className="max-h-[calc(100vh-100px)] overflow-y-auto ">
            <table className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
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
                      client.nombre?.toLowerCase().includes(searchValue.toLowerCase()) ||
                      client.apellido?.toLowerCase().includes(searchValue.toLowerCase()) ||
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
