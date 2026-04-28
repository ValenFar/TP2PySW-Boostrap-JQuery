$(document).ready(function() {

    // --- Lógica para los botones de filtro ---
    $('.btn-filtro').click(function() {
        let categoria = $(this).attr('data-filtro');

        if (categoria === 'todos') {
            $('.item-filtro').show(400); 
        } else {
            $('.item-filtro').hide().filter('.' + categoria).show(400); 
        }
    });

    // --- Lógica para el Zoom con jQuery ---
    // Cuando el mouse entra a la tarjeta
    $('.tarjeta-viajero').mouseenter(function() {
        $(this).addClass('zoom-activo');
    });

    // Cuando el mouse sale de la tarjeta
    $('.tarjeta-viajero').mouseleave(function() {
        $(this).removeClass('zoom-activo');
    });


    // Punto 5 • Tabla comparativa • Hover dinámico • Tooltips (Bootstrap + jQuery) 

    // Tabla de precios, Punto 5

    // --- REQUISITO : INICIALIZAR TOOLTIPS ---
    // Le decimos a jQuery que busque todo lo que tenga 'data-bs-toggle="tooltip"' y lo active
    $('[data-bs-toggle="tooltip"]').tooltip();


    // --- REQUISITO : HOVER DINÁMICO CON JQUERY ---
    // Hacemos que las celdas de la tabla reaccionen al pasar el mouse
    $('.celda-hover').hover(
        function() {
            // 1. Averiguamos en qué número de columna está el mouse
            let colIndex = $(this).index();
            
            // 2. Pintamos toda la columna suavemente
            $('table tbody tr').each(function() {
                $(this).children('td').eq(colIndex).css({
                    'background-color': '#dfa8ae',
                    'transition': 'all 0.2s'
                });
            });
        }, 
        
        function() {
            // Cuando sacás el mouse, volvemos toda la columna a la normalidad
            let colIndex = $(this).index();
            
            $('table tbody tr').each(function() {
                $(this).children('td').eq(colIndex).css({
                    'background-color': ''
                });
            });

            $(this).css({
                'transform': 'scale(1)',
                'box-shadow': 'none'
            });
        }
    );
});