// Cálculo determinista: plazos y multas. El modelo de IA nunca hace esta aritmética.

function enesimoLunes(anio: number, mes: number, n: number) {
  const d = new Date(anio, mes, 1);
  const hasta = (8 - d.getDay()) % 7;
  return new Date(anio, mes, 1 + hasta + 7 * (n - 1));
}

// Descansos obligatorios del art. 74 LFT, sin los días que declare inhábiles cada autoridad.
function festivos(anio: number) {
  const dias = [
    new Date(anio, 0, 1),
    enesimoLunes(anio, 1, 1),
    enesimoLunes(anio, 2, 3),
    new Date(anio, 4, 1),
    new Date(anio, 8, 16),
    enesimoLunes(anio, 10, 3),
    new Date(anio, 11, 25)
  ];
  if ((anio - 2024) % 6 === 0) dias.push(new Date(anio, 9, 1));
  return dias.map((d) => d.toDateString());
}

/** Fecha límite en días hábiles contados desde el día siguiente. Recibe y regresa AAAA-MM-DD. */
export function plazoHabil(fecha: string, dias: number): string {
  const [a, m, d] = fecha.split("-").map(Number);
  const f = new Date(a, m - 1, d);
  let cuenta = 0;
  while (cuenta < dias) {
    f.setDate(f.getDate() + 1);
    if (f.getDay() === 0 || f.getDay() === 6) continue;
    if (festivos(f.getFullYear()).includes(f.toDateString())) continue;
    cuenta++;
  }
  const mm = String(f.getMonth() + 1).padStart(2, "0");
  const dd = String(f.getDate()).padStart(2, "0");
  return `${f.getFullYear()}-${mm}-${dd}`;
}

/** Rango de multa en pesos. Art. 992 LFT: una por cada trabajador afectado; la reincidencia la duplica. */
export function multa(minUma: number, maxUma: number, afectados: number, uma: number, reincidencia: boolean) {
  const factor = Math.max(1, Math.floor(afectados)) * (reincidencia ? 2 : 1);
  return { min: minUma * factor * uma, max: maxUma * factor * uma };
}
