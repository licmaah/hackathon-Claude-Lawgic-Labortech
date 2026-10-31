"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Marca } from "@/componentes/Marca";
import { clienteNavegador } from "@/lib/supabase/navegador";

function Formulario() {
  const params = useSearchParams();
  const router = useRouter();
  const [crear, setCrear] = useState(params.get("modo") === "crear");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [fallo, setFallo] = useState(
    params.get("error") === "enlace" ? "El enlace ya no es válido. Inicie sesión o pida uno nuevo." : ""
  );

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setFallo("");
    setMensaje("");
    const supabase = clienteNavegador();
    if (crear) {
      const { data, error } = await supabase.auth.signUp({
        email: correo,
        password: clave,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
      });
      setEnviando(false);
      if (error) return setFallo(traducir(error.message));
      if (data.session) return router.push("/panel");
      return setMensaje("Le enviamos un correo. Abra el enlace para confirmar su cuenta.");
    }
    const { error } = await supabase.auth.signInWithPassword({ email: correo, password: clave });
    setEnviando(false);
    if (error) return setFallo(traducir(error.message));
    router.push("/panel");
    router.refresh();
  }

  return (
    <div className="acceso-fondo">
    <main className="acceso">
      <Marca />
      <form className="foja" onSubmit={enviar}>
        <h1>{crear ? "Crear cuenta de empresa" : "Entrar a su cuenta"}</h1>
        {fallo && <p className="aviso mal" role="alert">{fallo}</p>}
        {mensaje && <p className="aviso" role="status">{mensaje}</p>}
        <label className="campo">
          Correo
          <input type="email" required autoComplete="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </label>
        <label className="campo">
          Contraseña
          <input
            type="password"
            required
            minLength={8}
            autoComplete={crear ? "new-password" : "current-password"}
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </label>
        <button className="btn lleno" disabled={enviando}>
          {enviando ? "Enviando…" : crear ? "Crear cuenta" : "Entrar"}
        </button>
        {crear && (
          <p style={{ fontSize: 13 }}>
            Al crear la cuenta acepta el <Link href="/privacidad">aviso de privacidad</Link>.
          </p>
        )}
        <button type="button" className="cambiar" onClick={() => setCrear(!crear)}>
          {crear ? "Ya tengo cuenta" : "Crear una cuenta nueva"}
        </button>
        <p style={{ fontSize: 14 }}>
          ¿Solo quiere conocer el sitio? <Link href="/demo">Probar sin cuenta</Link>.
        </p>
      </form>
    </main>
    </div>
  );
}

function traducir(m: string) {
  if (/invalid login/i.test(m)) return "El correo o la contraseña no coinciden.";
  if (/already registered/i.test(m)) return "Ese correo ya tiene cuenta. Entre con su contraseña.";
  if (/email not confirmed/i.test(m)) return "Falta confirmar su correo. Abra el enlace que le enviamos.";
  if (/rate limit/i.test(m)) return "Se enviaron demasiados correos. Intente en una hora.";
  return "No se pudo completar el acceso. Intente de nuevo.";
}

export default function Entrar() {
  return (
    <Suspense>
      <Formulario />
    </Suspense>
  );
}
