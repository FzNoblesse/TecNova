// Usamos 'resend' en lugar de 'nodemailer'
const { Resend } = require('resend');

// Resend toma la API key automáticamente desde la variable de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    // 1. Recibe los datos del frontend
    const { nombre, email, empresa, servicio } = req.body;

    // 2. Validar que los datos existan
    if (!nombre || !email) {
        return res.status(400).json({ message: 'Nombre y Email son requeridos' });
    }

    try {
        // 3. Envía el correo usando Resend
        // Nota: 'from' es un correo de prueba de Resend. Funciona perfecto.
        const data = await resend.emails.send({
            from: 'Formulario Tecnova <onboarding@resend.dev>',
            to: ['tristan.aguilar.jose@gmail.com'], // <-- TU CORREO (donde recibirás)
            subject: `Nuevo prospecto: ${nombre}`,
            html: `
                <h2>Nuevo contacto desde la web Tecnova</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email del cliente:</strong> ${email}</p>
                <p><strong>Empresa:</strong> ${empresa || 'No especificada'}</p>
                <p><strong>Servicio de interés:</strong> ${servicio || 'No especificado'}</p>
            `
        });

        // 4. Responde con éxito
        res.status(200).json({ message: "Correo enviado exitosamente" });

    } catch (error) {
        // Si Resend falla, nos dará un error claro
        console.error("Error al enviar correo con Resend:", error);
        res.status(500).json({ message: "Error al enviar el correo", error: error.message });
    }
};