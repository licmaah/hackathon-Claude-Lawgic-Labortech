"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ruta } from "@/lib/ruta";
import { Marca } from "./Marca";

const FILAS = [
  ["Contrato individual", "nm", "N/M"],
  ["Reglamento interior", "si", "SÍ"],
  ["Reparto de utilidades", "si", "SÍ"],
  ["Aguinaldo", "nm", "N/M"],
  ["Teletrabajo", "na", "N/A"]
] as const;

const PALABRA = "Inspección";

export function Sello() {
  return <div className="sello cara">N/M</div>;
}

export function Chip() {
  return <div className="chip">IA</div>;
}

export function EscenaHero() {
  const escena = useRef<HTMLDivElement>(null);

  // Mueve los objetos con el cursor y con el scroll. Sin cursor fino o con movimiento reducido, se quedan en su lugar.
  useEffect(() => {
    const el = escena.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cursorFino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const ancha = window.matchMedia("(min-width: 761px)");
    const meta = { x: 0, y: 0 };
    const actual = { x: 0, y: 0, p: 0 };
    let cuadro = 0;
    let visible = true;

    const objetivoP = () => {
      if (!ancha.matches) return 0;
      const recorrido = (el.parentElement?.offsetHeight ?? 0) - el.offsetHeight;
      const inicio = el.parentElement?.offsetTop ?? 0;
      return recorrido > 0 ? Math.min(1, Math.max(0, (window.scrollY - inicio) / recorrido)) : 0;
    };

    const pintar = () => {
      cuadro = 0;
      const p = objetivoP();
      actual.x += (meta.x - actual.x) * 0.075;
      actual.y += (meta.y - actual.y) * 0.075;
      actual.p += (p - actual.p) * 0.14;
      el.style.setProperty("--mx", actual.x.toFixed(4));
      el.style.setProperty("--my", actual.y.toFixed(4));
      el.style.setProperty("--p", actual.p.toFixed(4));
      const quieto = Math.abs(meta.x - actual.x) + Math.abs(meta.y - actual.y) + Math.abs(p - actual.p) < 0.001;
      if (!quieto && visible) cuadro = requestAnimationFrame(pintar);
    };
    const pedir = () => {
      if (!cuadro && visible) cuadro = requestAnimationFrame(pintar);
    };
    const alMover = (e: PointerEvent) => {
      meta.x = e.clientX / window.innerWidth - 0.5;
      meta.y = e.clientY / window.innerHeight - 0.5;
      pedir();
    };

    const vigia = new IntersectionObserver(([entrada]) => {
      visible = entrada.isIntersecting;
      el.querySelectorAll<HTMLElement>(".obj-flota, .barrido").forEach((n) => {
        n.style.animationPlayState = visible ? "running" : "paused";
      });
      pedir();
    });
    vigia.observe(el);

    if (cursorFino) window.addEventListener("pointermove", alMover, { passive: true });
    window.addEventListener("scroll", pedir, { passive: true });
    pedir();

    return () => {
      vigia.disconnect();
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("scroll", pedir);
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <div className="rail">
      <section className="escena" ref={escena}>
        <div className="escena-nav">
          <Marca />
          <nav className="escena-menu" aria-label="Secciones">
            <Link href="/calculadora">Calculadora gratis</Link>
            <Link href="/repositorios">Repositorios</Link>
            <Link href="/entrar" className="btn">Entrar</Link>
          </nav>
        </div>

        <p className="palabra" aria-hidden="true">
          <span><i>{PALABRA}</i></span>
        </p>

        <div className="objetos" aria-hidden="true">
          <div className="obj o-chip"><div className="obj-entra"><div className="obj-flota"><Chip /></div></div></div>
          <div className="obj o-cred">
            <div className="obj-entra"><div className="obj-flota">
              <div className="cred cara">
                <div className="cred-foto" />
                <div>
                  <b>Inspector del trabajo</b>
                  <small>Pida la credencial vigente y la orden por escrito.</small>
                </div>
              </div>
            </div></div>
          </div>
          <div className="obj o-acta">
            <div className="obj-entra"><div className="obj-flota">
              <div className="acta cara">
                <div className="acta-cab">
                  <b>Acta de inspección</b>
                  <small>Condiciones generales de trabajo</small>
                </div>
                {FILAS.map(([texto, tipo, marca], i) => (
                  <div className="acta-fila" key={texto}>
                    <span>{texto}</span>
                    <span className={`chip-marca ${tipo}`} style={{ "--i": i } as React.CSSProperties}>{marca}</span>
                  </div>
                ))}
                <div className="acta-pie">Revisando con IA</div>
                <div className="barrido" />
              </div>
            </div></div>
          </div>
          <div className="obj o-reloj">
            <div className="obj-entra"><div className="obj-flota">
              <img src={ruta("/logo-labortech-reloj.png")} alt="" width={751} height={1453} />
            </div></div>
          </div>
          <div className="obj o-sello"><div className="obj-entra"><div className="obj-flota"><Sello /></div></div></div>
        </div>

        <div className="escena-texto">
          <div>
            <h1>Revise su empresa antes de que la revise el inspector</h1>
            <p>Vea qué asentaría el acta hoy, qué multa prevé la ley y qué plazo corre después de cada apercibimiento.</p>
          </div>
          <div className="acciones">
            <Link href="/demo" className="btn lleno">Probar sin cuenta</Link>
            <Link href="/entrar" className="btn">Crear cuenta de empresa</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
