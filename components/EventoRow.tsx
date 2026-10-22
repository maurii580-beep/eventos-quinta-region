// components/EventoRow.tsx
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Evento } from '@/types/evento';

export default function EventoRow({ evento }: { evento: Evento }) {
  return (
    <article className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm hover:shadow transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
          <img
            src={evento.imagen_url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80'}
            alt={evento.titulo}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs mb-1">
            <span className="font-semibold text-indigo-600 uppercase tracking-wide">
              {evento.categoria}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium">{evento.comuna}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-base truncate">
            {evento.titulo}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(evento.fecha_inicio + 'T00:00:00').toLocaleDateString('es-CL', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
              })}
              {evento.hora ? ` • ${evento.hora} hrs` : ''}
            </span>
            <span className="inline-flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {evento.lugar}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            evento.es_gratuito
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-slate-100 text-slate-700'
          }`}
        >
          {evento.es_gratuito ? 'Gratis' : (evento.precio || 'Entrada')}
        </span>

        {evento.link_entradas && (
          <a
            href={evento.link_entradas}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-indigo-600 transition-colors"
          >
            <span>Ver más</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </article>
  );
}