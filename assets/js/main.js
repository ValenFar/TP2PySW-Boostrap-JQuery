function cambiarTema() {
  const html = document.documentElement;
  const temaGuardado = localStorage.getItem('theme');
  const temaActual = html.getAttribute('data-bs-theme') || temaGuardado || 'light';
  const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-bs-theme', nuevoTema);
  localStorage.setItem('theme', nuevoTema);

  console.log('El tema ahora es: ' + nuevoTema);
}

$(document).ready(function () {
  console.log('jQuery cargado correctamente');

  const temaGuardado = localStorage.getItem('theme');
  if (temaGuardado) {
    document.documentElement.setAttribute('data-bs-theme', temaGuardado);
  }

  // Cargamos el Navbar
  // Usamos "/" para que siempre busque desde la raíz del proyecto
  $('#navbar-placeholder').load('/assets/components/navbar.html');

  // Cargamos el Footer
  $('#footer-placeholder').load('/assets/components/footer.html');
  // Por ahora, verifiquen que la consola no tire errores
});
