import BigButton from "@/components/BigButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center min-h-[85vh] w-full m-auto">
      <section className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-5 sm:px-0">
        <Link href="/puntos/ver" className="w-full">
          <BigButton text="CONSULTAR PUNTOS" />
        </Link>
        <Link href="/productos" className="w-full">
          <BigButton text="VER PRODUCTOS" />
        </Link>
      </section>
    </main>
  );
}
