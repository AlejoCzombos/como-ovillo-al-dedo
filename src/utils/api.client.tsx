export const updateClient = async (
  clientId: number,
  password: string,
  clientBody: any
) => {
  const response = await fetch(
    `/api/clientes/${clientId}?password=${password}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientBody),
    }
  );
  return response;
};

export const createClient = async (password: string, clientBody: any) => {
  const response = await fetch(`/api/clientes?password=${password}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clientBody }),
  });
  return response;
};
