import BigButton from "@/components/BigButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center min-h-[85vh] w-full m-auto">
      <section className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-5 sm:px-0">
        <Link href="/admin/cargar-puntos" className="w-full">
          <BigButton text="CARGAR PUNTOS" />
        </Link>
        <Link href="/admin/canjear-puntos" className="w-full">
          <BigButton text="CANJEAR PUNTOS" />
        </Link>
        <Link href="/admin/crear-cliente" className="w-full">
          <BigButton text="CREAR CLIENTE" />
        </Link>
      </section>
    </main>
  );
}
