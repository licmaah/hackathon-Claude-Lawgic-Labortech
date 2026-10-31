"use client";

import Link from "next/link";
import { useState } from "react";
import { Marca } from "@/componentes/Marca";
import { ruta } from "@/lib/ruta";
import { clienteNavegador } from "@/lib/supabase/navegador";

export default function Entrar() {
  const [correo, setCorreo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [fallo, setFallo] = useState("");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setFallo("");
    setMensaje("");
    const { error } = await clienteNavegador().auth.signInWithOtp({
      email: correo,
      options: { emailRedirectTo: `${window.location.origin}${ruta("/panel/")}` }
    });
    setEnviando(false);
    if (error) {
      setFallo(
        /rate limit|security purposes/i.test(error.message)
          ? "Se enviaron demasiados correos. Intente más tarde o pruebe el sitio sin cuenta."
          : "No se pudo enviar el enlace. Revise su correo e intente de nuevo."
      );
      return;
    }
    setMensaje("Le enviamos un enlace. Ábralo en este mismo navegador para entrar a su panel.");
  }

  return (
    <div className="acceso-fondo">
      <main className="acceso">
        <Marca />
        <form className="foja" onSubmit={enviar}>
          <h1>Entrar o crear cuenta</h1>
          <p style={{ fontSize: 15 }}>Sin contraseña: escriba su correo y le enviamos un enlace de acceso.</p>
          {fallo && <p className="aviso mal" role="alert">{fallo}</p>}
          {mensaje && <p className="aviso" role="status">{mensaje}</p>}
          <label className="campo">
            Correo
            <input type="email" required autoComplete="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </label>
          <button className="btn lleno" disabled={enviando}>
            {enviando ? "Enviando…" : "Enviar enlace"}
          </button>
          <p style={{ fontSize: 13 }}>
            Al continuar acepta el <Link href="/privacidad">aviso de privacidad</Link>.
          </p>
          <p style={{ fontSize: 14 }}>
            ¿Solo quiere conocer el sitio? <Link href="/demo">Probar sin cuenta</Link>.
          </p>
        </form>
      </main>
    </div>
  );
}
