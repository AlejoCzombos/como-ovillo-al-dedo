"use client";

import BigButton from "@/components/BigButton";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import useAuthStore from "@/lib/store/authStore";
import ProductSearchForm from "@/components/ProductSearchForm";
import { addImageToProduct, getProductById, updateProduct } from "@/utils/api.products";

export default function ModificarProducto() {
  const [product, setProduct] = useState<Product>();
  const methodsModifyProduct = useForm<FormValuesModifyProduct>();
  const token = useAuthStore((state) => state.token) || "";
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = methodsModifyProduct;

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValuesModifyProduct> = async (data) => {
    const { name, category, discountPercentage, pointsAmount } = data;
    const image = methodsModifyProduct.getValues("image")[0] as File;

    const productId = product?.id;
    if (!productId) {
      return;
    }

    const productBody = {
      nombre: name,
      categoria: category,
      porcentajaDescuento: discountPercentage,
      puntos: pointsAmount,
    };

    if (
      name === product.nombre &&
      category === product.categoria &&
      discountPercentage === product.porcentajeDescuento &&
      pointsAmount === product.puntos &&
      !image
    ) {
      toast.error("No se han realizado cambios");
      return;
    }
    const toastPromise = toast.loading("Modificando producto...");

    //Si se agregó otra imagen se actualiza
    if (image) {
      const responseImage = await addImageToProduct(productId, image, token, true);

      if (responseImage.status !== 200) {
        toast.error("Error al asignar la imagen", { id: toastPromise });
        return;
      }
      toast.success("Producto modificado", { id: toastPromise });
    }

    //Si se modificó algún campo se actualiza
    if (
      name !== product.nombre ||
      category !== product.categoria ||
      discountPercentage !== product.porcentajeDescuento ||
      pointsAmount !== product.puntos
    ) {
      const response = await updateProduct(productId, productBody, token);

      if (response.status !== 200) {
        toast.error("Error al modificar el producto", { id: toastPromise });
        return;
      }
      toast.success("Producto modificado", { id: toastPromise });
    }
    router.push("/admin/productos");
  };

  useEffect(() => {
    if (product) {
      const {
        nombre: name,
        categoria: category,
        porcentajeDescuento: discountPercentage,
        puntos: pointsAmount,
      } = product;

      methodsModifyProduct.reset({
        name,
        category,
        discountPercentage,
        pointsAmount,
      });
    }
  }, [product]);

  const onSubmitFindProduct = async (formData: ProductSearchForm) => {
    const { productId } = formData;

    const toastPromise = toast.loading("Buscando producto...");
    const data = await getProductById(productId, token);

    const response = await data.json();

    if (data.status === 200) {
      toast.dismiss(toastPromise);
      setProduct(response);
    } else if (data.status === 401) {
      toast.error("Contraseña incorrecta", { id: toastPromise });
    } else if (data.status === 403) {
      toast.error("No tienes permisos para realizar esta acción", { id: toastPromise });
    } else if (data.status === 404) {
      toast.error("El producto no existe", { id: toastPromise });
    } else {
      toast.error("Error al buscar el producto", { id: toastPromise });
    }
  };

  return (
    <main className="flex justify-center min-h-[85vh] w-full m-auto relative py-5">
      <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
        Crear Producto
      </h2>
      {!product && <ProductSearchForm onSubmit={onSubmitFindProduct} />}
      {product && (
        <FormProvider {...methodsModifyProduct}>
          <form
            className="flex flex-col justify-center gap-4 max-w-2xl w-[80%] m-auto mt-40"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input label="Nombre" name="name" rules={{ required: "Este campo es requerido" }} />
            <div className="w-full text-2xl">
              <label className="text-white" htmlFor="clientId">
                Categoría:
              </label>
              <select
                className="w-full p-2 bg-secondary-100 rounded-xl"
                {...register("category", { required: "La categoría es requerida" })}
              >
                <option disabled value="">
                  Seleccione un producto
                </option>
                <option value="canjeDirecto">Canje directo</option>
                <option value="puntosyDinero">Puntos + dinero</option>
              </select>
              {errors.category && <p className="text-red-500 text-lg">{errors.category.message}</p>}
            </div>
            {watch("category") === "puntosyDinero" && (
              <Input
                label="Porcentaje de descuento"
                name="discountPercentage"
                type="number"
                rules={{ required: "El porcentaje de descuento es requerido" }}
              />
            )}
            <Input
              label="Puntos"
              name="pointsAmount"
              type="number"
              rules={{ required: "Este campo es requerido" }}
            />
            <div className="w-full text-2xl">
              <label className="text-white" htmlFor="image">
                Imagen:
              </label>
              <input
                className="w-full p-2 bg-secondary-100 rounded-xl"
                type="file"
                accept="image/*"
                {...methodsModifyProduct.register("image", {
                  validate: (value) => {
                    if (value) {
                      // const acceptedFormats = ["image/*"];
                      // if (!acceptedFormats.includes(value[0].type)) {
                      //   return "Formato de imagen no válido";
                      // }
                      // if (value[0].size > 1000000) {
                      //   return "La imagen debe ser menor a 1MB";
                      // }
                    }
                    return true;
                  },
                })}
              />
              {errors.image && <span className="text-red-500 text-lg">{errors.image.message}</span>}
            </div>
            <div className="w-full text-2xl">
              <label className="text-white" htmlFor="image">
                Imagen actual:
              </label>
              <img
                src={product.imagen}
                alt="Producto"
                className="aspect-square object-cover w-full max-w-sm md:max-w-lg m-auto"
              />
            </div>
            <BigButton text="ACTUALIZAR PRODUCTO" className="mt-3" />
          </form>
        </FormProvider>
      )}
    </main>
  );
}
