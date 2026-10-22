// components/Filtros.tsx
'use client';

import { Search, Grid, List, X } from 'lucide-react';

interface FiltrosProps {
  busqueda: string;
  setBusqueda: (val: string) => void;
  filtroFecha: string;
  setFiltroFecha: (val: string) => void;
  comunaSeleccionada: string;
  setComunaSeleccionada: (val: string) => void;
  soloGratis: boolean;
  setSoloGratis: (val: boolean) => void;
  vista: 'grid' | 'agenda';
  setVista: (val: 'grid' | 'agenda') => void;
  totalResultados: number;
  onLimpiar: () => void;
}

const COMUNAS = [
  'Todas',
  'Valparaíso',
  'Viña del Mar',
  'Quilpué',
  'Villa Alemana',
  'Concón',
  'Casablanca',
  'Quillota',
  'San Antonio'
];

export default function Filtros({
  busqueda,
  setBusqueda,
  filtroFecha,
  setFiltroFecha,
  comunaSeleccionada,
  setComunaSeleccionada,
  soloGratis,
  setSoloGratis,
  vista,
  setVista,
  totalResultados,
  onLimpiar
}: FiltrosProps) {
  const hayFiltrosActivos =
    busqueda.trim() !== '' ||
    filtroFecha !== 'Todos' ||
    comunaSeleccionada !== 'Todas' ||
    soloGratis;

  return (
    <div className="space-y-4 mb-8">
      {/* Barra superior: Buscador + Selector de Vista */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por artista, obra, lugar o evento..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Botones de alternancia de vista (Grid / Agenda) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-end sm:self-auto">
          <button
            onClick={() => setVista('grid')}
            title="Vista de cuadrícula"
            className={`p-2 rounded-lg text-xs font-medium transition-all ${
              vista === 'grid'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setVista('agenda')}
            title="Vista de lista / agenda"
            className={`p-2 rounded-lg text-xs font-medium transition-all ${
              vista === 'agenda'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filtros temporales y Gratuito */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {['Todos', 'Hoy', 'Fin de semana', 'Este mes'].map((opcion) => (
            <button
              key={opcion}
              onClick={() => setFiltroFecha(opcion)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filtroFecha === opcion
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {opcion}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {hayFiltrosActivos && (
            <button
              onClick={onLimpiar}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1"
            >
              Limpiar filtros
            </button>
          )}

          <button
            onClick={() => setSoloGratis(!soloGratis)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              soloGratis
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Solo gratuitos
          </button>
        </div>
      </div>

      {/* Píldoras de Comunas */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {COMUNAS.map((comuna) => (
          <button
            key={comuna}
            onClick={() => setComunaSeleccionada(comuna)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full font-medium transition-all ${
              comunaSeleccionada === comuna
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {comuna}
          </button>
        ))}
      </div>

      {/* Contador de resultados */}
      <div className="text-xs text-slate-500 font-medium pt-1">
        Mostrando <span className="text-slate-800 font-semibold">{totalResultados}</span> panoramas disponibles
      </div>
    </div>
  );
}