// app/page.tsx
import { Suspense } from 'react';
import { getEventosPublicados } from '@/services/eventos';
import EventosContainer from '@/components/EventosContainer';

// Componente asíncrono que consulta Supabase
async function ListaEventos() {
  const eventos = await getEventosPublicados();
  return <EventosContainer eventosIniciales={eventos} />;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header & Hero */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            Panoramas en la 5ª Región
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Eventos y actividades en la V Región.
          </h1>
          <p className="mt-2 text-slate-600 max-w-xl text-sm sm:text-base">
            Cartelera actualizada diariamente con conciertos, cultura, ferias y actividades en Viña, Valpo, Quilpué y alrededores.
          </p>
        </div>
      </header>

      {/* Contenido envuelto en Suspense */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="text-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em]"></div>
              <p className="mt-4 text-sm text-slate-500 font-medium">Cargando panoramas de la región...</p>
            </div>
          }
        >
          <ListaEventos />
        </Suspense>
      </main>
    </div>
  );
}