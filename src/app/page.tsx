import Link from "next/link";
import { AvisoLegal } from "@/componentes/AvisoLegal";
import { PUNTOS } from "@/lib/avance";
import { DOCUMENTOS } from "@/datos/documentos";
import { APERCIBIMIENTOS } from "@/datos/apercibimientos";

export default function Portada() {
  return (
    <main className="portada">
      <div className="portada-top">
        <Link href="/" className="marca">LaborTech</Link>
        <Link href="/entrar" className="btn">Entrar</Link>
      </div>

      <section className="portada-hero">
        <div>
          <h1>Revise su empresa antes de que la revise el inspector</h1>
          <p className="lead">
            Marque cada punto como lo asentaría la Secretaría del Trabajo de Baja California. Vea qué multa
            prevé la ley, qué debe contener cada documento y qué plazo corre después de cada apercibimiento.
          </p>
          <div className="acciones">
            <Link href="/entrar?modo=crear" className="btn lleno">Crear cuenta de empresa</Link>
            <Link href="/demo" className="btn">Probar sin cuenta</Link>
          </div>
        </div>

        <figure className="foja" style={{ margin: 0 }} aria-label="Fragmento del formato de acta con sus anotaciones">
          <p className="foja-texto">
            <b>Contrato individual de trabajo:</b> se requirió y{" "}
            <span className="asiento nm" style={{ "--i": 0 } as React.CSSProperties}>N/M</span> se presentó el contrato individual
            de trabajo. <b>Reglamento interior de trabajo:</b> se requirió y{" "}
            <span className="asiento" style={{ "--i": 1 } as React.CSSProperties}>SÍ</span> se presentó, el cual{" "}
            <span className="asiento" style={{ "--i": 2 } as React.CSSProperties}>SÍ</span> se encuentra depositado ante autoridad
            competente. <b>Aguinaldo:</b> la empresa{" "}
            <span className="asiento nm" style={{ "--i": 3 } as React.CSSProperties}>N/M</span> paga aguinaldo conforme a la Ley.{" "}
            <b>Teletrabajo:</b> <span className="asiento na" style={{ "--i": 4 } as React.CSSProperties}>N/A</span>
          </p>
          <figcaption className="foja-pie">
            Así anota el formato oficial: N/M significa que el documento no se mostró. El texto es del formato;
            las anotaciones son un ejemplo.
          </figcaption>
        </figure>
      </section>

      <section className="tres">
        <div>
          <h2>{PUNTOS.length} puntos de inspección</h2>
          <p>Siguen el acta de condiciones generales de trabajo. Cada N/M muestra su fundamento y la multa posible en pesos.</p>
        </div>
        <div>
          <h2>{DOCUMENTOS.length} documentos con sus requisitos</h2>
          <p>Revise cada requisito a mano o suba el documento para que Claude haga una primera comparación contra la lista.</p>
        </div>
        <div>
          <h2>{APERCIBIMIENTOS.length} etapas con consecuencias</h2>
          <p>Desde la puerta hasta el juicio: qué advierte la autoridad, qué pasa si no atiende y cuándo vence su plazo.</p>
        </div>
      </section>

      <footer className="pie">
        <AvisoLegal />
        <p><Link href="/privacidad">Aviso de privacidad</Link></p>
      </footer>
    </main>
  );
}
