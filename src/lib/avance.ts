import { DOCUMENTOS } from "@/datos/documentos";
import datos from "@/datos/puntos.json";
import { multa } from "./reglas";

export type Marca = "si" | "nm" | "na";

export type Sancion = { art: string; min: number; max: number; what: string; jail?: boolean };
export type Punto = {
  id: string;
  q: string;
  d: string;
  f: string;
  s: string | null;
  pw?: boolean;
  y27?: boolean;
  note?: string;
};
export type Seccion = { id: string; title: string; fed?: boolean; items: Punto[] };

export const SANCIONES = datos.S as Record<string, Sancion>;
export const SECCIONES = datos.SECTIONS as Seccion[];
export const PUNTOS = SECCIONES.flatMap((s) => s.items);

export type EstadoIA = "cumple" | "no_cumple" | "no_determinable";
export type ResultadoIA = {
  documento_reconocido: boolean;
  resumen: string;
  requisitos: { id: string; estado: EstadoIA; evidencia: string }[];
  observaciones: string[];
  fecha: string;
};

export type Avance = {
  trabajadores: number;
  uma: number;
  reincidencia: boolean;
  puntos: Record<string, { st?: Marca; aff?: number }>;
  docs: Record<string, Record<string, Marca>>;
  ia: Record<string, ResultadoIA>;
  aperc: Record<string, { estado?: "sin" | "recibido" | "atendido"; fecha?: string; dias?: number }>;
};

export const UMA_2026 = 117.31;

export function avanceInicial(parcial?: Partial<Avance> | null): Avance {
  return {
    trabajadores: 100,
    uma: UMA_2026,
    reincidencia: false,
    puntos: {},
    docs: {},
    ia: {},
    aperc: {},
    ...(parcial ?? {})
  };
}

export function afectados(p: Punto, a: Avance) {
  return a.puntos[p.id]?.aff ?? (p.pw ? a.trabajadores : 1);
}

export function multaDe(p: Punto, a: Avance) {
  const s = p.s ? SANCIONES[p.s] : undefined;
  if (!s) return null;
  return { s, n: afectados(p, a), ...multa(s.min, s.max, afectados(p, a), a.uma, a.reincidencia) };
}

export function resumen(a: Avance) {
  let si = 0;
  let nm = 0;
  let na = 0;
  let min = 0;
  let max = 0;
  for (const p of PUNTOS) {
    const st = a.puntos[p.id]?.st;
    if (st === "si") si++;
    else if (st === "na") na++;
    else if (st === "nm") {
      nm++;
      const m = multaDe(p, a);
      if (m) {
        min += m.min;
        max += m.max;
      }
    }
  }
  const requisitos = DOCUMENTOS.flatMap((d) => d.requisitos.map((r) => a.docs[d.id]?.[r.id]));
  const reqNm = requisitos.filter((m) => m === "nm").length;
  const reqSi = requisitos.filter((m) => m === "si").length;
  const reqNa = requisitos.filter((m) => m === "na").length;
  return {
    si,
    nm,
    na,
    revisados: si + nm + na,
    total: PUNTOS.length,
    pct: si + nm ? Math.round((si * 100) / (si + nm)) : null,
    min,
    max,
    reqNm,
    reqSi,
    reqRevisados: reqSi + reqNm + reqNa,
    reqTotal: requisitos.length
  };
}

export const pesos = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

export const numero = (n: number) => new Intl.NumberFormat("es-MX").format(n);

const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

/** Fecha como la muestra el reloj del logo: NOV 4-26. */
export const fechaLcd = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  return `${MESES[m - 1]} ${d}-${String(a).slice(2)}`;
};

export const fechaLarga = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};
