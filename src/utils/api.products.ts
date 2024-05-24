export const getProductById = async (productId: string, token: string) => {
  const response = await fetch(`/api/productos/${productId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getAllProducts = async () => {
  const response = await fetch(`/api/productos`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getAllProductsServer = async () => {
  const response = await fetch(`https://como-ovillo-al-dedo.vercel.app/api/productos`, {
    next: {
      revalidate: 60 * 5,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const createProduct = async (productData: any, token: string) => {
  const response = await fetch(`/api/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  return response;
};

export const addImageToProduct = async (
  productId: string,
  image: File,
  token: string,
  update?: boolean
) => {
  const arrayBuffer = await image.arrayBuffer();
  const URL = update
    ? `/api/productos/${productId}/imagen?update=true`
    : `/api/productos/${productId}/imagen`;
  const response = await fetch(URL, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: arrayBuffer,
  });
  return response;
};

export const updateProduct = async (productId: string, productData: any, token: string) => {
  const response = await fetch(`/api/productos/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  return response;
};

export const deleteProduct = async (productId: string, token: string) => {
  const response = await fetch(`/api/productos/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
