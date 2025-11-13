const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    
    // 1. Solo permitir peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    // 2. Recibe los datos del frontend (vienen en req.body)
    const { nombre, email, empresa, servicio } = req.body;

    // 3. Configura Nodemailer (USA VARIABLES DE ENTORNO DE VERCEL)
    let transporter = nodemailer.createTransport({
        host: "smtp.office3365.com", // Nota: El host SMTP de Outlook es smtp.office365.com
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL_USER, // Variable de Entorno
            pass: process.env.EMAIL_PASS, // Variable de Entorno
        },
    });

    // 4. Define el contenido del correo
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

    // 5. Envía el correo
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Correo enviado exitosamente" });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        // Devolver el error real puede ayudar a depurar
        res.status(500).json({ message: "Error al enviar el correo", error: error.message });
    }
};