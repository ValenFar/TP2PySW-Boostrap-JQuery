$(document).ready(function() {

    // Mostrar artículos con animación inicial
    $('.blog-item').hide().fadeIn(1000);

    // Filtros por categoría
    $('.filter-btn').click(function() {
        let category = $(this).data('category');

        if (category === 'all') {
            $('.blog-item').hide().fadeIn();
        } else {
            $('.blog-item').hide();
            $('.' + category).fadeIn();
        }
    });

    // Animación al hacer scroll
    $(window).scroll(function() {
        $('.blog-card').each(function() {
            let position = $(this).offset().top;
            let scrollTop = $(window).scrollTop();
            let windowHeight = $(window).height();

            if (position < scrollTop + windowHeight - 100) {
                $(this).animate({opacity: 1}, 500);
            }
        });
    });

    // Evento para abrir el modal con información
    $('.blog-card img').click(function() {
        const item = $(this).closest('.blog-item');
        const titulo = item.find('.card-title').text();
        const infoDetallada = item.data('info');

        $('#infoModalLabel').text(titulo);
        $('#infoModalBody').text(infoDetallada);
        
        // Mostrar el modal (usando la API de Bootstrap 5)
        const myModal = new bootstrap.Modal(document.getElementById('infoModal'));
        myModal.show();
    });

});