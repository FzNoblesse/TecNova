// scroll suave al hacer click en el menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// LÓGICA DEL FORMULARIO
const form = document.querySelector("#contacto form"); 

form.addEventListener("submit", async e =>
  {
    e.preventDefault();
    const formData = new FormData(form);
    const data =
    {
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      empresa: formData.get('empresa'),
      servicio: formData.get('servicio')
    };
    try
    {
      const response = await fetch('/api/enviar-correo',
        {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });  
        if (!response.ok)
          {
            throw new Error('Hubo un problema al enviar el mensaje.');
          }
          alert("¡Gracias! Tu mensaje ha sido enviado. Te responderemos pronto.");
          form.reset();
    }
    catch (error)
    {
      console.error('Error:', error);
      alert('Lo sentimos, algo salió mal. Por favor, intenta de nuevo.');
    }
});