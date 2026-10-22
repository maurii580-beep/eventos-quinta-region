// components/EventosContainer.tsx
'use client';

import { useState } from 'react';
import EventoCard from '@/components/EventoCard';
import EventoRow from '@/components/EventoRow';
import Filtros from '@/components/Filtros';
import { Evento } from '@/types/evento';

interface Props {
  eventosIniciales: Evento[];
}

export default function EventosContainer({ eventosIniciales }: Props) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('Todos');
  const [comunaSeleccionada, setComunaSeleccionada] = useState('Todas');
  const [soloGratis, setSoloGratis] = useState(false);
  const [vista, setVista] = useState<'grid' | 'agenda'>('grid');

  const cumpleFiltroFecha = (fechaStr: string) => {
    if (filtroFecha === 'Todos') return true;

    const fechaEvento = new Date(fechaStr + 'T00:00:00');
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (filtroFecha === 'Hoy') {
      return fechaEvento.getTime() === hoy.getTime();
    }

    if (filtroFecha === 'Fin de semana') {
      const diaSemana = hoy.getDay();
      const diasHastaViernes = (5 - diaSemana + 7) % 7;
      const viernes = new Date(hoy);
      viernes.setDate(hoy.getDate() + diasHastaViernes);

      const domingo = new Date(viernes);
      domingo.setDate(viernes.getDate() + 2);

      return fechaEvento >= viernes && fechaEvento <= domingo;
    }

    if (filtroFecha === 'Este mes') {
      return (
        fechaEvento.getMonth() === hoy.getMonth() &&
        fechaEvento.getFullYear() === hoy.getFullYear()
      );
    }

    return true;
  };

  const limpiarFiltros = () => {
    setBusqueda('');
    setFiltroFecha('Todos');
    setComunaSeleccionada('Todas');
    setSoloGratis(false);
  };

  const eventosFiltrados = eventosIniciales.filter((evento) => {
    if (soloGratis && !evento.es_gratuito) return false;
    if (comunaSeleccionada !== 'Todas' && evento.comuna !== comunaSeleccionada) return false;
    if (!cumpleFiltroFecha(evento.fecha_inicio)) return false;

    if (busqueda.trim() !== '') {
      const q = busqueda.toLowerCase();
      const coincide =
        evento.titulo.toLowerCase().includes(q) ||
        evento.lugar.toLowerCase().includes(q) ||
        evento.categoria.toLowerCase().includes(q) ||
        (evento.descripcion && evento.descripcion.toLowerCase().includes(q));
      if (!coincide) return false;
    }

    return true;
  });

  return (
    <>
      <Filtros
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        filtroFecha={filtroFecha}
        setFiltroFecha={setFiltroFecha}
        comunaSeleccionada={comunaSeleccionada}
        setComunaSeleccionada={setComunaSeleccionada}
        soloGratis={soloGratis}
        setSoloGratis={setSoloGratis}
        vista={vista}
        setVista={setVista}
        totalResultados={eventosFiltrados.length}
        onLimpiar={limpiarFiltros}
      />

      {eventosFiltrados.length > 0 ? (
        vista === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventosFiltrados.map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {eventosFiltrados.map((evento) => (
              <EventoRow key={evento.id} evento={evento} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-600 font-medium">
            No se encontraron panoramas con los filtros aplicados.
          </p>
          <button
            onClick={limpiarFiltros}
            className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Restablecer todos los filtros
          </button>
        </div>
      )}
    </>
  );
}