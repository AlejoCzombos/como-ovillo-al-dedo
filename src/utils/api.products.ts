export const getProductById = async (token: string) => {
  const response = await fetch(`/api/productos`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getAllProducts = async (token: string) => {
  const response = await fetch(`/api/productos`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const createProduct = async (token: string, productData: any) => {
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

export const addImageToProduct = async (productId: string, token: string, image: File) => {
  const arrayBuffer = await image.arrayBuffer();
  const response = await fetch(`/api/productos/${productId}/imagen`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: arrayBuffer,
  });
  return response;
};

export const updateProduct = async (productId: number, token: string, productData: any) => {
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

export const deleteProduct = async (productId: number, token: string) => {
  const response = await fetch(`/api/productos/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
