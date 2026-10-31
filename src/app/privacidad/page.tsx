import { Marca } from "@/componentes/Marca";

export const metadata = { title: "Aviso de privacidad | LaborTech Inspección" };

export default function Privacidad() {
  return (
    <main className="acceso" style={{ maxWidth: 720 }}>
      <Marca />
      <article className="foja">
        <h1>Aviso de privacidad</h1>
        <p className="aviso">
          Borrador para el concurso. Un abogado debe revisarlo y completar los datos del responsable antes de
          recibir información de clientes reales.
        </p>
        <p><b>Responsable.</b> Pendiente de definir: nombre y domicilio del responsable.</p>
        <p><b>Datos que se guardan.</b> Correo de acceso, razón social, número de trabajadores, las marcas de cumplimiento que usted capture, las fechas de sus plazos y el resultado de las revisiones con IA.</p>
        <p><b>Finalidad.</b> Mostrarle su avance de cumplimiento y, si su cuenta está vinculada a un despacho, permitirle a ese despacho ver el resumen.</p>
        <p><b>Archivos que sube.</b> El archivo se envía a la API de Anthropic para generar la revisión y este sitio no lo guarda. Se conserva solo el resultado, que no debe reproducir datos de personas. Tache nombres, CURP, RFC, domicilios y salarios antes de subirlo.</p>
        <p><b>Proveedores.</b> Supabase para cuentas y base de datos, y Anthropic para la revisión con IA.</p>
        <p><b>Derechos.</b> Pendiente de definir: el medio para ejercer los derechos de acceso, rectificación, cancelación y oposición.</p>
      </article>
    </main>
  );
}
