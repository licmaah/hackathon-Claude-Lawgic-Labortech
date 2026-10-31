import Link from "next/link";
import { ruta } from "@/lib/ruta";
import { AnuncioCalculadora } from "@/componentes/AnuncioCalculadora";
import { AvisoLegal } from "@/componentes/AvisoLegal";
import { DemoPunto } from "@/componentes/DemoPunto";
import { Chip, EscenaHero, Sello } from "@/componentes/EscenaHero";
import { APERCIBIMIENTOS } from "@/datos/apercibimientos";
import { DOCUMENTOS } from "@/datos/documentos";
import { PUNTOS } from "@/lib/avance";

export default function Portada() {
  return (
    <main>
      <AnuncioCalculadora />
      <EscenaHero />

      <section className="demo sobre-noche">
        <div className="demo-in">
          <div>
            <h2>Marque un punto y vea lo que costaría no mostrarlo</h2>
            <p className="demo-lead">
              El inspector anota SÍ, N/M o N/A en cada renglón. Aquí usted hace lo mismo, y la ley hace la cuenta.
            </p>
            <div className="acciones" style={{ marginTop: 24 }}>
              <Link href="/demo" className="btn lleno">Revisar los {PUNTOS.length} puntos</Link>
            </div>
          </div>
          <DemoPunto />
        </div>
      </section>

      <section className="modulos">
        <article className="modulo">
          <div className="icono gira"><Sello /></div>
          <div>
            <h2>{PUNTOS.length} puntos del acta, en su mismo orden</h2>
            <p>Cada N/M muestra el artículo que lo sustenta y la multa posible en pesos, según sus trabajadores y la UMA vigente.</p>
          </div>
        </article>
        <article className="modulo">
          <div className="icono gira2"><Chip /></div>
          <div>
            <h2>{DOCUMENTOS.length} documentos, y Claude revisa los suyos</h2>
            <p>Suba un contrato o su reglamento. Claude lo compara contra los requisitos de ley, indica dónde encontró cada uno y deja a su abogado la última palabra.</p>
          </div>
        </article>
        <article className="modulo">
          <div className="icono reloj gira2"><img src={ruta("/logo-labortech-reloj.png")} alt="" width={751} height={1453} /></div>
          <div>
            <h2>{APERCIBIMIENTOS.length} etapas, de la puerta al juicio</h2>
            <p>Qué advierte la autoridad, qué pasa si no atiende y cuándo vence su plazo, contado en días hábiles.</p>
          </div>
        </article>
        <article className="modulo">
          <div className="icono gira"><div className="chip">{"{ }"}</div></div>
          <div>
            <h2>2 repositorios gratuitos y 5 proyectos de demostración</h2>
            <p>Use la calculadora laboral y el autodiagnóstico sin costo, y revise el código en GitHub.</p>
            <div className="acciones" style={{ marginTop: 14 }}>
              <Link href="/calculadora" className="btn lleno">Abrir la calculadora</Link>
              <Link href="/repositorios" className="btn">Ver repositorios</Link>
            </div>
          </div>
        </article>
      </section>

      <footer className="pie">
        <div className="pie-in">
          <AvisoLegal />
          <p><Link href="/privacidad">Aviso de privacidad</Link></p>
        </div>
      </footer>
    </main>
  );
}
