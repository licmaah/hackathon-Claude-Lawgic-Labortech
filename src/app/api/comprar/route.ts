import { NextResponse } from "next/server";
import Stripe from "stripe";
import { A_LA_VENTA } from "@/datos/repositorios";

function error(status: number, mensaje: string) {
  return NextResponse.json({ error: mensaje }, { status });
}

export async function POST(request: Request) {
  const { id } = await request.json().catch(() => ({ id: null }));
  const repositorio = A_LA_VENTA.find((r) => r.id === id);
  if (!repositorio) return error(400, "Elija un repositorio de la lista.");
  if (repositorio.precio === null) return error(409, "Este repositorio aún no tiene precio.");

  // Este flujo es de demostración: solo acepta claves de prueba para que nunca haya un cobro real.
  const clave = process.env.STRIPE_SECRET_KEY;
  if (!clave?.startsWith("sk_test_")) {
    return error(503, "El pago de prueba no está disponible: falta configurar una clave de prueba de Stripe.");
  }

  const origen = new URL(request.url).origin;
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
      success_url: `${origen}/repositorios?pago=prueba`,
      cancel_url: `${origen}/repositorios`
    });
    return NextResponse.json({ url: sesion.url });
  } catch {
    return error(502, "Stripe no pudo abrir el pago de prueba. Intente de nuevo.");
  }
}
