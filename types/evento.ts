// types/evento.ts
export interface Evento {
  id: string;
  slug: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  comuna: string;
  lugar: string;
  direccion?: string;
  fecha_inicio: string; // Formato YYYY-MM-DD
  hora?: string;
  es_gratuito: boolean;
  precio?: string;
  link_entradas?: string;
  imagen_url?: string;
}