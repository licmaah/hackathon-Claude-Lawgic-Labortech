import { BarraSitio } from "@/componentes/BarraSitio";

export const metadata = {
  title: "Calculadora laboral gratuita | LaborTech",
  description: "Calcule finiquitos, liquidaciones y prestaciones conforme a la Ley Federal del Trabajo. Sus datos no salen del navegador."
};

export default function PaginaCalculadora() {
  return (
    <div className="calc-pagina">
      <BarraSitio />
      <iframe className="calc-marco" src="/repositorios/calculadora-laboral/index.html" title="Calculadora laboral" />
    </div>
  );
}
