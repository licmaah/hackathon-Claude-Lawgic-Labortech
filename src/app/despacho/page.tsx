"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Marca } from "@/componentes/Marca";
import { avanceInicial, pesos, resumen } from "@/lib/avance";
import { clienteNavegador } from "@/lib/supabase/navegador";

type Empresa = { id: string; razon_social: string; avance: never; updated_at: string };

export default function Despacho() {
  const router = useRouter();
  const [empresas, setEmpresas] = useState<Empresa[] | null>(null);

  useEffect(() => {
    (async () => {
      const supabase = clienteNavegador();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) return router.replace("/entrar");
      const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
      if (!admin) return router.replace("/panel");
      const { data } = await supabase
        .from("empresas")
        .select("id, razon_social, avance, updated_at")
        .order("updated_at", { ascending: false });
      setEmpresas((data ?? []) as Empresa[]);
    })();
  }, [router]);

  const filas = (empresas ?? []).map((e) => {
    const a = avanceInicial(e.avance);
    return { ...e, a, r: resumen(a) };
  });

  return (
    <>
      <div className="barra">
        <div className="barra-in">
          <Marca />
          <div className="barra-der"><Link href="/panel">Mi panel</Link></div>
        </div>
      </div>
      <main className="vista">
        <h1 style={{ fontSize: 32 }}>Empresas del despacho</h1>
        <div className="foja tabla-env">
          {empresas === null ? (
            <p role="status">Cargando empresas…</p>
          ) : filas.length === 0 ? (
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
