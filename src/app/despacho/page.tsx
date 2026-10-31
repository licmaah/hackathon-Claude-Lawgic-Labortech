import Link from "next/link";
import { redirect } from "next/navigation";
import { avanceInicial, pesos, resumen } from "@/lib/avance";
import { clienteServidor } from "@/lib/supabase/servidor";

export const dynamic = "force-dynamic";

export default async function Despacho() {
  const supabase = await clienteServidor();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect("/entrar");
  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) redirect("/panel");

  const { data: empresas } = await supabase
    .from("empresas")
    .select("id, razon_social, avance, updated_at")
    .order("updated_at", { ascending: false });

  const filas = (empresas ?? []).map((e) => {
    const a = avanceInicial(e.avance);
    return { ...e, a, r: resumen(a) };
  });

  return (
    <>
      <div className="barra">
        <div className="barra-in">
          <Link href="/" className="marca">LaborTech</Link>
          <div className="barra-der"><Link href="/panel">Mi panel</Link></div>
        </div>
      </div>
      <main className="vista">
        <h1 style={{ fontSize: 32, color: "var(--verde)" }}>Empresas del despacho</h1>
        <div className="foja tabla-env">
          {filas.length === 0 ? (
            <p>Aún no hay empresas registradas. Comparta el enlace de registro con sus clientes.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Trabajadores</th>
                  <th>Puntos revisados</th>
                  <th>Cumplimiento</th>
                  <th>N/M</th>
                  <th>Multa posible</th>
                  <th>Última actualización</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((f) => (
                  <tr key={f.id}>
                    <td>{f.razon_social || "Sin nombre"}</td>
                    <td className="n">{f.a.trabajadores}</td>
                    <td className="n">{f.r.revisados} de {f.r.total}</td>
                    <td className="n">{f.r.pct === null ? "Sin datos" : `${f.r.pct}%`}</td>
                    <td className="n">{f.r.nm}</td>
                    <td className="n">{f.r.nm ? `${pesos(f.r.min)} a ${pesos(f.r.max)}` : "$0"}</td>
                    <td className="n">{new Date(f.updated_at).toLocaleDateString("es-MX")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
}
