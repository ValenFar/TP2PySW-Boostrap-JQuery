$(document).ready(function() {
    // Evitar que el formulario recargue la página si hacen clic en "Jugar"
    $('form').on('submit', function(e) {
        e.preventDefault();
    });

    // Detectar clic en las señales de fraude
    $('.senal-fraude').on('click', function(e) {
        e.preventDefault(); // Evita que los enlaces funcionen
        
        // Leer el mensaje personalizado de ese elemento
        var mensaje = $(this).attr('data-feedback');
        
        // Efecto visual en el elemento clickeado (ponerle borde rojo)
        $(this).css({
            'border': '3px solid red',
            'box-shadow': '0 0 10px red'
        });

        // Inyectar el mensaje en el Toast y mostrarlo con animación
        $('#feedback-mensaje').text(mensaje);
        $('#feedback-toast').fadeIn(400).delay(4000).fadeOut(400);
    });
});