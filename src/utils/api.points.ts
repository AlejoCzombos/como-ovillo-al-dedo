export const redeemPoints = async (clientId: number, amount: number, token: string) => {
  const response = await fetch(`/api/clientes/puntos/canjear`, {
    method: "POST",
    body: JSON.stringify({ puntos: amount, cliente_id: clientId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const chargePoints = async (clientId: number, amount: number, token: string) => {
  const response = await fetch(`/api/clientes/puntos/cargar`, {
    method: "POST",
    body: JSON.stringify({ monto: amount, cliente_id: clientId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
