import Link from "next/link";
import { Marca } from "./Marca";

export function BarraSitio() {
  return (
    <div className="barra">
      <div className="barra-in">
        <Marca />
        <nav className="barra-der" aria-label="Secciones">
          <Link href="/calculadora">Calculadora</Link>
          <Link href="/repositorios">Repositorios</Link>
          <Link href="/demo">Probar sin cuenta</Link>
          <Link href="/entrar">Entrar</Link>
        </nav>
      </div>
    </div>
  );
}
