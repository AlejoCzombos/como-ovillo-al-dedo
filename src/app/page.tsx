import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center min-h-full h-screen w-full m-auto">
      <section className="flex flex-col items-center justify-center gap-8 w-full max-w-md">
        <Link href="/puntos/cargar" className="w-full">
          <button className="bg-tertiary-200 text-secondary-500 py-4 text-3xl w-full font-semibold drop-shadow-lg rounded-3xl hover:bg-tertiary-100 transition-colors ease-in-out">
            CARGAR PUNTOS
          </button>
        </Link>
        <Link href="/puntos/ver" className="w-full">
          <button className="bg-tertiary-200 text-secondary-500 py-4 text-3xl w-full font-semibold drop-shadow-lg rounded-3xl hover:bg-tertiary-100 transition-colors ease-in-out">
            VER PUNTOS
          </button>
        </Link>
        <Link href="/puntos/canjear" className="w-full">
          <button className="bg-tertiary-200 text-secondary-500 py-4 text-3xl w-full font-semibold drop-shadow-lg rounded-3xl hover:bg-tertiary-100 transition-colors ease-in-out">
            CANJEAR PUNTOS
          </button>
        </Link>
      </section>
    </main>
  );
}
