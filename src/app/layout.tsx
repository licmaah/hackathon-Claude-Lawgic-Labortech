import type { Metadata } from "next";
import { Fraunces, Inter, Kalam } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--f-titulo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--f-texto", display: "swap" });
const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"], variable: "--f-pluma", display: "swap" });

export const metadata: Metadata = {
  title: "LaborTech Inspección",
  description:
    "Revise su empresa con los puntos del acta de la Secretaría del Trabajo de Baja California, los requisitos de cada documento y los apercibimientos de la autoridad."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${fraunces.variable} ${inter.variable} ${kalam.variable}`}>
      <body>{children}</body>
    </html>
  );
}
