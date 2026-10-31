# LaborTech Inspección

Proyecto para el Hackathon de Lawgic, hecho por un abogado laboralista de Tijuana con Claude Code.

Una empresa en Baja California puede recibir hoy a un inspector de la Secretaría del Trabajo. Este sitio le permite revisarse antes con el mismo orden del acta oficial, saber qué debe contener cada documento y no perder de vista los plazos después de un apercibimiento.

## Qué hace

| Módulo | Qué resuelve |
|---|---|
| **Puntos del acta** | 43 puntos con la notación del formato oficial: SÍ, N/M (no mostrado) y N/A. Cada N/M muestra su fundamento y la multa posible en pesos. |
| **Documentos** | 17 documentos laborales con 100 requisitos de ley, periodo que pide el inspector y tiempo de conservación. |
| **Revisión con IA** | Claude compara el contrato, reglamento o recibo que suba la empresa contra la lista cerrada de ese documento y señala dónde encontró cada requisito. |
| **Apercibimientos** | 9 etapas, de la puerta del centro de trabajo al juicio: qué advierte la autoridad, qué pasa si no se atiende y cuándo vence el plazo en días hábiles. |
| **Resumen** | Lo que el acta asentaría hoy, la multa posible, los plazos corriendo y una lista de pendientes para copiar. |
| **Despacho** | El abogado ve el avance de cada empresa cliente en una sola tabla. |
| **Calculadora** | Finiquitos, liquidaciones, salarios caídos, tiempo extra, descansos y PTU, gratis y sin enviar datos. Está en `/calculadora`. |
| **Repositorios** | 2 gratuitos, en `public/repositorios/`, y 5 proyectos ficticios con precios de demostración para mostrar el flujo de venta en modo de prueba de Stripe. Está en `/repositorios`. |

Pruébelo sin cuenta en `/demo`. La revisión con IA requiere cuenta.

Video de presentación: [`video/labortech-inspeccion.mp4`](video/labortech-inspeccion.mp4), con su fuente en `video/`.

## Criterio legal del diseño

- **El modelo no calcula ni cita por su cuenta.** Multas y plazos salen de código determinista con pruebas (`src/lib/reglas.ts`). Claude evalúa solo los requisitos de una lista cerrada, y la interfaz aclara que un abogado debe confirmar el resultado.
- **Ante la duda, "no se puede saber".** Un contrato no acredita un pago ni un depósito ante la autoridad. El modelo debe distinguirlo en lugar de dar el punto por cumplido.
- **El documento es material de revisión, no instrucciones.** El sistema le indica al modelo que ignore órdenes dentro del archivo.
- **Privacidad.** El archivo no se guarda. Se pide tachar datos personales antes de subirlo y el resultado no debe reproducirlos.
- **Separación por empresa.** Las políticas de seguridad a nivel de fila (RLS) de Supabase impiden que una empresa vea o edite a otra. El despacho puede leer, no editar.

## Fuentes

- Ley Federal del Trabajo, última reforma DOF 14-05-2026.
- Reglamento General de Inspección del Trabajo y Aplicación de Sanciones, última reforma DOF 23-08-2022.
- Decreto de jornada, DOF 01-05-2026, artículos transitorios.
- Formato de Acta de Inspección Extraordinaria de Condiciones Generales de Trabajo de la STPS de Baja California. De ese formato se usa solo su estructura; este repositorio no contiene expedientes ni datos de clientes.

Puntos abiertos que un abogado debe verificar:

- Si Baja California tiene reglamento local de inspección. El formato de acta cita el reglamento federal y no se localizó uno estatal.
- Las reglas de la STPS para el registro electrónico de jornada, que rigen desde el 1 de enero de 2027.
- Los días inhábiles que declare cada autoridad, además de los del art. 74 LFT.

## Tecnología

Sitio estático con Next.js 15 para GitHub Pages. Supabase da la autenticación, Postgres con RLS y las funciones que llaman a la API de Claude (`claude-opus-5-5`, salida estructurada con esquema JSON) y a Stripe en modo de prueba.

```
src/datos/        catálogo legal: puntos, documentos, apercibimientos
src/lib/reglas.ts plazos y multas, con pruebas en pruebas/
supabase/functions/    revisión con Claude y pago de prueba
src/componentes/Panel.tsx     panel de la empresa
supabase/migrations/          esquema y políticas RLS
```

## Cómo correrlo

```bash
npm install
cp .env.example .env.local
npm run dev
```

Complete `.env.local` con la URL y la clave publicable de Supabase. Guarde `ANTHROPIC_API_KEY` y `STRIPE_SECRET_KEY` como secretos de las funciones de Supabase; el pago solo acepta claves `sk_test_`. Aplique la migración de `supabase/migrations/`. Para dar acceso de despacho, inserte el `user_id` de la cuenta en la tabla `admins`.

```bash
npm test
```

## Aviso

Esta herramienta es una guía preventiva y no constituye asesoría legal. El aviso de privacidad es un borrador: debe completarse y revisarse antes de recibir información de clientes reales.
