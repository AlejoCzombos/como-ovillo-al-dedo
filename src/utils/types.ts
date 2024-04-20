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