// GitHub Pages sirve el sitio dentro de una carpeta; Link la agrega solo, pero img y a la necesitan aquí.
export const ruta = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;

export const funcion = (nombre: string) => `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/${nombre}`;
