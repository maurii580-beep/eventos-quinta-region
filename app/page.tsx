// app/page.tsx
import { getEventosPublicados } from '@/services/eventos';
import EventosContainer from '@/components/EventosContainer';

export default async function HomePage() {
  const eventos = await getEventosPublicados();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            Panoramas en la 5ª Región
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Qué hacer en Valparaíso y la Región?
          </h1>
          <p className="mt-2 text-slate-600 max-w-xl text-sm sm:text-base">
            Cartelera actualizada diariamente con conciertos, cultura, ferias y actividades en Viña, Valpo, Quilpué y alrededores.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <EventosContainer eventosIniciales={eventos} />
      </main>
    </div>
  );
}