import Image from "next/image";
import Link from "next/link";

export function Marca() {
  return (
    <Link href="/" className="marca">
      <Image src="/logo-labortech-reloj.png" alt="" width={751} height={1453} />
      LaborTech
    </Link>
  );
}
