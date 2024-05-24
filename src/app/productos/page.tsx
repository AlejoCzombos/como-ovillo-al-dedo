import { getAllProductsServer } from "@/utils/api.products";

export default async function Home() {
  const response = await getAllProductsServer();
  const products: Product[] = await response.json();

  function mapCategory(category: string) {
    switch (category) {
      case "puntosyDinero":
        return "Puntos + Dinero";
      case "canjeDirecto":
        return "Canje Directo";
      default:
        return "Otro";
    }
  }

  if (Array.isArray(products)) {
    return (
      <main className="flex justify-center min-h-[85vh] w-full m-auto">
        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
            >
              <img
                src={product.imagen}
                alt="Producto"
                className="object-cover w-full aspect-square rounded-xl"
              />
              <footer className="pt-6 flex flex-col gap-1 relative">
                <span className="py-1 px-6 bg-primary-400 absolute -top-5 -left-3 text-white font-bold uppercase">
                  {mapCategory(product.categoria)}
                </span>
                <div className="flex items-center justify-around w-full min-h-full border-b-2 border-tertiary-400 mb-1 pb-2">
                  <div className="flex flex-col items-center">
                    <p className="text-primary-400 text-2xl">{product.puntos}</p>
                    <p className="text-sm">puntos</p>
                  </div>
                  {product.categoria === "puntosyDinero" && (
                    <>
                      <p className="text-4xl">+</p>
                      <div className="flex flex-col items-center">
                        <p className="text-primary-400 text-2xl">{product.porcentajeDescuento}</p>
                        <p className="text-sm">% OFF</p>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <p className="text-xl uppercase text-center font-semibold">{product.nombre}</p>
                </div>
              </footer>
            </article>
          ))}
        </section>
      </main>
    );
  }
}
