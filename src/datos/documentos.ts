// Requisitos por documento. Cada texto sale de la LFT (última reforma DOF 14-05-2026),
// del RGITAS (última reforma DOF 23-08-2022) o del formato de acta de la STPS de Baja California.

export type Requisito = { id: string; texto: string; fundamento: string };

export type Documento = {
  id: string;
  nombre: string;
  grupo: "Empresa" | "Contratación" | "Jornada y pago" | "Prestaciones" | "Reglas internas" | "Casos especiales";
  queRevisa: string;
  periodo?: string;
  conservacion?: string;
  sancion: string | null;
  muestra: string;
  requisitos: Requisito[];
};

const CONSERVAR_CONTRATO = "Mientras dure la relación de trabajo y hasta un año después (art. 804 LFT).";
const CONSERVAR_PAGOS = "Durante el último año y un año después de que termine la relación de trabajo (art. 804 LFT).";

export const DOCUMENTOS: Documento[] = [
  {
    id: "empresa",
    nombre: "Identificación de la empresa",
    grupo: "Empresa",
    queRevisa: "Con estos documentos el inspector asienta quién es la empresa y quién la representa en la diligencia.",
    sancion: null,
    muestra: "Constancia de situación fiscal o acta constitutiva.",
    requisitos: [
      { id: "csf", texto: "Constancia de situación fiscal con la razón social y el domicilio del centro de trabajo", fundamento: "Formato de acta STPS BC" },
      { id: "constitutiva", texto: "Acta constitutiva con fecha, número, volumen y notario o corredor público", fundamento: "Formato de acta STPS BC" },
      { id: "objeto", texto: "Objeto social y actividad real de la empresa identificados", fundamento: "Formato de acta STPS BC" },
      { id: "rfc", texto: "RFC y registro patronal ante el IMSS, con su prima de riesgo", fundamento: "Formato de acta STPS BC" },
      { id: "poder", texto: "Poder del representante legal disponible en el centro de trabajo", fundamento: "Formato de acta STPS BC; art. 35 RGITAS" }
    ]
  },
  {
    id: "seguridad-social",
    nombre: "IMSS, INFONAVIT e INFONACOT",
    grupo: "Empresa",
    queRevisa: "El acta enlista los comprobantes de cuotas y aportaciones de los periodos que señala la orden.",
    periodo: "5 pagos mensuales del IMSS y 3 bimestrales de INFONAVIT y SAR (ejemplo del formato; la orden fija el periodo).",
    conservacion: CONSERVAR_PAGOS,
    sancion: "1002",
    muestra: "Línea de captura SIPARE, resumen de liquidación o cédula de determinación.",
    requisitos: [
      { id: "imss", texto: "Comprobantes de pago mensual al IMSS de los periodos requeridos", fundamento: "Art. 804, fr. IV LFT" },
      { id: "infonavit", texto: "Comprobantes bimestrales de INFONAVIT y SAR de los periodos requeridos", fundamento: "Arts. 136 y 804, fr. IV LFT" },
      { id: "formatos", texto: "Línea de captura SIPARE, resumen de liquidación y cédula de determinación de cuotas", fundamento: "Formato de acta STPS BC, observación 10" },
      { id: "listado", texto: "Listado de trabajadores afiliados que emite el IMSS", fundamento: "Formato de acta STPS BC, observación 10" },
      { id: "infonacot", texto: "Registro de afiliación del centro de trabajo al INFONACOT", fundamento: "Art. 132, fr. XXVI Bis LFT" }
    ]
  },
  {
    id: "contrato",
    nombre: "Contrato individual de trabajo",
    grupo: "Contratación",
    queRevisa: "El inspector pide los contratos de todo el personal cuando no hay contrato colectivo aplicable.",
    periodo: "Todos los empleados.",
    conservacion: CONSERVAR_CONTRATO,
    sancion: "1002",
    muestra: "Un contrato tipo o un contrato con los datos personales tachados.",
    requisitos: [
      { id: "escrito", texto: "Consta por escrito, en al menos dos ejemplares, uno para cada parte", fundamento: "Art. 24 LFT" },
      { id: "datos", texto: "Nombre, nacionalidad, edad, sexo, estado civil, CURP, RFC y domicilio del trabajador y del patrón", fundamento: "Art. 25, fr. I LFT" },
      { id: "tipo", texto: "Tipo de relación: obra, tiempo determinado, temporada, capacitación inicial o tiempo indeterminado, y si hay periodo de prueba", fundamento: "Art. 25, fr. II LFT" },
      { id: "servicios", texto: "Servicios a prestar, determinados con la mayor precisión posible", fundamento: "Art. 25, fr. III LFT" },
      { id: "lugar", texto: "Lugar o lugares donde se presta el trabajo", fundamento: "Art. 25, fr. IV LFT" },
      { id: "jornada", texto: "Duración de la jornada", fundamento: "Art. 25, fr. V LFT" },
      { id: "salario", texto: "Forma y monto del salario", fundamento: "Art. 25, fr. VI LFT" },
      { id: "pago", texto: "Día y lugar de pago del salario", fundamento: "Art. 25, fr. VII LFT" },
      { id: "capacitacion", texto: "Indicación de que el trabajador será capacitado o adiestrado", fundamento: "Art. 25, fr. VIII LFT" },
      { id: "otras", texto: "Otras condiciones: días de descanso, vacaciones y las demás que convengan", fundamento: "Art. 25, fr. IX LFT" },
      { id: "beneficiarios", texto: "Designación de beneficiarios para salarios y prestaciones devengados y no cobrados", fundamento: "Art. 25, fr. X y art. 501 LFT" }
    ]
  },
  {
    id: "adendum-jornada",
    nombre: "Adendum por reducción de jornada",
    grupo: "Contratación",
    queRevisa: "La reforma de jornada reduce el máximo semanal de forma gradual. El ajuste del contrato no puede bajar lo que el trabajador ya percibe.",
    conservacion: CONSERVAR_CONTRATO,
    sancion: "1002",
    muestra: "El adendum o convenio modificatorio firmado.",
    requisitos: [
      { id: "firma", texto: "Consta por escrito y firmado por trabajador y patrón", fundamento: "Art. 24 LFT" },
      { id: "jornada", texto: "Señala la nueva jornada dentro del máximo legal del año (48 horas en 2026, 46 en 2027)", fundamento: "Transitorio segundo, DOF 01-05-2026" },
      { id: "salario", texto: "No disminuye sueldos, salarios ni prestaciones", fundamento: "Transitorio séptimo, DOF 01-05-2026" },
      { id: "distribucion", texto: "Si redistribuye las horas, lo hace de común acuerdo", fundamento: "Art. 58, segundo párrafo LFT" },
      { id: "registro", texto: "Acuerda el registro electrónico de jornada si se quiere que haga prueba plena", fundamento: "Art. 132, fr. XXXIV LFT" }
    ]
  },
  {
    id: "finiquito",
    nombre: "Finiquitos y bajas",
    grupo: "Contratación",
    queRevisa: "El acta pide los finiquitos firmados del periodo y las bajas ante el IMSS.",
    periodo: "El que señale la orden; en el formato suele ser el último mes.",
    conservacion: CONSERVAR_PAGOS,
    sancion: "1002",
    muestra: "Un finiquito o convenio con los datos personales tachados.",
    requisitos: [
      { id: "escrito", texto: "Convenio o liquidación por escrito", fundamento: "Art. 33 LFT" },
      { id: "relacion", texto: "Relación circunstanciada de los hechos que lo motivan y de los derechos comprendidos", fundamento: "Art. 33 LFT" },
      { id: "sin-renuncia", texto: "No contiene renuncia a salarios devengados, indemnizaciones ni otras prestaciones", fundamento: "Art. 33 LFT" },
      { id: "ratificacion", texto: "Ratificado ante el Centro de Conciliación o el Tribunal, cuando se trate de convenio", fundamento: "Art. 33 LFT" },
      { id: "proporcionales", texto: "Incluye vacaciones y aguinaldo proporcionales al tiempo trabajado", fundamento: "Arts. 79 y 87 LFT" },
      { id: "baja", texto: "Acuse de baja ante el IMSS", fundamento: "Art. 15, fr. I LSS, citado en el formato de acta" }
    ]
  },
  {
    id: "asistencia",
    nombre: "Controles de asistencia y jornada",
    grupo: "Jornada y pago",
    queRevisa: "El inspector compara las bitácoras de horario con el tipo y la duración de cada jornada.",
    periodo: "El que señale la orden; en el formato suele ser el último mes.",
    conservacion: CONSERVAR_PAGOS,
    sancion: "1002",
    muestra: "El reporte de asistencia con los nombres tachados.",
    requisitos: [
      { id: "todos", texto: "Listas o controles de asistencia de todo el personal", fundamento: "Art. 804, fr. III LFT" },
      { id: "jornada", texto: "Bitácora del tipo y duración de la jornada de cada empleado", fundamento: "Arts. 59 a 62 LFT, citados en el formato de acta" },
      { id: "descanso", texto: "Registra o permite acreditar el descanso de al menos media hora en jornada continua", fundamento: "Art. 63 LFT" },
      { id: "electronico", texto: "Plan de registro electrónico con hora de inicio y fin; sus reglas rigen desde el 1 de enero de 2027", fundamento: "Art. 132, fr. XXXIV LFT; transitorio quinto, DOF 01-05-2026" }
    ]
  },
  {
    id: "nomina",
    nombre: "Nómina y recibos de salario",
    grupo: "Jornada y pago",
    queRevisa: "El inspector revisa el pago semanal o quincenal y que nadie gane menos del salario mínimo.",
    periodo: "El que señale la orden; en el formato suele ser el último mes.",
    conservacion: CONSERVAR_PAGOS,
    sancion: "1002",
    muestra: "Un recibo con el nombre tachado.",
    requisitos: [
      { id: "recibos", texto: "Listas de raya, nóminas o recibos firmados, o recibos timbrados con dispersión bancaria", fundamento: "Art. 804, fr. II LFT; formato de acta, observación 5" },
      { id: "periodicidad", texto: "Pago semanal a quien hace trabajo material y quincenal a los demás", fundamento: "Art. 88 LFT" },
      { id: "moneda", texto: "Pago en moneda de curso legal, sin vales, fichas ni mercancías", fundamento: "Art. 101 LFT" },
      { id: "electronico", texto: "Consentimiento del trabajador para el depósito o transferencia, sin costo para él", fundamento: "Art. 101 LFT" },
      { id: "minimo", texto: "Salario no menor al mínimo vigente: $440.87 diarios en la frontera norte (2026)", fundamento: "Art. 90 LFT" }
    ]
  },
  {
    id: "pagos-especiales",
    nombre: "Tiempo extra, domingos y festivos",
    grupo: "Jornada y pago",
    queRevisa: "El acta pide por separado los pagos con recargo y anota qué festivos laboró la empresa.",
    periodo: "El que señale la orden; en el formato suele ser el último mes y los festivos que indique.",
    conservacion: CONSERVAR_PAGOS,
    sancion: "1002",
    muestra: "Un recibo con estos conceptos y el nombre tachado.",
    requisitos: [
      { id: "extra", texto: "Horas extra dentro del límite (9 a la semana en 2026 y 2027), pagadas con 100% más", fundamento: "Art. 66 LFT; transitorio cuarto, DOF 01-05-2026" },
      { id: "excedente", texto: "Las horas que rebasen el límite, pagadas con 200% más; no más de 4 horas a la semana", fundamento: "Art. 68 LFT" },
      { id: "dominical", texto: "Prima dominical de al menos 25% sobre el salario ordinario", fundamento: "Art. 71 LFT" },
      { id: "descanso", texto: "Salario doble por trabajar en el descanso semanal, además del salario del descanso", fundamento: "Art. 73 LFT" },
      { id: "festivos", texto: "Salario doble adicional por cada descanso obligatorio trabajado", fundamento: "Arts. 74 y 75 LFT" }
    ]
  },
  {
    id: "vacaciones",
    nombre: "Vacaciones y prima vacacional",
    grupo: "Prestaciones",
    queRevisa: "El acta pide el periodo más reciente de cada trabajador: solicitud firmada y recibo de pago.",
    periodo: "Periodo más reciente de cada trabajador.",
    conservacion: CONSERVAR_PAGOS,
    sancion: "994-I",
    muestra: "Solicitud y recibo con el nombre tachado.",
    requisitos: [
      { id: "dias", texto: "Días según antigüedad: 12 el primer año, 2 más por año hasta 20, y 2 más por cada 5 años desde el sexto", fundamento: "Art. 76 LFT" },
      { id: "continuos", texto: "Al menos 12 días continuos; el trabajador decide cómo distribuir el periodo", fundamento: "Art. 78 LFT" },
      { id: "sin-compensar", texto: "No se sustituyen por dinero mientras dure la relación", fundamento: "Art. 79 LFT" },
      { id: "prima", texto: "Prima vacacional de al menos 25%", fundamento: "Art. 80 LFT" },
      { id: "plazo", texto: "Concedidas dentro de los 6 meses siguientes a cumplir el año", fundamento: "Art. 81 LFT" },
      { id: "constancia", texto: "Constancia anual con antigüedad, periodo que corresponde y fecha de disfrute", fundamento: "Art. 81 LFT" },
      { id: "solicitud", texto: "Solicitud firmada y recibo firmado o timbrado con dispersión bancaria", fundamento: "Art. 804, fr. IV LFT; formato de acta, observación 4" }
    ]
  },
  {
    id: "aguinaldo",
    nombre: "Aguinaldo",
    grupo: "Prestaciones",
    queRevisa: "El inspector pide los recibos del último aguinaldo pagado.",
    periodo: "Último ejercicio.",
    conservacion: CONSERVAR_PAGOS,
    sancion: "1002",
    muestra: "Un recibo con el nombre tachado.",
    requisitos: [
      { id: "monto", texto: "Al menos 15 días de salario", fundamento: "Art. 87 LFT" },
      { id: "fecha", texto: "Pagado antes del 20 de diciembre", fundamento: "Art. 87 LFT" },
      { id: "proporcional", texto: "Parte proporcional a quien no cumplió el año, siga o no trabajando", fundamento: "Art. 87 LFT" },
      { id: "recibo", texto: "Recibos firmados o timbrados con dispersión bancaria", fundamento: "Art. 804, fr. IV LFT; formato de acta, observación 6" }
    ]
  },
  {
    id: "ptu",
    nombre: "Reparto de utilidades (PTU)",
    grupo: "Prestaciones",
    queRevisa: "El acta revisa cinco etapas del reparto del último ejercicio fiscal.",
    periodo: "Último ejercicio fiscal.",
    conservacion: CONSERVAR_PAGOS,
    sancion: "994-II",
    muestra: "Acta de la comisión, proyecto de reparto o un recibo con el nombre tachado.",
    requisitos: [
      { id: "declaracion", texto: "Acuse de la declaración anual del ejercicio", fundamento: "Formato de acta, etapa 1; art. 121 LFT" },
      { id: "copia", texto: "Entrega de copia de la declaración a los trabajadores dentro de 10 días", fundamento: "Art. 121, fr. I LFT" },
      { id: "comision", texto: "Convocatoria y acta de la comisión mixta, con igual número de representantes", fundamento: "Art. 125, fr. I LFT; formato de acta, etapa 3" },
      { id: "proyecto", texto: "Proyecto de participación fijado en lugar visible del establecimiento", fundamento: "Art. 125, fr. I LFT" },
      { id: "plazo", texto: "Reparto dentro de los 60 días siguientes a la fecha en que deba pagarse el impuesto anual", fundamento: "Art. 122 LFT" },
      { id: "recibos", texto: "Recibos firmados o timbrados por trabajador", fundamento: "Art. 804, fr. IV LFT; formato de acta, etapa 5" }
    ]
  },
  {
    id: "reglamento",
    nombre: "Reglamento interior de trabajo",
    grupo: "Reglas internas",
    queRevisa: "El inspector pide el reglamento, el acuse de depósito y el acta de la comisión que lo formuló.",
    sancion: "1002",
    muestra: "El reglamento completo.",
    requisitos: [
      { id: "horas", texto: "Horas de entrada y salida, tiempo para comidas y periodos de reposo", fundamento: "Art. 423, fr. I LFT" },
      { id: "lugar", texto: "Lugar y momento en que empiezan y terminan las jornadas", fundamento: "Art. 423, fr. II LFT" },
      { id: "limpieza", texto: "Días y horas para la limpieza de establecimientos, maquinaria y útiles", fundamento: "Art. 423, fr. III LFT" },
      { id: "pago", texto: "Días y lugares de pago", fundamento: "Art. 423, fr. IV LFT" },
      { id: "sillas", texto: "Normas sobre el uso de asientos o sillas con respaldo durante la jornada", fundamento: "Art. 423, fr. V y art. 132, fr. V LFT" },
      { id: "riesgos", texto: "Normas para prevenir riesgos e instrucciones de primeros auxilios", fundamento: "Art. 423, fr. VI LFT" },
      { id: "protegidos", texto: "Labores que no deben desempeñar menores y protección a trabajadoras embarazadas", fundamento: "Art. 423, fr. VII LFT" },
      { id: "examenes", texto: "Tiempo y forma de los exámenes médicos y medidas profilácticas", fundamento: "Art. 423, fr. VIII LFT" },
      { id: "permisos", texto: "Permisos y licencias", fundamento: "Art. 423, fr. IX LFT" },
      { id: "disciplina", texto: "Medidas disciplinarias: suspensión de hasta 8 días y derecho a ser oído antes de la sanción", fundamento: "Art. 423, fr. X LFT" },
      { id: "comision", texto: "Formulado por una comisión mixta, con su acta", fundamento: "Art. 424, fr. I LFT" },
      { id: "deposito", texto: "Depositado ante el Centro Federal de Conciliación y Registro Laboral dentro de 8 días de firmado", fundamento: "Art. 424, fr. II LFT" },
      { id: "difusion", texto: "Impreso, repartido entre los trabajadores y fijado en los lugares más visibles", fundamento: "Art. 425 LFT" }
    ]
  },
  {
    id: "antiguedades",
    nombre: "Cuadro general de antigüedades",
    grupo: "Reglas internas",
    queRevisa: "El inspector pide el cuadro vigente, verifica que esté publicado y solicita el acta de su comisión.",
    sancion: "1002",
    muestra: "El cuadro con el acta de la comisión.",
    requisitos: [
      { id: "comision", texto: "Formulado por una comisión de representantes de trabajadores y patrón, con su acta", fundamento: "Art. 158 LFT" },
      { id: "categorias", texto: "Distribuido por categorías de cada profesión u oficio", fundamento: "Art. 158 LFT" },
      { id: "publicado", texto: "Publicado en las instalaciones de la empresa", fundamento: "Art. 158 LFT; formato de acta" },
      { id: "vigente", texto: "Corresponde al año en curso", fundamento: "Formato de acta, observación 12" }
    ]
  },
  {
    id: "protocolo",
    nombre: "Protocolo contra violencia y acoso",
    grupo: "Reglas internas",
    queRevisa: "El acta pide el protocolo acordado con los trabajadores.",
    sancion: "1002",
    muestra: "El protocolo completo.",
    requisitos: [
      { id: "acuerdo", texto: "Implementado en acuerdo con los trabajadores", fundamento: "Art. 132, fr. XXXI LFT" },
      { id: "discriminacion", texto: "Previene la discriminación por razones de género", fundamento: "Art. 132, fr. XXXI LFT" },
      { id: "acoso", texto: "Atiende casos de violencia y acoso u hostigamiento sexual", fundamento: "Art. 132, fr. XXXI LFT" },
      { id: "forzoso", texto: "Busca erradicar el trabajo forzoso e infantil", fundamento: "Art. 132, fr. XXXI LFT" }
    ]
  },
  {
    id: "repse",
    nombre: "Servicios especializados y REPSE",
    grupo: "Casos especiales",
    queRevisa: "Si la empresa recibe servicios especializados, el acta pide el contrato, el registro y las altas del personal del proveedor.",
    sancion: "1004-C",
    muestra: "El contrato de servicios y la constancia de registro.",
    requisitos: [
      { id: "ajeno", texto: "El servicio no forma parte del objeto social ni de la actividad preponderante de quien lo recibe", fundamento: "Art. 13 LFT" },
      { id: "contrato", texto: "Contrato por escrito con el objeto de los servicios", fundamento: "Art. 14 LFT" },
      { id: "numero", texto: "El contrato señala el número aproximado de trabajadores que participarán", fundamento: "Art. 14 LFT" },
      { id: "registro", texto: "Proveedor inscrito en el padrón, con registro vigente; se renueva cada 3 años", fundamento: "Arts. 13 y 15 LFT" },
      { id: "altas", texto: "Altas o SUA de los trabajadores del proveedor", fundamento: "Art. 15-A LSS, citado en el formato de acta" }
    ]
  },
  {
    id: "teletrabajo",
    nombre: "Teletrabajo",
    grupo: "Casos especiales",
    queRevisa: "Si hay teletrabajo, el acta pide un listado detallado y el proceso de implementación.",
    sancion: "1002",
    muestra: "El listado sin datos personales y la política.",
    requisitos: [
      { id: "listado", texto: "Listado con género, estado civil, actividades, puesto, porcentaje de teletrabajo, teléfono y domicilio", fundamento: "Formato de acta STPS BC" },
      { id: "lugares", texto: "Lugares de trabajo propuestos y convenidos, razón social y domicilio del centro de trabajo", fundamento: "Formato de acta STPS BC" },
      { id: "equipo", texto: "Listado del equipo de cómputo y ergonómico entregado", fundamento: "Art. 330-E, fr. I LFT; formato de acta" },
      { id: "proceso", texto: "Proceso de implementación: silla, insumos y aditamentos ergonómicos", fundamento: "Formato de acta STPS BC" },
      { id: "costos", texto: "La empresa asume telecomunicaciones y la parte proporcional de electricidad", fundamento: "Art. 330-E, fr. III LFT" },
      { id: "insumos", texto: "Registro de insumos entregados", fundamento: "Art. 330-E, fr. IV LFT" },
      { id: "desconexion", texto: "Respeta el derecho a la desconexión al terminar la jornada", fundamento: "Art. 330-E, fr. VI LFT" }
    ]
  },
  {
    id: "extranjeros",
    nombre: "Trabajadores extranjeros",
    grupo: "Casos especiales",
    queRevisa: "Si laboran extranjeros, el acta anota cuántos son y pide tres documentos migratorios.",
    sancion: "EXT",
    muestra: "La constancia de inscripción del empleador.",
    requisitos: [
      { id: "constancia", texto: "Constancia de inscripción de empleador ante el INM, vigente", fundamento: "Formato de acta STPS BC" },
      { id: "alta", texto: "Notificación al INM de la contratación mediante el trámite de alta laboral", fundamento: "Formato de acta STPS BC" },
      { id: "documento", texto: "Documento migratorio actualizado de cada empleado extranjero", fundamento: "Formato de acta STPS BC" },
      { id: "proporcion", texto: "Al menos 90% de trabajadores mexicanos, sin contar directores, administradores ni gerentes generales", fundamento: "Art. 7 LFT" }
    ]
  }
];

export const documentoPorId = (id: string) => DOCUMENTOS.find((d) => d.id === id);
