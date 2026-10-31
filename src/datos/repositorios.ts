export const GITHUB = "https://github.com/licmaah/hackathon-Claude-Lawgic-Labortech";

export const GRATUITOS = [
  {
    id: "calculadora-laboral",
    nombre: "Calculadora laboral",
    descripcion: "Finiquitos, liquidaciones, salarios caídos, tiempo extra, descansos y PTU, con el desglose y el artículo de cada concepto.",
    abrir: "/calculadora",
    accion: "Abrir la calculadora",
    github: `${GITHUB}/tree/main/public/repositorios/calculadora-laboral`
  },
  {
    id: "autodiagnostico-inspeccion",
    nombre: "Autodiagnóstico de inspección",
    descripcion: "Los 43 puntos del acta de Baja California en un solo archivo, con multas, guía para recibir al inspector y plazo de 5 días.",
    abrir: "/repositorios/autodiagnostico-inspeccion/index.html",
    accion: "Abrir el autodiagnóstico",
    github: `${GITHUB}/tree/main/public/repositorios/autodiagnostico-inspeccion`
  }
] as const;

// Propuesta de Manuel pendiente de contenido. El precio en pesos se captura aquí cuando lo defina.
export const A_LA_VENTA: { id: string; nombre: string; incluye: string; precio: number | null }[] = [
  {
    id: "contratacion-2027",
    nombre: "Contratación con adendum 2027",
    incluye: "Contrato individual con los requisitos del art. 25 LFT y adendum por reducción de jornada.",
    precio: null
  },
  {
    id: "reglamento-interior",
    nombre: "Reglamento interior con Ley Silla",
    incluye: "Reglamento conforme al art. 423 LFT, acta de la comisión mixta y guía de depósito.",
    precio: null
  },
  {
    id: "respuesta-inspeccion",
    nombre: "Respuesta a inspección",
    incluye: "Protocolo de visita, orden de la carpeta y formato de escrito de observaciones y pruebas.",
    precio: null
  },
  {
    id: "terminacion-relacion",
    nombre: "Terminación de la relación",
    incluye: "Renuncia, convenio, recibo de finiquito y aviso de rescisión.",
    precio: null
  },
  {
    id: "protocolo-actas",
    nombre: "Protocolo y actas",
    incluye: "Protocolo del art. 132, fr. XXXI LFT y formatos de acta administrativa con derecho de audiencia.",
    precio: null
  }
];
