import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function clienteServidor() {
  const almacen = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => almacen.getAll(),
        setAll: (galletas) => {
          try {
            galletas.forEach(({ name, value, options }) => almacen.set(name, value, options));
          } catch {
            // En un Server Component las cookies son de solo lectura; el middleware renueva la sesión.
          }
        }
      }
    }
  );
}
