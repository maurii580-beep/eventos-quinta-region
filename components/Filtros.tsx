// components/Filtros.tsx
'use client';

import { 
  Search, Grid, List, X, ChevronDown,
  Clapperboard, Music, Palette, Mic, Utensils, Trophy, Sparkles
} from 'lucide-react';

interface FiltrosProps {
  busqueda: string;
  setBusqueda: (val: string) => void;
  filtroFecha: string;
  setFiltroFecha: (val: string) => void;
  comunaSeleccionada: string;
  setComunaSeleccionada: (val: string) => void;
  soloGratis: boolean;
  setSoloGratis: (val: boolean) => void;
  categoriaSeleccionada: string;
  setCategoriaSeleccionada: (val: string) => void;
  vista: 'grid' | 'agenda';
  setVista: (val: 'grid' | 'agenda') => void;
  totalResultados: number;
  onLimpiar: () => void;
}

const COMUNAS = [
  'Todas las comunas',
  'Valparaíso',
  'Viña del Mar',
  'Quilpué',
  'Villa Alemana',
  'Concón',
  'Casablanca',
  'Quillota',
  'San Antonio'
];

const CATEGORIAS = [
  { id: 'Todas', label: 'Todas', icon: Sparkles, colores: 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200' },
  { id: 'Cine', label: 'Cine', icon: Clapperboard, colores: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' },
  { id: 'Música', label: 'Música', icon: Music, colores: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
  { id: 'Teatro', label: 'Teatro', icon: Palette, colores: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
  { id: 'Comedia', label: 'Comedia', icon: Mic, colores: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100' },
  { id: 'Gastronomía', label: 'Gastronomía', icon: Utensils, colores: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
  { id: 'Deporte', label: 'Deporte', icon: Trophy, colores: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
];

export default function Filtros({
  busqueda, setBusqueda,
  filtroFecha, setFiltroFecha,
  comunaSeleccionada, setComunaSeleccionada,
  soloGratis, setSoloGratis,
  categoriaSeleccionada, setCategoriaSeleccionada,
  vista, setVista,
  totalResultados, onLimpiar
}: FiltrosProps) {
  const hayFiltrosActivos =
    busqueda.trim() !== '' ||
    filtroFecha !== 'Todos' ||
    comunaSeleccionada !== 'Todas las comunas' ||
    categoriaSeleccionada !== 'Todas' ||
    soloGratis;

  return (
    <div className="space-y-5 mb-8">
      {/* 1. Buscador y Selector de Vista */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por artista, obra, lugar o evento..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          {busqueda && (
            <button onClick={() => setBusqueda('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-end sm:self-auto">
          <button onClick={() => setVista('grid')} className={`p-2 rounded-lg text-xs transition-all ${vista === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
            <Grid className="w-4 h-4" />
          </button>
          <button onClick={() => setVista('agenda')} className={`p-2 rounded-lg text-xs transition-all ${vista === 'agenda' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Filtros de Fecha, Gratuito y Menú Desplegable de Comunas */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {['Todos', 'Hoy', 'Fin de semana', 'Este mes'].map((opcion) => (
            <button
              key={opcion}
              onClick={() => setFiltroFecha(opcion)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filtroFecha === opcion ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {opcion}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Menú Desplegable Comunas */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={comunaSeleccionada}
              onChange={(e) => setComunaSeleccionada(e.target.value)}
              className="appearance-none w-full sm:w-48 pl-3 pr-9 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
            >
              {COMUNAS.map((comuna) => (
                <option key={comuna} value={comuna}>{comuna}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => setSoloGratis(!soloGratis)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0 ${soloGratis ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
          >
            Gratuitos
          </button>
        </div>
      </div>

      {/* 3. Recuadros de Categorías con Íconos y Colores */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIAS.map((cat) => {
          const Icono = cat.icon;
          const isSelected = categoriaSeleccionada === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 
                ${isSelected ? cat.colores + ' shadow-sm ring-1 ring-black/5' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              <Icono className={`w-3.5 h-3.5 ${isSelected ? '' : 'text-slate-400'}`} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Limpiar y Contador */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
        <span className="text-slate-500 font-medium">
          Mostrando <span className="text-slate-800 font-semibold">{totalResultados}</span> panoramas
        </span>
        {hayFiltrosActivos && (
          <button onClick={onLimpiar} className="text-rose-600 hover:text-rose-700 font-semibold">
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}