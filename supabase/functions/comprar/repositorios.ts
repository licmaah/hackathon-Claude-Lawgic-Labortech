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

// Proyectos ficticios para la evaluación del hackathon: no existen ni se venden. Los precios en pesos también son de demostración.
export const A_LA_VENTA: { id: string; nombre: string; incluye: string; tecnologia: string; precio: number | null }[] = [
  {
    id: "contratos-2027",
    nombre: "Contratos 2027",
    incluye: "Generaría contratos individuales con los requisitos del art. 25 LFT y adendums por reducción de jornada.",
    tecnologia: "Next.js y Claude",
    precio: 2490
  },
  {
    id: "reglamento-inteligente",
    nombre: "Reglamento inteligente",
    incluye: "Compararía un reglamento interior contra el art. 423 LFT y propondría los capítulos que faltan, incluida la Ley Silla.",
    tecnologia: "Claude y Supabase",
    precio: 2990
  },
  {
    id: "respuesta-inspeccion",
    nombre: "Respuesta a inspección",
    incluye: "Leería un acta, ordenaría la carpeta de pruebas y prepararía el borrador del escrito de observaciones para revisión del abogado.",
    tecnologia: "Claude y Next.js",
    precio: 4490
  },
  {
    id: "terminaciones",
    nombre: "Terminaciones",
    incluye: "Conectaría la calculadora con los borradores de renuncia, convenio, recibo de finiquito y aviso de rescisión.",
    tecnologia: "TypeScript y Claude",
    precio: 3490
  },
  {
    id: "protocolos-y-actas",
    nombre: "Protocolos y actas",
    incluye: "Guiaría el protocolo del art. 132, fr. XXXI LFT y las actas administrativas con derecho de audiencia.",
    tecnologia: "Next.js y Supabase",
    precio: 1990
  }
];
