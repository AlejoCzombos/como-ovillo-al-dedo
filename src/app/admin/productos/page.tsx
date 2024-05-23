import BigButton from "@/components/BigButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center min-h-[85vh] w-full m-auto relative">
      <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
        Administrar Productos
      </h2>
      <section className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-5 sm:px-0">
        <Link href="/admin/productos/crear" className="w-full">
          <BigButton text="CREAR PRODUCTO" />
        </Link>
        <Link href="/admin/productos/modificar" className="w-full">
          <BigButton text="MODIFICAR PRODUCTO" />
        </Link>
        <Link href="/admin/productos/eliminar" className="w-full">
          <BigButton text="ELIMINAR PRODUCTO" />
        </Link>
      </section>
    </main>
  );
}
