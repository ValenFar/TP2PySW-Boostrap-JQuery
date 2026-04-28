$(document).ready(function() {
    let $titulo = $('#titulo-animado');
    
    //Guardamos el texto original y limpiamos el h1
    let texto = $titulo.text().trim();
    $titulo.empty();

    //Separamos el texto letra por letra y creamos los spans
    $.each(texto.split(''), function(i, letra) {
        if (letra === ' ') {
            // si es un espacio lo agregamos directamente
            $titulo.append('&nbsp;');
        } else {
            // Si es una letra la envolvemos en un span oculto y desplazado hacia abajo
            let $span = $('<span>').text(letra).css({
                opacity: 0,
                position: 'relative',
                top: '20px', // Desplazamiento inicial
                display: 'inline-block'
            });
            $titulo.append($span);
        }
    });

    // Animamos cada span secuencialmente
    $titulo.find('span').each(function(index) {
        // Usamos delay para que cada letra espere su turno (70ms por letra)
        $(this).delay(70 * index).animate({
            opacity: 1,
            top: '0px'
        }, 300); // 400ms es la duración de la animación de cada letra
    });

    // ===== ANIMACIÓN DE CARDS =====
    // Agregar clase card-animate a todas las cards
    $('.card').addClass('card-animate');

    // Función para revisar si un elemento está visible en el viewport
    function isVisible($element) {
        let elementTop = $element.offset().top;
        let elementBottom = elementTop + $element.outerHeight();
        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    // Función para animar las cards
    function animateCards() {
        $('.card-animate').each(function(index) {
            if (isVisible($(this)) && !$(this).hasClass('visible')) {
                $(this).addClass('visible');
            }
        });
    }

    // Ejecutar animación al cargar la página
    animateCards();

    // Ejecutar animación al hacer scroll
    $(window).on('scroll', function() {
        animateCards();
    });
});