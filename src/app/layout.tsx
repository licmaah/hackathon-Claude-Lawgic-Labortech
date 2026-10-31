import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Sans, Prata } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const lcd = localFont({
  src: "../../node_modules/dseg/fonts/DSEG14-Classic/DSEG14Classic-Bold.woff2",
  weight: "700",
  variable: "--f-lcd",
  display: "swap"
});

const prata = Prata({ subsets: ["latin"], weight: "400", variable: "--f-titulo", display: "swap" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--f-texto", display: "swap" });
const archivo = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--f-marca", display: "swap" });

export const metadata: Metadata = {
  title: "LaborTech Inspección",
  description:
    "Revise su empresa con los puntos del acta de la Secretaría del Trabajo de Baja California, los requisitos de cada documento y los apercibimientos de la autoridad."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${prata.variable} ${plex.variable} ${archivo.variable} ${lcd.variable}`}>
      <body>{children}</body>
    </html>
  );
}
