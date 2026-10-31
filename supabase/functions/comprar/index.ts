import Stripe from "npm:stripe@23.1.0";
import { A_LA_VENTA } from "./repositorios.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function responder(status: number, cuerpo: unknown) {
  return new Response(JSON.stringify(cuerpo), { status, headers: { ...CORS, "Content-Type": "application/json" } });
}
const error = (status: number, mensaje: string) => responder(status, { error: mensaje });

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (request.method !== "POST") return error(405, "Use POST.");

  const { id, volver } = await request.json().catch(() => ({ id: null, volver: null }));
  const repositorio = A_LA_VENTA.find((r) => r.id === id);
  if (!repositorio) return error(400, "Elija un repositorio de la lista.");
  if (repositorio.precio === null) return error(409, "Este repositorio aún no tiene precio.");

  // Este flujo es de demostración: solo acepta claves de prueba para que nunca haya un cobro real.
  const clave = Deno.env.get("STRIPE_SECRET_KEY");
  if (!clave?.startsWith("sk_test_")) {
    return error(503, "El pago de prueba no está disponible: falta configurar una clave de prueba de Stripe.");
  }

  const origen = request.headers.get("Origin") ?? "";
  if (typeof volver !== "string" || !origen || !volver.startsWith(origen)) return error(400, "La página de regreso no es válida.");

  try {
    const sesion = await new Stripe(clave).checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "mxn",
            unit_amount: Math.round(repositorio.precio * 100),
            product_data: { name: repositorio.nombre, description: repositorio.incluye }
          }
        }
      ],
      success_url: `${volver}?pago=prueba`,
      cancel_url: volver
    });
    return responder(200, { url: sesion.url });
  } catch {
    return error(502, "Stripe no pudo abrir el pago de prueba. Intente de nuevo.");
  }
});
