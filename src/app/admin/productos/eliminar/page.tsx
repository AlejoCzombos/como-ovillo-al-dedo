"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "@/lib/store/authStore";
import ProductSearchForm from "@/components/ProductSearchForm";
import { deleteProduct, getProductById } from "@/utils/api.products";
import BigButton from "@/components/BigButton";
import { useRouter } from "next/navigation";

export default function EliminarProducto() {
  const [product, setProduct] = useState<Product>();
  const token = useAuthStore((state) => state.token) || "";
  const router = useRouter();

  const onSubmitFindProduct = async (formData: ProductSearchForm) => {
    const { productId } = formData;

    const toastPromise = toast.loading("Eliminando producto...");
    const response = await getProductById(productId, token);

    const data = await response.json();
    if (response.status === 200) {
      toast.dismiss(toastPromise);
      setProduct(data);
    } else {
      toast.error("Error al eliminar el producto", { id: toastPromise });
    }
  };

  const onSubmitDeleteProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productId = product?.id;
    if (!productId) {
      return;
    }

    const toastPromise = toast.loading("Eliminando producto...");
    const response = await deleteProduct(productId, token);

    if (response.status === 200) {
      toast.success("Producto eliminado", { id: toastPromise });
      router.push("/admin/productos");
      setProduct(undefined);
    } else {
      toast.error("Error al eliminar el producto", { id: toastPromise });
    }
  };

  return (
    <main className="flex justify-center min-h-[85vh] max-h-[85dvh] w-full min-w-full m-auto relative py-5">
      <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
        Eliminar Producto {product && " ?"}
      </h2>
      {!product && <ProductSearchForm onSubmit={onSubmitFindProduct} />}
      {product && (
        <form
          className="flex flex-col justify-center gap-4 max-w-2xl w-[80%] m-auto mt-40"
          onSubmit={onSubmitDeleteProduct}
        >
          <div className="w-full text-2xl flex gap-5 justify-center">
            <img
              src={product.imagen}
              alt="Producto"
              className="max-w-40 aspect-square object-cover"
            />
            <div className="flex flex-col justify-center text-white">
              <p className=" font-semibold">{product.nombre}</p>
              <p>{product.categoria}</p>
              <p>{product.porcentajeDescuento}% de descuento</p>
              <p>{product.puntos} puntos</p>
            </div>
          </div>
          <div className="flex gap-5 mt-3">
            <BigButton
              text="CANCELAR"
              onClick={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                router.push("/admin/productos");
                setProduct(undefined);
              }}
            />
            <BigButton
              text="ELIMINAR PRODUCTO"
              className="bg-red-400 text-white hover:bg-red-500"
            />
          </div>
        </form>
      )}
    </main>
  );
}
