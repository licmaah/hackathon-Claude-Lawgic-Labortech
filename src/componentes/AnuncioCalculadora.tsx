import Link from "next/link";

const TEXTO = ["CALCULADORA LABORAL GRATIS", "FINIQUITOS", "LIQUIDACIONES", "SALARIOS CAIDOS", "TIEMPO EXTRA", "VALORES 2026"];

// El texto se repite para que la cinta corra sin cortes. Los lectores de pantalla leen solo la etiqueta del enlace.
export function AnuncioCalculadora() {
  const tramo = (oculto: boolean) => (
    <span className="cinta-tramo" aria-hidden={oculto || undefined}>
      {TEXTO.map((t) => <span key={t}>{t}</span>)}
    </span>
  );

  return (
    <Link href="/calculadora" className="anuncio" aria-label="Calculadora laboral gratuita. Abrir la calculadora.">
      <span className="cinta" aria-hidden="true">
        <span className="cinta-pista">{tramo(true)}{tramo(true)}{tramo(true)}</span>
      </span>
      <span className="anuncio-cta" aria-hidden="true">Abrir gratis</span>
    </Link>
  );
}
