"use client";

import { useState } from "react";
import type { Marca } from "@/lib/avance";

const OPCIONES = [
  ["si", "SÍ", "Sí muestra"],
  ["nm", "N/M", "No mostrado"],
  ["na", "N/A", "No aplica"]
] as const;

export function ControlMarca({ nombre, valor, alCambiar, etiqueta }: { nombre: string; valor?: Marca; alCambiar: (m: Marca) => void; etiqueta: string }) {
  // El sello solo se anima cuando la persona marca, no al cambiar de pestaña.
  const [recien, setRecien] = useState<Marca | null>(null);

  return (
    <div className="marca-ctrl" role="radiogroup" aria-label={etiqueta}>
      {OPCIONES.map(([v, t, largo]) => (
        <span key={v}>
          <input
            type="radio"
            id={`${nombre}-${v}`}
            name={nombre}
            value={v}
            checked={valor === v}
            onChange={() => {
              setRecien(v);
              alCambiar(v);
            }}
          />
          <label htmlFor={`${nombre}-${v}`} title={largo} aria-label={largo} className={recien === v ? "recien" : undefined} onAnimationEnd={() => setRecien(null)}>
            {t}
          </label>
        </span>
      ))}
    </div>
  );
}
