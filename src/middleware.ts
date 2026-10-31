import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let respuesta = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (galletas) => {
          galletas.forEach(({ name, value }) => request.cookies.set(name, value));
          respuesta = NextResponse.next({ request });
          galletas.forEach(({ name, value, options }) => respuesta.cookies.set(name, value, options));
        }
      }
    }
  );
  await supabase.auth.getUser();
  return respuesta;
}

export const config = {
  matcher: ["/panel/:path*", "/despacho/:path*", "/api/:path*", "/auth/:path*"]
};
