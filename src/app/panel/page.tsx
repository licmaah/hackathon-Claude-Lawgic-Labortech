import { redirect } from "next/navigation";
import { Panel } from "@/componentes/Panel";
import { clienteServidor } from "@/lib/supabase/servidor";

export const dynamic = "force-dynamic";

export default async function PaginaPanel() {
  const supabase = await clienteServidor();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect("/entrar");

  let { data: empresa } = await supabase
    .from("empresas")
    .select("id, razon_social, avance")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!empresa) {
    const creada = await supabase
      .from("empresas")
      .insert({ user_id: user.id })
      .select("id, razon_social, avance")
      .single();
    empresa = creada.data;
  }
  if (!empresa) throw new Error("No se pudo abrir la empresa");

  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();

  return (
    <Panel
      modo="cuenta"
      empresaId={empresa.id}
      razonInicial={empresa.razon_social}
      avanceInicial={empresa.avance}
      esAdmin={!!admin}
    />
  );
}
