// services/eventos.ts
import { connection } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { Evento } from '@/types/evento';

export async function getEventosPublicados(): Promise<Evento[]> {
  // Le indica a Next.js (Cache Components) que este llamado corre en tiempo de petición
  await connection();

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

  return (data as Evento[]) || [];
}