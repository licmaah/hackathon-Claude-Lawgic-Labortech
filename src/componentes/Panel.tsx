"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { APERCIBIMIENTOS } from "@/datos/apercibimientos";
import { DOCUMENTOS } from "@/datos/documentos";
import {
  PUNTOS,
  SANCIONES,
  SECCIONES,
  UMA_2026,
  afectados,
  avanceInicial,
  fechaLarga,
  fechaLcd,
  multaDe,
  numero,
  pesos,
  resumen,
  type Avance,
  type EstadoIA,
  type Marca,
  type Punto,
  type ResultadoIA
} from "@/lib/avance";
import { plazoHabil } from "@/lib/reglas";
import { funcion } from "@/lib/ruta";
import { clienteNavegador } from "@/lib/supabase/navegador";
import { AvisoLegal } from "./AvisoLegal";
import { ControlMarca } from "./ControlMarca";
import { Marca as Logo } from "./Marca";

type Props =
  | { modo: "demo" }
  | { modo: "cuenta"; empresaId: string; razonInicial: string; avanceInicial: Partial<Avance> | null; esAdmin: boolean };

type Cambiar = (f: (a: Avance) => Avance) => void;

const CLAVE_DEMO = "labortech-demo-v1";
const PESTANAS = [
  ["resumen", "Resumen"],
  ["puntos", "Puntos del acta"],
  ["documentos", "Documentos"],
  ["apercibimientos", "Apercibimientos"]
] as const;
type Pestana = (typeof PESTANAS)[number][0];

