"use client";

import BigButton from "@/components/BigButton";
import Input from "@/components/Input";
import toast from "react-hot-toast";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import useAuthStore from "@/lib/store/authStore";
import { addImageToProduct, createProduct } from "@/utils/api.products";

export default function CrearProducto() {
  const methods = useForm<FormValuesCreateProduct>();
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = methods;
  const token = useAuthStore((state) => state.token) || "";
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValuesCreateProduct> = async (data) => {
    const { name, category, discountPercentage, pointsAmount } = data;

    const image = methods.getValues("image")[0] as File;

    const productBody = {
      nombre: name,
      categoria: category,
      porcentajeDescuento: discountPercentage,
      puntos: pointsAmount,
    };

    const toastPromise = toast.loading("Creando producto...");
    const responseCreate = await createProduct(productBody, token);

    console.log("Response:", responseCreate);

    if (responseCreate.status === 201) {
      const productData = await responseCreate.json();
      const responseImage = await addImageToProduct(productData.id, image, token);

      console.log("Response Image:", responseImage);

      if (responseImage.status === 200) {
        toast.success("Producto creado", { id: toastPromise });
        router.push("/admin/productos");
      } else {
        toast.error("Error al asignar la imagen", { id: toastPromise });
      }
    } else if (responseCreate.status === 401) {
      toast.error("Contraseña incorrecta", { id: toastPromise });
    } else {
      toast.error("Error al crear el producto", { id: toastPromise });
    }
  };
  return (
    <FormProvider {...methods}>
      <main className="flex justify-center min-h-[85vh] w-full m-auto relative py-5">
        <h2 className="text-4xl text-center w-[80%] text-white font-semibold absolute top-20 left-1/2 transform -translate-x-1/2">
          Crear Producto
        </h2>
        <form
          className="flex flex-col justify-center gap-4 max-w-2xl w-[80%] m-auto mt-40"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input label="Nombre" name="name" rules={{ required: "El nombre es requerido" }} />
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
            rules={{ required: "Los puntos son requeridos" }}
          />
          <div className="w-full text-2xl">
            <label className="text-white" htmlFor="image">
              Imagen:
            </label>
            <input
              className="w-full p-2 bg-secondary-100 rounded-xl"
              type="file"
              accept="image/*"
              {...methods.register("image", {
                required: "La imagen es requerida",
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
          <BigButton text="CREAR PRODUCTO" className="mt-3" />
        </form>
      </main>
    </FormProvider>
  );
}
