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

interface Product {
  id: string;
  nombre: string;
  categoria: string;
  porcentajeDescuento: number;
  puntos: number;
  imagen: string;
}

type FormValuesCreateProduct = {
  name: string;
  pointsAmount: number;
  discountPercentage: number;
  category: string;
  image: FileList;
};

type FormValuesModifyProduct = {
  productId: string;
  name: string;
  pointsAmount: number;
  discountPercentage: number;
  category: string;
  image: FileList;
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

interface ProductSearchForm {
  productId: string;
}

interface UpdatePointsForm {
  amount: number;
  clientId: number;
}

interface clientData {
  currentPoints: number;
  name: string;
}
