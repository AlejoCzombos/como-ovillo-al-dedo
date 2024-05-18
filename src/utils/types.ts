interface Localizacion {
  ciudad: string;
  codigo_postal: number;
  direccion: string;
  pais: string;
}

interface Cliente {
  DNI: number;
  apellido: string;
  celular: string;
  correo: string;
  id: number;
  localizacion: Localizacion;
  nombre: string;
  puntos: number;
}

type FormValuesCreateProduct = {
  name: string;
  pointsAmount: number;
  discountPercentage: number;
  category: string;
  image: string;
};

type FormValuesCreateClient = {
  firstname: string;
  lastName: string;
  DNI: number;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: number;
};

type FormValuesModifyClient = {
  clientId: number;
  points: number;
  firstname: string;
  lastName: string;
  DNI: number;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: number;
};

interface ClientSearchForm {
  clientId: number;
}

interface UpdatePointsForm {
  amount: number;
  clientId: number;
}

interface clientData {
  currentPoints: number;
  name: string;
}
