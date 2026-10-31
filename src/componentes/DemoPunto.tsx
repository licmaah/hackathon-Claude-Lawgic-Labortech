"use client";

import { useState } from "react";
import { SANCIONES, UMA_2026, numero, pesos, type Marca } from "@/lib/avance";
import { multa } from "@/lib/reglas";
import { ControlMarca } from "./ControlMarca";

export function DemoPunto() {
  const [marca, setMarca] = useState<Marca | undefined>("nm");
  const [trabajadores, setTrabajadores] = useState(100);
  const s = SANCIONES["1002"];
  const m = multa(s.min, s.max, trabajadores, UMA_2026, false);

  return (
    <div className="demo-hoja">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 20px", justifyContent: "space-between", alignItems: "start" }}>
        <div style={{ flex: "1 1 240px" }}>
          <div className="demo-q">Contrato individual por escrito y firmado de cada trabajador</div>
          <div className="demo-ref">Arts. 24, 25 y 804, fr. I LFT</div>
        </div>
        <ControlMarca nombre="demo" valor={marca} etiqueta="Contrato individual" alCambiar={setMarca} />
      </div>
      <label className="demo-trab">
        Trabajadores afectados: {numero(trabajadores)}
        <input type="range" min={1} max={500} value={trabajadores} onChange={(e) => setTrabajadores(Number(e.target.value))} />
      </label>
      <div className={`demo-res ${marca ?? ""}`} aria-live="polite">
        {marca === "nm" && (
          <div key="nm" className="aparece">
            <div className="demo-montos">
              <span className="lcd">{pesos(m.min)}</span> a <span className="lcd">{pesos(m.max)}</span>
            </div>
            <div>Multa posible: {s.art}, de {numero(s.min)} a {numero(s.max)} UMA por trabajador. La autoridad fija el monto.</div>
          </div>
        )}
        {marca === "si" && <div key="si" className="aparece">El acta asentaría que sí lo mostró y este punto queda cerrado en la visita.</div>}
        {marca === "na" && <div key="na" className="aparece">No aplica cuando hay contrato colectivo: el punto se excluye de su cuenta.</div>}
      </div>
    </div>
  );
}
