$(document).ready(function() {
    console.log("jQuery cargado correctamente");
    // Cargamos el Navbar
    // Usamos "/" para que siempre busque desde la raíz del proyecto
    $("#navbar-placeholder").load("/assets/components/navbar.html");

    // Cargamos el Footer
    $("#footer-placeholder").load("/assets/components/footer.html");
    // Por ahora, verifiquen que la consola no tire errores
});