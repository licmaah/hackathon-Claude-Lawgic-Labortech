import Link from "next/link";
import { ruta } from "@/lib/ruta";

export function Marca() {
  return (
    <Link href="/" className="marca">
      <img src={ruta("/logo-labortech-reloj.png")} alt="" width={751} height={1453} />
      LaborTech
    </Link>
  );
}
