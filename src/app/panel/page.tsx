"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Panel } from "@/componentes/Panel";
import type { Avance } from "@/lib/avance";
import { clienteNavegador } from "@/lib/supabase/navegador";

type Datos = { id: string; razon: string; avance: Partial<Avance> | null; esAdmin: boolean };

export default function PaginaPanel() {
  const router = useRouter();
  const [datos, setDatos] = useState<Datos | null>(null);
  const [fallo, setFallo] = useState(false);

  useEffect(() => {
    (async () => {
      const supabase = clienteNavegador();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/entrar");
        return;
      }
      const campos = "id, razon_social, avance";
      let { data: empresa } = await supabase.from("empresas").select(campos).eq("user_id", user.id).maybeSingle();
      if (!empresa) {
        ({ data: empresa } = await supabase.from("empresas").insert({ user_id: user.id }).select(campos).single());
      }
      if (!empresa) {
        setFallo(true);
        return;
      }
      const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
      setDatos({ id: empresa.id, razon: empresa.razon_social, avance: empresa.avance, esAdmin: !!admin });
    })().catch(() => setFallo(true));
  }, [router]);

  if (fallo) return <main className="vista"><p className="aviso mal" role="alert">No se pudo abrir su empresa. Recargue la página.</p></main>;
  if (!datos) return <main className="vista"><p role="status">Abriendo su empresa…</p></main>;
  return <Panel modo="cuenta" empresaId={datos.id} razonInicial={datos.razon} avanceInicial={datos.avance} esAdmin={datos.esAdmin} />;
}
