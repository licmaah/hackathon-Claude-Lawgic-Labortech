// Etapas del procedimiento en su orden real. "apercibimiento" es una advertencia expresa en la norma
// o en el formato; "efecto" es una consecuencia legal que opera aunque nadie la advierta.

export type Apercibimiento = {
  id: string;
  etapa: string;
  titulo: string;
  tipo: "apercibimiento" | "efecto";
  dice: string;
  consecuencia: string;
  hacer: string;
  fundamento: string;
  plazo?: { dias: number; desde: string; editable?: boolean; nota: string };
};

export const APERCIBIMIENTOS: Apercibimiento[] = [
  {
    id: "negar-acceso",
    etapa: "En la puerta",
    titulo: "No permitir la inspección",
    tipo: "apercibimiento",
    dice: "Al patrón que no permita la inspección se le notifica por instructivo para que comparezca a exhibir la información, apercibido de que, si no lo hace, se presumirá que no cuenta con ella.",
    consecuencia: "Multa de 250 a 5,000 UMA, presunción de que no tiene los documentos y cierre de instrucción por los incumplimientos y por la negativa.",
    hacer: "Permita el acceso, llame a su responsable y pida que cualquier objeción quede escrita en el acta.",
    fundamento: "Art. 1004-A LFT; arts. 30 y 51 RGITAS"
  },
  {
    id: "falsedad",
    etapa: "Durante la visita",
    titulo: "Declarar con falsedad",
    tipo: "apercibimiento",
    dice: "El formato apercibe a quien atiende sobre las consecuencias legales de declarar con falsedad ante autoridades distintas a las judiciales, y le toma protesta sobre su nombre, cargo y autorización.",
    consecuencia: "Presentar documentos o testigos falsos se sanciona con 6 meses a 4 años de prisión y multa de 125 a 1,900 UMA. La falsedad también puede motivar otra inspección extraordinaria.",
    hacer: "Que atienda una persona con cargo y poder. Responda solo lo que le consta y con el documento en la mano.",
    fundamento: "Formato de acta STPS BC; art. 1006 LFT; art. 28, frs. III y V RGITAS"
  },
  {
    id: "testigos",
    etapa: "Durante la visita",
    titulo: "Negarse a proponer testigos",
    tipo: "apercibimiento",
    dice: "El acta se levanta ante dos testigos propuestos por la parte patronal. Si se niega a proponerlos, los designa el inspector.",
    consecuencia: "La empresa pierde la posibilidad de elegir a los testigos de la diligencia.",
    hacer: "Tenga identificadas a dos personas de confianza con identificación vigente.",
    fundamento: "Art. 30 RGITAS; formato de acta STPS BC"
  },
  {
    id: "hechos-ciertos",
    etapa: "Al cierre del acta",
    titulo: "Lo asentado se tiene por cierto",
    tipo: "efecto",
    dice: "Los hechos que certifica el inspector se tienen por ciertos mientras no se demuestre lo contrario. Antes de concluir, usted puede revisar el acta, formular observaciones y ofrecer pruebas.",
    consecuencia: "Cada N/M queda como hecho asentado. Decir \"nada que manifestar\" deja pasar la oportunidad de corregirlo en el acto.",
    hacer: "Exhiba todo en la diligencia, subsane lo que pueda y pida que el acta lo asiente. Lea cada N/M antes de firmar.",
    fundamento: "Art. 543 LFT; arts. 34 y 35 RGITAS"
  },
  {
    id: "cinco-dias",
    etapa: "Después de la visita",
    titulo: "Plazo de cinco días para observaciones y pruebas",
    tipo: "efecto",
    dice: "En condiciones generales de trabajo, el patrón tiene cinco días, sin prórroga, para formular observaciones y ofrecer pruebas. El formato de Baja California los precisa como hábiles e improrrogables, y pide escrito con personalidad acreditada, en original y copia.",
    consecuencia: "Si el incumplimiento no se desvirtúa, el área de inspección cierra la instrucción y solicita el procedimiento sancionador. Si acredita el cumplimiento, procede el archivo.",
    hacer: "Presente el escrito firmado por el representante, con su poder y los documentos faltantes, y conserve el acuse.",
    fundamento: "Arts. 35, 36, tercer párrafo, 38 y 51 RGITAS; formato de acta STPS BC",
    plazo: { dias: 5, desde: "Fecha del acta", nota: "Se cuenta desde el día siguiente al acta." }
  },
  {
    id: "seguridad",
    etapa: "Después de la visita",
    titulo: "Medidas de seguridad ordenadas",
    tipo: "apercibimiento",
    dice: "Si vence el plazo para hacer las modificaciones que ordenó la autoridad, la STPS sanciona al patrón con apercibimiento de sanción mayor si no cumple en el nuevo plazo.",
    consecuencia: "Sanción y apercibimiento de una mayor. Es materia federal: el inspector estatal solo auxilia y reporta.",
    hacer: "Capture el plazo que fije la orden, que puede llegar a 30 días hábiles, y guarde evidencia de cada corrección.",
    fundamento: "Art. 512-D LFT; art. 36 RGITAS; arts. 527-A y 529 LFT",
    plazo: { dias: 30, desde: "Notificación de la orden", editable: true, nota: "Use el plazo que señale la orden." }
  },
  {
    id: "emplazamiento",
    etapa: "Procedimiento sancionador",
    titulo: "Emplazamiento: comparecer o seguir en rebeldía",
    tipo: "apercibimiento",
    dice: "El emplazamiento debe contener el apercibimiento de que, si el presunto infractor no comparece o no ejerce sus derechos en el término concedido, el procedimiento sigue en rebeldía.",
    consecuencia: "Se tienen por ciertos los hechos que se le imputan.",
    hacer: "Capture el término del emplazamiento, que no puede ser inferior a 15 días hábiles. Conteste por conducto del representante legal u ofrezca pruebas relacionadas con cada hecho.",
    fundamento: "Arts. 52, 53, frs. VII y IX, 54 y 56 RGITAS",
    plazo: { dias: 15, desde: "Notificación del emplazamiento", editable: true, nota: "El emplazamiento fija el término o la fecha de audiencia." }
  },
  {
    id: "resolucion",
    etapa: "Resolución",
    titulo: "La multa no libera de cumplir",
    tipo: "efecto",
    dice: "La sanción no libera del cumplimiento de la obligación. Las copias de la resolución pasan a la autoridad fiscal para hacer efectiva la multa, y la resolución debe mencionar los medios de defensa.",
    consecuencia: "Cobro por la autoridad fiscal. Otra infracción al mismo precepto dentro de dos años es reincidencia y duplica la multa.",
    hacer: "Corrija el incumplimiento y revise con su abogado el medio de defensa y su plazo, que dependen de la ley de procedimiento aplicable.",
    fundamento: "Arts. 59, fr. X, 61, fr. V, 63, 64 y 65 RGITAS; art. 992 LFT"
  },
  {
    id: "juicio",
    etapa: "Si hay juicio laboral",
    titulo: "Exhibir documentos en juicio",
    tipo: "apercibimiento",
    dice: "El Tribunal puede requerir al patrón los documentos que debe conservar, bajo el apercibimiento de que, si no los presenta, se presumirán ciertos los hechos que alega el trabajador.",
    consecuencia: "Presunción en contra de la empresa, salvo prueba en contrario. Los mismos documentos que faltan en una inspección pueden faltar en un juicio.",
    hacer: "Conserve cada documento por el tiempo que marca el art. 804 LFT. La pestaña Documentos lo indica en cada caso.",
    fundamento: "Arts. 784, 804 y 805 LFT"
  }
];
