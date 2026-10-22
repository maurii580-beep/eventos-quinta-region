// services/eventos.ts
import { supabase } from '@/lib/supabaseClient';
import { Evento } from '@/types/evento';

export async function getEventosPublicados(): Promise<Evento[]> {
  // Traemos los eventos publicados ordenados cronológicamente desde hoy en adelante
  const hoy = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('publicado', true)
    .gte('fecha_inicio', hoy)
    .order('fecha_inicio', { ascending: true });

  if (error) {
    console.error('Error al obtener eventos desde Supabase:', error.message);
    return [];
  }

  return data as Evento[];
}