const hoy = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function Panel(props: Props) {
  const cuenta = props.modo === "cuenta" ? props : null;
  const router = useRouter();
  const [razon, setRazon] = useState(cuenta?.razonInicial ?? "");
  const [avance, setAvance] = useState<Avance>(() => avanceInicial(cuenta?.avanceInicial));
  const [pestana, setPestana] = useState<Pestana>("resumen");
  const [guardado, setGuardado] = useState<"listo" | "guardando" | "error">("listo");
  const primera = useRef(true);

  useEffect(() => {
    if (cuenta) return;
    try {
      const crudo = localStorage.getItem(CLAVE_DEMO);
      if (crudo) {
        const { razon: r, avance: a } = JSON.parse(crudo);
        setRazon(r ?? "");
        setAvance(avanceInicial(a));
      }
    } catch {
      // Sin almacenamiento disponible, la demo funciona solo en esta visita.
    }
    // Solo al abrir.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    if (!cuenta) {
      try {
        localStorage.setItem(CLAVE_DEMO, JSON.stringify({ razon, avance }));
      } catch {
        // Sin almacenamiento disponible, la demo funciona solo en esta visita.
      }
      return;
    }
    setGuardado("guardando");
    const t = setTimeout(async () => {
      const { error } = await clienteNavegador()
        .from("empresas")
        .update({ razon_social: razon, avance, updated_at: new Date().toISOString() })
        .eq("id", cuenta.empresaId);
      setGuardado(error ? "error" : "listo");
    }, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [razon, avance]);

  const cambiar: Cambiar = (f) => setAvance(f);
  const r = resumen(avance);

  async function salir() {
    await clienteNavegador().auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <div className="barra">
        <div className="barra-in">
          <Logo />
          <div className="barra-der">
            {cuenta ? (
              <>
                <span role="status">
                  {guardado === "guardando" ? "Guardando…" : guardado === "error" ? "No se pudo guardar. Revise su conexión." : "Cambios guardados"}
                </span>
                {cuenta.esAdmin && <Link href="/despacho">Empresas del despacho</Link>}
                <button className="enlace" onClick={salir}>Salir</button>
              </>
            ) : (
              <>
                <span>Demo: se guarda solo en este navegador</span>
                <Link href="/entrar">Crear cuenta</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="ficha-fondo">
      <section className="ficha">
        <p className="ficha-texto">
          En el centro de trabajo de{" "}
          <input id="razon" type="text" placeholder="su empresa" aria-label="Razón social" value={razon} onChange={(e) => setRazon(e.target.value)} />
          , con{" "}
          <input
            id="trab"
            type="number"
            min={1}
            aria-label="Total de trabajadores"
            value={avance.trabajadores}
            onChange={(e) => cambiar((a) => ({ ...a, trabajadores: Math.max(1, parseInt(e.target.value, 10) || 1) }))}
          />{" "}
          trabajadores, y una UMA de $
          <input
            id="uma"
            type="number"
            min={1}
            step="0.01"
            aria-label="Valor diario de la UMA"
            value={avance.uma}
            onChange={(e) => cambiar((a) => ({ ...a, uma: parseFloat(e.target.value) || UMA_2026 }))}
          />{" "}
          diarios.{" "}
          <label className="marcar">
            <input type="checkbox" checked={avance.reincidencia} onChange={(e) => cambiar((a) => ({ ...a, reincidencia: e.target.checked }))} />
            Hubo sanción por la misma falta en los últimos dos años.
          </label>
        </p>
      </section>

      <div className="pestanas" role="tablist" aria-label="Secciones">
        {PESTANAS.map(([id, nombre]) => (
          <button key={id} role="tab" aria-selected={pestana === id} onClick={() => setPestana(id)}>
            {nombre}
          </button>
        ))}
      </div>
      </div>

      <main className="vista">
        {pestana === "resumen" && <Resumen avance={avance} razon={razon} ir={setPestana} />}
        {pestana === "puntos" && <Puntos avance={avance} cambiar={cambiar} />}
        {pestana === "documentos" && <Documentos avance={avance} cambiar={cambiar} demo={!cuenta} />}
        {pestana === "apercibimientos" && <Apercibimientos avance={avance} cambiar={cambiar} />}
        <div className="nota-legal"><AvisoLegal /></div>
      </main>
      <span className="sr">{r.revisados} de {r.total} puntos revisados</span>
    </>
  );
}

function MapaActa({ avance }: { avance: Avance }) {
  return (
    <>
      <div className="mapa" aria-hidden="true">
        {SECCIONES.map((s) => (
          <div className="mapa-sec" key={s.id}>
            <span>{s.title}</span>
            <div className="mapa-celdas">
              {s.items.map((p) => <i key={p.id} title={p.q} className={`celda ${avance.puntos[p.id]?.st ?? ""}`} />)}
            </div>
          </div>
        ))}
      </div>
      <div className="leyenda" aria-hidden="true">
        <span><i className="celda si" /> SÍ</span>
        <span><i className="celda nm" /> N/M</span>
        <span><i className="celda na" /> N/A</span>
        <span><i className="celda" style={{ outline: "1px solid var(--gris)" }} /> Sin revisar</span>
      </div>
    </>
  );
}

function Resumen({ avance, razon, ir }: { avance: Avance; razon: string; ir: (p: Pestana) => void }) {
  const r = resumen(avance);
  const nm = PUNTOS.filter((p) => avance.puntos[p.id]?.st === "nm");
  const reqNm = DOCUMENTOS.flatMap((d) =>
    d.requisitos.filter((q) => avance.docs[d.id]?.[q.id] === "nm").map((q) => ({ d, q }))
  );
  const plazos = APERCIBIMIENTOS.flatMap((ap) => {
    const e = avance.aperc[ap.id];
    if (!ap.plazo || e?.estado !== "recibido" || !e.fecha) return [];
    return [{ ap, limite: plazoHabil(e.fecha, e.dias ?? ap.plazo.dias) }];
  }).sort((a, b) => a.limite.localeCompare(b.limite));
  const [copiado, setCopiado] = useState("");

  async function copiar() {
    const lineas = [
      `Pendientes de inspección laboral${razon ? ` de ${razon}` : ""}`,
      `Trabajadores: ${avance.trabajadores}. UMA: $${avance.uma}.${avance.reincidencia ? " Con reincidencia." : ""}`,
      "",
      ...nm.map((p) => {
        const m = multaDe(p, avance);
        return `- ${p.q} (${p.f})${m ? `: ${m.s.art}, ${pesos(m.min)} a ${pesos(m.max)}` : ""}`;
      }),
      ...reqNm.map(({ d, q }) => `- ${d.nombre}: ${q.texto} (${q.fundamento})`),
      ...plazos.map(({ ap, limite }) => `- Plazo: ${ap.titulo}, vence ${fechaLarga(limite)}`),
      "",
      `Multa posible: ${pesos(r.min)} a ${pesos(r.max)}. Estimación; la autoridad fija el monto.`
    ];
    try {
      await navigator.clipboard.writeText(lineas.join("\n"));
      setCopiado("Lista copiada.");
    } catch {
      setCopiado("El navegador no permitió copiar. Seleccione el texto a mano.");
    }
  }

  if (!r.revisados && !r.reqRevisados && !plazos.length) {
    return (
      <div className="foja cuenta">
        <h2>Empiece por marcar los puntos que el inspector revisaría hoy</h2>
        <p style={{ maxWidth: "62ch" }}>
          Marque SÍ si puede mostrar el documento en este momento, N/M si no podría y N/A si no aplica a su empresa.
          Si ya recibió una orden, un acta o un emplazamiento, capture primero su fecha para calcular el plazo.
        </p>
        <MapaActa avance={avance} />
        <div className="acciones sobre-noche" style={{ marginTop: 4 }}>
          <button className="btn lleno" onClick={() => ir("puntos")}>Marcar los puntos del acta</button>
          <button className="btn" onClick={() => ir("apercibimientos")}>Capturar un plazo</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="foja cuenta">
        <h2>Si el inspector llegara hoy, el acta asentaría {r.nm} {r.nm === 1 ? "punto" : "puntos"} como N/M</h2>
        <MapaActa avance={avance} />
        <div className="demo-montos">
          <span className="lcd">{pesos(r.min)}</span>
          {r.nm > 0 && <>a <span className="lcd">{pesos(r.max)}</span></>}
        </div>
        <p>Multa posible. La autoridad fija el monto dentro de cada rango.</p>
        <div className="cifras">
          <span><b>{r.revisados} de {r.total}</b> puntos revisados</span>
          <span><b>{r.pct === null ? "Sin datos" : `${r.pct}%`}</b> de cumplimiento en lo revisado</span>
          <span><b>{r.reqRevisados} de {r.reqTotal}</b> requisitos de documentos</span>
        </div>
        <div className="acciones sobre-noche" style={{ marginTop: 4 }}>
          <button className="btn lleno" onClick={copiar}>Copiar lista de pendientes</button>
          <span role="status" style={{ alignSelf: "center", fontSize: 14 }}>{copiado}</span>
        </div>
      </div>

      {plazos.length > 0 && (
        <div className="foja">
          <h3 className="titulo-foja">Plazos corriendo</h3>
          <ul className="lista-nm">
            {plazos.map(({ ap, limite }) => (
              <li key={ap.id} style={{ gridTemplateColumns: "minmax(0,1fr) auto" }}>
                <span>{ap.titulo}<span className="fund">{ap.fundamento}</span></span>
                <span title={`Vence ${fechaLarga(limite)}`}>
                  <span className="sr">Vence {fechaLarga(limite)}</span>
                  <span className="lcd chica" aria-hidden="true">{fechaLcd(limite)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {nm.length > 0 && (
        <div className="foja">
          <h3 className="titulo-foja">Lo que quedaría como N/M</h3>
          <ul className="lista-nm">
            {nm.map((p) => {
              const m = multaDe(p, avance);
              return (
                <li key={p.id}>
                  <span className="chip-marca nm" style={{ justifySelf: "start" }}>N/M</span>
                  <span>{p.q}<span className="fund">{p.f}</span></span>
                  <span className="dinero">{m ? `${pesos(m.min)} a ${pesos(m.max)}` : "Sin multa de la LFT"}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {reqNm.length > 0 && (
        <div className="foja">
          <h3 className="titulo-foja">Requisitos que faltan en sus documentos</h3>
          <ul className="lista-nm">
            {reqNm.map(({ d, q }) => (
              <li key={d.id + q.id} style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
                <span><b style={{ fontWeight: 600 }}>{d.nombre}.</b> {q.texto}<span className="fund">{q.fundamento}</span></span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function Puntos({ avance, cambiar }: { avance: Avance; cambiar: Cambiar }) {
  return (
    <div className="columnas">
      <nav className="indice" aria-label="Apartados del acta">
        {SECCIONES.map((s) => (
          <a key={s.id} href={`#sec-${s.id}`}>
            <span>{s.title}</span>
            <span className="num">{s.items.filter((p) => avance.puntos[p.id]?.st).length}/{s.items.length}</span>
          </a>
        ))}
      </nav>
      <div className="pila">
        <p className="nota-legal">
          Las multas multiplican por trabajador cuando una falta afecta a varios (art. 992 LFT). El art. 61, fr. III
          del Reglamento precisa que eso procede cuando el trabajador sufre un daño personal, real, cierto y evaluable en
          dinero, así que el total es un escenario máximo. Ajuste los afectados en cada punto.
        </p>
        {SECCIONES.map((s, i) => (
          <article key={s.id} id={`sec-${s.id}`} className="foja" style={{ scrollMarginTop: 12 }}>
            <div className="foja-cab">
              <h2>{s.title}</h2>
              <span>Foja {i + 1} de {SECCIONES.length}</span>
            </div>
            {s.fed && (
              <p className="federal">
                Materia federal. El inspector estatal la revisa y reporta lo que detecte a la STPS federal, que es quien sanciona (arts. 527-A y 529 LFT).
              </p>
            )}
            {s.items.map((p) => <FilaPunto key={p.id} p={p} avance={avance} cambiar={cambiar} />)}
          </article>
        ))}
      </div>
    </div>
  );
}

function FilaPunto({ p, avance, cambiar }: { p: Punto; avance: Avance; cambiar: Cambiar }) {
  const st = avance.puntos[p.id]?.st;
  const m = multaDe(p, avance);
  const s = p.s ? SANCIONES[p.s] : undefined;
  const fijar = (cambios: { st?: Marca; aff?: number }) =>
    cambiar((a) => ({ ...a, puntos: { ...a.puntos, [p.id]: { ...a.puntos[p.id], ...cambios } } }));

  return (
    <div className="renglon">
      <div>
        <div className="q">{p.q}</div>
        <div className="d">{p.d}</div>
        <div className="refs">
          <b>{p.f}</b>
          <span>
            {s
              ? `Si falta: ${s.art}, ${numero(s.min)} a ${numero(s.max)} UMA${p.pw ? " por trabajador" : ""}`
              : p.s === "EXT" ? "La multa no viene de la LFT" : "Sin multa directa"}
          </span>
          {p.y27 && <span className="aviso-txt">Registro electrónico obligatorio en 2027</span>}
        </div>
      </div>
      <ControlMarca nombre={`p-${p.id}`} valor={st} etiqueta={p.q} alCambiar={(v) => fijar({ st: v })} />
      {st === "nm" && (
        <div className="obs">
          {m ? (
            <>
              <span className="monto">
                <span className="lcd chica">{pesos(m.min)}</span> a <span className="lcd chica">{pesos(m.max)}</span>
              </span>
              <span>{m.s.what}.{m.s.jail ? " Puede haber pena de prisión." : ""}</span>
              <label>
                Trabajadores afectados
                <input type="number" min={1} value={afectados(p, avance)} onChange={(e) => fijar({ aff: Math.max(1, parseInt(e.target.value, 10) || 1) })} />
              </label>
            </>
          ) : (
            <span>{p.note ?? "Sin multa directa."} Corrija este punto antes de una visita.</span>
          )}
        </div>
      )}
    </div>
  );
}

const ETIQUETA_IA: Record<EstadoIA, string> = {
  cumple: "Consta",
  no_cumple: "No consta",
  no_determinable: "No se puede saber"
};

function Documentos({ avance, cambiar, demo }: { avance: Avance; cambiar: Cambiar; demo: boolean }) {
  const [id, setId] = useState(DOCUMENTOS[0].id);
  const doc = DOCUMENTOS.find((d) => d.id === id)!;
  const grupos = [...new Set(DOCUMENTOS.map((d) => d.grupo))];
  const s = doc.sancion ? SANCIONES[doc.sancion] : undefined;

  return (
    <div className="columnas">
      <nav className="indice" aria-label="Documentos">
        {grupos.map((g) => (
          <div key={g} style={{ display: "contents" }}>
            <div className="grupo">{g}</div>
            {DOCUMENTOS.filter((d) => d.grupo === g).map((d) => {
              const hechos = d.requisitos.filter((q) => avance.docs[d.id]?.[q.id]).length;
              return (
                <button key={d.id} aria-current={d.id === id} onClick={() => setId(d.id)}>
                  <span>{d.nombre}</span>
                  <span className="num">{hechos}/{d.requisitos.length}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <article className="foja">
        <div className="foja-cab"><h2>{doc.nombre}</h2></div>
        <div className="datos-doc">
          <p>{doc.queRevisa}</p>
          {doc.periodo && <p><b>Periodo:</b> {doc.periodo}</p>}
          {doc.conservacion && <p><b>Conservación:</b> {doc.conservacion}</p>}
          <p>
            <b>Si falta:</b>{" "}
            {s ? `${s.art}, de ${numero(s.min)} a ${numero(s.max)} UMA.` : doc.sancion === "EXT" ? "la multa no viene de la LFT; corresponde a la autoridad migratoria." : "sin multa directa, pero afecta quién y cómo atiende la diligencia."}
          </p>
        </div>
        {doc.requisitos.map((q) => {
          const ia = avance.ia[doc.id]?.requisitos.find((x) => x.id === q.id);
          return (
            <div className="renglon" key={q.id}>
              <div>
                <div className="q" style={{ fontWeight: 500 }}>{q.texto}</div>
                <div className="refs"><b>{q.fundamento}</b></div>
              </div>
              <ControlMarca
                nombre={`d-${doc.id}-${q.id}`}
                valor={avance.docs[doc.id]?.[q.id]}
                etiqueta={q.texto}
                alCambiar={(v) => cambiar((a) => ({ ...a, docs: { ...a.docs, [doc.id]: { ...a.docs[doc.id], [q.id]: v } } }))}
              />
              {ia && (
                <div className="res" style={{ gridColumn: "1 / -1" }}>
                  <span className={`estado ${ia.estado}`}>IA: {ETIQUETA_IA[ia.estado]}</span>
                  <span className="evid">{ia.evidencia}</span>
                </div>
              )}
            </div>
          );
        })}
        <RevisionIA key={doc.id} docId={doc.id} muestra={doc.muestra} resultado={avance.ia[doc.id]} demo={demo} cambiar={cambiar} />
      </article>
    </div>
  );
}

function RevisionIA({ docId, muestra, resultado, demo, cambiar }: { docId: string; muestra: string; resultado?: ResultadoIA; demo: boolean; cambiar: Cambiar }) {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [acepta, setAcepta] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [fallo, setFallo] = useState("");

  async function revisar() {
    if (!archivo) return;
    setEnviando(true);
    setFallo("");
    const datos = new FormData();
    datos.set("documento", docId);
    datos.set("archivo", archivo);
    datos.set("consentimiento", acepta ? "si" : "no");
    try {
      const { data: sesion } = await clienteNavegador().auth.getSession();
      const r = await fetch(funcion("revisar"), {
        method: "POST",
        headers: { Authorization: `Bearer ${sesion.session?.access_token ?? ""}` },
        body: datos
      });
      const json = await r.json();
      if (!r.ok) setFallo(json.error);
      else cambiar((a) => ({ ...a, ia: { ...a.ia, [docId]: json } }));
    } catch {
      setFallo("No hubo conexión con el servidor. Intente de nuevo.");
    }
    setEnviando(false);
  }

  function aplicar() {
    if (!resultado) return;
    cambiar((a) => {
      const marcas = { ...a.docs[docId] };
      for (const q of resultado.requisitos) {
        if (q.estado === "cumple") marcas[q.id] = "si";
        if (q.estado === "no_cumple") marcas[q.id] = "nm";
      }
      return { ...a, docs: { ...a.docs, [docId]: marcas } };
    });
  }

  return (
    <section className="ia">
      {enviando && <div className="ia-barrido" aria-hidden="true" />}
      <h3>Revisar el documento con IA</h3>
      {demo ? (
        <p style={{ fontSize: 15 }}>
          La revisión con IA requiere una <Link href="/entrar">cuenta de empresa</Link>. En la demo puede marcar los requisitos a mano.
        </p>
      ) : (
        <>
          <p style={{ fontSize: 15 }}>Claude compara el archivo contra esta lista. Es una primera lectura que su abogado debe confirmar. Conviene subir: {muestra}</p>
          <div className="ia-fila">
            <input
              type="file"
              aria-label="Archivo a revisar"
              accept=".pdf,.docx,.png,.jpg,.jpeg,.webp"
              onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
            />
          </div>
          <label className="marcar" style={{ fontSize: 14 }}>
            <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} />
            Taché nombres, CURP, RFC, domicilios y salarios que no hacen falta. Acepto enviar el archivo a Anthropic para esta revisión.
          </label>
          <div className="ia-fila">
            <button className="btn lleno" disabled={!archivo || !acepta || enviando} onClick={revisar}>
              {enviando ? "Revisando, puede tardar un minuto…" : "Revisar con IA"}
            </button>
            <small>PDF, Word o imagen, hasta 4 MB. Este sitio no guarda el archivo.</small>
          </div>
          {fallo && <p className="aviso mal" role="alert">{fallo}</p>}
        </>
      )}
      {resultado && (
        <>
          {!resultado.documento_reconocido && (
            <p className="aviso mal">El archivo no parece corresponder a este tipo de documento.</p>
          )}
          <p><b style={{ fontWeight: 600 }}>Resultado:</b> {resultado.resumen}</p>
          {resultado.observaciones.length > 0 && (
            <>
              <b style={{ fontWeight: 600, fontSize: 14.5 }}>Para revisar con su abogado</b>
              <ul>{resultado.observaciones.map((o) => <li key={o}>{o}</li>)}</ul>
            </>
          )}
          <div className="ia-fila sobre-noche">
            <button className="btn" onClick={aplicar}>Aplicar a mi lista</button>
            <small>Marca SÍ o N/M donde la IA encontró una respuesta. Lo que no se pueda saber queda como está.</small>
          </div>
        </>
      )}
    </section>
  );
}

function Apercibimientos({ avance, cambiar }: { avance: Avance; cambiar: Cambiar }) {
  return (
    <>
      <p className="nota-legal">
        En orden del procedimiento. &ldquo;Apercibimiento&rdquo; es una advertencia expresa de la norma o del formato; &ldquo;efecto
        legal&rdquo; opera aunque nadie lo advierta. Su orden o emplazamiento puede decir algo distinto: en ese caso prevalece el texto que usted recibió.
      </p>
      <ol className="linea">
        {APERCIBIMIENTOS.map((ap) => {
          const e = avance.aperc[ap.id] ?? {};
          const fijar = (c: typeof e) => cambiar((a) => ({ ...a, aperc: { ...a.aperc, [ap.id]: { ...a.aperc[ap.id], ...c } } }));
          const dias = e.dias ?? ap.plazo?.dias;
          const limite = ap.plazo && e.fecha && dias ? plazoHabil(e.fecha, dias) : null;
          const vencido = limite && limite < hoy();
          return (
            <li key={ap.id} className="paso">
              <div className="paso-cab">
                <span className="etapa">{ap.etapa}</span>
                <span className={`sello-tipo ${ap.tipo === "efecto" ? "efecto" : ""}`}>
                  {ap.tipo === "apercibimiento" ? "Apercibimiento" : "Efecto legal"}
                </span>
                <h3>{ap.titulo}</h3>
              </div>
              <div className="dos">
                <p><b>Qué dice</b>{ap.dice}</p>
                <p><b>Qué pasa si no se atiende</b>{ap.consecuencia}</p>
                <p style={{ gridColumn: "1 / -1" }}><b>Qué hacer</b>{ap.hacer}</p>
              </div>
              <p className="fund">{ap.fundamento}</p>
              <div className="control">
                <label>
                  ¿En qué va su empresa?
                  <select value={e.estado ?? "sin"} onChange={(ev) => fijar({ estado: ev.target.value as "sin" | "recibido" | "atendido" })}>
                    <option value="sin">No me ha ocurrido</option>
                    <option value="recibido">Lo recibí, está pendiente</option>
                    <option value="atendido">Ya lo atendí</option>
                  </select>
                </label>
                {ap.plazo && e.estado && e.estado !== "sin" && (
                  <>
                    <label>
                      {ap.plazo.desde}
                      <input type="date" value={e.fecha ?? ""} onChange={(ev) => fijar({ fecha: ev.target.value })} />
                    </label>
                    {ap.plazo.editable && (
                      <label>
                        Días hábiles
                        <input type="number" min={1} value={dias} onChange={(ev) => fijar({ dias: Math.max(1, parseInt(ev.target.value, 10) || 1) })} />
                      </label>
                    )}
                  </>
                )}
              </div>
              {ap.plazo && e.estado && e.estado !== "sin" && (
                limite ? (
                  <div className={`limite ${e.estado === "atendido" ? "listo" : vencido ? "vencido" : ""}`}>
                    <span className="lcd" aria-hidden="true">{fechaLcd(limite)}</span>
                    <p>
                      {e.estado === "atendido" ? "Atendido. El plazo vencía el " : vencido ? "El plazo venció el " : "El plazo vence el "}
                      {fechaLarga(limite)}. {ap.plazo.nota} Descuenta sábados, domingos y descansos del art. 74 LFT; la autoridad puede declarar otros días inhábiles.
                    </p>
                  </div>
                ) : (
                  <p className="fund">Capture la fecha para calcular el plazo.</p>
                )
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}
