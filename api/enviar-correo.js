import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    
    // Solo permitir peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { nombre, email, empresa, servicio } = req.body;

    // Configura el transportador de correo
    // USA VARIABLES DE ENTORNO de Vercel
    let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL_USER, // Tu correo
            pass: process.env.EMAIL_PASS, // Tu contraseña
        },
    });

    // Define el correo
    let mailOptions = {
        from: '"Tecnova Web" <tecnova100@outlook.com>',
        to: "tecnova100@outlook.com", 
        subject: `Nuevo prospecto: ${nombre}`,
        html: `
            <h2>Nuevo contacto desde la web Tecnova</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Empresa:</strong> ${empresa || 'No especificada'}</p>
            <p><strong>Servicio de interés:</strong> ${servicio || 'No especificado'}</p>
        `
    };

    // Envía el correo
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Correo enviado exitosamente" });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ message: "Error al enviar el correo" });
    }
}