// components/EventoCard.tsx
import { Calendar, MapPin, Ticket, ExternalLink } from 'lucide-react';
import { Evento } from '@/types/evento';

interface Props {
  evento: Evento;
}

export default function EventoCard({ evento }: Props) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Contenedor de Imagen */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <img
          src={evento.imagen_url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'}
          alt={evento.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badge: Gratuito o Precio */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${
            evento.es_gratuito 
              ? 'bg-emerald-500 text-white' 
              : 'bg-white/95 text-slate-800 backdrop-blur-sm'
          }`}>
            {evento.es_gratuito ? 'Gratis' : (evento.precio || 'Con Entrada')}
          </span>
        </div>

        {/* Badge: Comuna */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-black/60 text-white backdrop-blur-sm">
            {evento.comuna}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            {evento.categoria}
          </span>
          
          <h3 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {evento.titulo}
          </h3>

          <p className="mt-2 text-sm text-slate-600 line-clamp-2">
            {evento.descripcion}
          </p>
        </div>

        {/* Metadatos (Fecha y Lugar) */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              {new Date(evento.fecha_inicio + 'T00:00:00').toLocaleDateString('es-CL', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
              {evento.hora ? ` • ${evento.hora} hrs` : ''}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{evento.lugar}</span>
          </div>
        </div>

        {/* Botón / Link de acción */}
        {evento.link_entradas && (
          <a
            href={evento.link_entradas}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <span>Ver más detalles</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}