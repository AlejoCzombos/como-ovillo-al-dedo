"use client";

import React, { useEffect, useState } from "react";
import BigButton from "./BigButton";
import { getAllProducts } from "@/utils/api.products";
import useAuthStore from "@/lib/store/authStore";
import toast from "react-hot-toast";

export default function ProductSearchForm({
  onSubmit,
  buttonLabel,
}: {
  onSubmit: (formData: ProductSearchForm) => void;
  buttonLabel?: string;
}) {
  const [productId, setProductId] = useState<string>();
  const [error, setError] = useState<string>("");
  const [products, setProducts] = useState<Product[]>();
  const token = useAuthStore((state) => state.token) || "";

  useEffect(() => {
    async function fetchProducts() {
      const loadingToast = toast.loading("Cargando productos...");
      const response = await getAllProducts(token);
      if (response.status === 200) {
        toast.dismiss(loadingToast);
        const data = await response.json();
        setProducts(data);
      } else {
        toast.error("Error al cargar los productos", { id: loadingToast });
      }
    }
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setProductId(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productId) {
      setError("Seleccione un producto");
      return;
    }
    const response = {
      productId: productId,
    };
    onSubmit(response);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-3 w-full max-w-md px-5 sm:px-0"
    >
      <div className="w-full text-2xl">
        <label className="text-white" htmlFor="clientId">
          Producto:
        </label>
        <select
          className="w-full p-2 bg-secondary-100 rounded-xl"
          name="productId"
          value={productId || ""}
          onChange={handleChange}
        >
          <option disabled value="">
            Seleccione un producto
          </option>
          {products?.map((product) => (
            <option key={product.id} value={product.id}>
              {product.nombre}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-lg">{error}</p>}
      </div>
      <BigButton text={buttonLabel || "BUSCAR PRODUCTO"} className="mt-3" />
    </form>
  );
}
