interface Localizacion {
  ciudad: string;
  codigo_postal: string;
  direccion: string;
  pais: string;
}

interface Cliente {
  DNI: string;
  apellido: string;
  celular: string;
  correo: string;
  id: number;
  localizacion: Localizacion;
  nombre: string;
  puntos: number;
}