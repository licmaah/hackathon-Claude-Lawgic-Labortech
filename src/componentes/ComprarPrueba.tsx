"use client";

import { useEffect, useState } from "react";
import { funcion } from "@/lib/ruta";

export function AvisoPago() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(new URLSearchParams(window.location.search).get("pago") === "prueba"), []);
  if (!visible) return null;
  return <p className="aviso" role="status">Pago de prueba completado. Stripe no realizó ningún cobro y no se entregó ningún archivo.</p>;
}

export function ComprarPrueba({ id, precio }: { id: string; precio: number | null }) {
  const [enviando, setEnviando] = useState(false);
  const [fallo, setFallo] = useState("");

  async function comprar() {
    setEnviando(true);
    setFallo("");
    try {
      const r = await fetch(funcion("comprar"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, volver: window.location.href.split("?")[0] })
      });
      const json = await r.json();
      if (r.ok && json.url) {
        window.location.assign(json.url);
        return;
      }
      setFallo(json.error ?? "No se pudo abrir el pago de prueba.");
    } catch {
      setFallo("No hubo conexión con el servidor. Intente de nuevo.");
    }
    setEnviando(false);
  }

  return (
    <div className="comprar">
      <button className="btn" disabled={precio === null || enviando} onClick={comprar}>
        {precio === null ? "Precio por definir" : enviando ? "Abriendo Stripe…" : "Pagar en modo de prueba"}
      </button>
      {fallo && <p className="aviso mal" role="alert">{fallo}</p>}
    </div>
  );
}
