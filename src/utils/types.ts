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

interface passwordForm{
  password: string;
}

interface ClientSearchForm{
  clientId: number;
  password: string;
}

interface UpdatePointsForm{
  amount: number;
  password: string;
}