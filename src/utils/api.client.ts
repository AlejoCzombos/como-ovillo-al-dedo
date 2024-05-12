export const updateClient = async (
  clientId: number,
  token: string,
  clientBody: any
) => {
  const response = await fetch(
    `/api/clientes/${clientId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(clientBody),
    }
  );
  return response;
};

export const getClientComplete = async (clientId: number, token: string) => {
  const response = await fetch(`/api/clientes/${clientId}/completo`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export const getClients = async (token: string) => {
  const response = await fetch(`/api/clientes`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const createClient = async (token: string, clientBody: any) => {
  const response = await fetch(`/api/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(clientBody),
  });
  return response;
};
