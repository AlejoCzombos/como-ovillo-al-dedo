"use client";

import BigButton from "@/components/BigButton";
import toast from "react-hot-toast";

export default function CrearCliente() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const firstname = form.firstname.value;
    const lastName = form.lastName.value;
    const DNI = form.DNI.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const city = form.city.value;
    const postcode = form.postcode.value;
    const password = form.password.value;

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

    const data = await fetch(`/api/clientes?password=${password}`, {
      method: "POST",
      body: JSON.stringify(clientData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.status === 201) {
      toast.success("Cliente creado", { id: toastPromise });
      form.reset();
    } else if (data.status === 401) {
      toast.error("Contraseña incorrecta", { id: toastPromise });
    } else {
      toast.error("Error al crear el cliente", { id: toastPromise });
    }
  };
  return (
    <main className="min-h-[85vh] w-full m-auto py-5">
      <h2 className="text-4xl text-center w-[80%] text-white font-semibold m-auto py-5">
        Crear Cliente
      </h2>
      <form
        className="flex flex-col justify-center gap-4 w-[80%] m-auto"
        onSubmit={handleSubmit}
      >
        <div className="w-full text-2xl">
          <label className="text-white" htmlFor="firstname">
            Nombre:
          </label>
          <input
            type="text"
            id="firstname"
            className="w-full p-2 bg-secondary-100 rounded-xl"
          />
        </div>
        <div className="w-full text-2xl">
          <label className="text-white" htmlFor="lastName">
            Apellido:
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full p-2 bg-secondary-100 rounded-xl"
          />
        </div>
        <div className="w-full text-2xl">
          <label className="text-white" htmlFor="DNI">
            DNI:
          </label>
          <input
            type="number"
            id="DNI"
            className="w-full p-2 bg-secondary-100 rounded-xl"
          />
        </div>
        <div className="w-full text-2xl">
          <label className="text-white" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 bg-secondary-100 rounded-xl"
          />
        </div>
        <div className="w-full text-2xl">
          <label className="text-white" htmlFor="phone">
            Teléfono:
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full p-2 bg-secondary-100 rounded-xl"
          />
        </div>
        <div className="w-full text-2xl">
          <label className="text-white" htmlFor="address">
            Dirección:
          </label>
          <input
            type="text"
            id="address"
            className="w-full p-2 bg-secondary-100 rounded-xl"
          />
        </div>
        <div className="w-full text-2xl">
          <label className="text-white" htmlFor="city">
            Ciudad:
          </label>
          <input
            type="text"
            id="city"
            className="w-full p-2 bg-secondary-100 rounded-xl"
          />
        </div>
        <div className="w-full text-2xl">
          <label className="text-white" htmlFor="postcode">
            Código Postal:
          </label>
          <input
            type="number"
            id="postcode"
            className="w-full p-2 bg-secondary-100 rounded-xl"
          />
        </div>
        <div className="w-full text-2xl">
          <label className="text-white" htmlFor="password">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 bg-secondary-300 border-white border-2 rounded-xl"
          />
        </div>
        <BigButton text="CREAR CLIENTE"></BigButton>
      </form>
    </main>
  );
}
