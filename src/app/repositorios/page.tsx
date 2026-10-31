import { BarraSitio } from "@/componentes/BarraSitio";
import { ComprarPrueba } from "@/componentes/ComprarPrueba";
import { A_LA_VENTA, GRATUITOS } from "@/datos/repositorios";
import { pesos } from "@/lib/avance";

export const metadata = {
  title: "Repositorios | LaborTech",
  description: "Herramientas laborales gratuitas en GitHub y cinco proyectos de demostración."
};

export default async function Repositorios({ searchParams }: { searchParams: Promise<{ pago?: string }> }) {
  const { pago } = await searchParams;

  return (
    <>
      <BarraSitio />
      <main className="repos">
        <h1>Repositorios</h1>
        {pago === "prueba" && (
          <p className="aviso" role="status">Pago de prueba completado. Stripe no realizó ningún cobro y no se entregó ningún archivo.</p>
        )}

        <section aria-labelledby="gratis">
          <h2 id="gratis">Gratuitos</h2>
          <div className="repos-gratis">
            {GRATUITOS.map((r) => (
              <article key={r.id} className="repo-gratis">
                <span className="lcd chica">GRATIS</span>
                <h3>{r.nombre}</h3>
                <p>{r.descripcion}</p>
                <div className="acciones">
                  <a href={r.abrir} className="btn lleno">{r.accion}</a>
                  <a href={r.github} className="btn">Ver en GitHub</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="venta">
          <h2 id="venta">A la venta</h2>
          <p className="nota-legal repos-nota">
            Proyectos ficticios, creados para mostrar el flujo de venta en el Hackathon de Lawgic. Ni los proyectos ni sus precios son reales: el pago funciona solo en modo de prueba de Stripe, sin cobros ni entrega de archivos.
          </p>
          <ul className="repos-venta">
            {A_LA_VENTA.map((r) => (
              <li key={r.id}>
                <div>
                  <h3>{r.nombre}</h3>
                  <p>{r.incluye}</p>
                  <span className="fund">Proyecto de demostración. {r.tecnologia}.</span>
                </div>
                <div className="repo-precio">
                  {r.precio !== null && <span className="lcd">{pesos(r.precio)}</span>}
                  <ComprarPrueba id={r.id} precio={r.precio} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
