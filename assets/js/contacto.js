$(function () {

  /* SANITIZACIÓN Nativa del DOM, sin crear elementos jQuery extra.*/
  function sanitize(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  /* REGLAS DE VALIDACIÓN  */
  const RULES = {
    nombre:     { min: 2, max: 50, pattern: /^[A-Za-zÀ-ÿ\s]+$/, msg: 'Solo letras, mínimo 2 caracteres.' },
    apellido:   { min: 2, max: 50, pattern: /^[A-Za-zÀ-ÿ\s]+$/, msg: 'Solo letras, mínimo 2 caracteres.' },
    email:      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,      msg: 'Ingresá un email válido (ej: ana@mail.com).' },
    telefono:   { pattern: /^([\d\s\+\-\(\)]{7,20})?$/,          msg: 'Formato inválido. Ej: +54 388 000-0000.' },
    asunto:     { required: true,                                  msg: 'Seleccioná un asunto.' },
    mensaje:    { min: 10, max: 500,                               msg: 'El mensaje debe tener entre 10 y 500 caracteres.' },
    privacidad: { checkbox: true,                                  msg: 'Debés aceptar la política de privacidad.' }
  };

  const REQUIRED_FIELDS = ['nombre', 'apellido', 'email', 'asunto', 'mensaje', 'privacidad'];

  /*FUNCIÓN CENTRAL DE VALIDACIÓN 
     Devuelve true si el valor pasa las reglas del campo.*/
  function isValid(id, value) {
    const r = RULES[id];
    if (!r)          return true;
    if (r.checkbox)  return $('#' + id).is(':checked');
    if (r.required && value === '') return false;
    if (r.min && value.length < r.min) return false;
    if (r.max && value.length > r.max) return false;
    if (r.pattern && !r.pattern.test(value)) return false;
    return true;
  }

  /* MOSTRAR FEEDBACK VISUAL */
  function setFeedback(id, ok, force) {
    const $inp = $('#' + id);
    const $fb  = $('#fb-' + id);

    if ($inp.val().trim() === '' && !force) {
      if (id !== 'privacidad') {
        $inp.removeClass('is-valid is-invalid');
        $fb.text('').removeClass('ok err');
      }
      return;
    }

    if (ok) {
      $inp.removeClass('is-invalid').addClass('is-valid');
      $fb.text('✓ Correcto').removeClass('err').addClass('ok');
    } else {
      $inp.removeClass('is-valid').addClass('is-invalid');
      $fb.text('✕ ' + RULES[id].msg).removeClass('ok').addClass('err');
    }
  }

  /*HABILITAR / DESHABILITAR BOTÓN */
  function updateSubmitBtn() {
    const allOk = REQUIRED_FIELDS.every(function (id) {
      return id === 'privacidad'
        ? $('#privacidad').is(':checked')
        : isValid(id, $('#' + id).val().trim());
    });
    $('#btnSubmit').prop('disabled', !allOk);
    $('#formStatus').text(allOk ? '' : 'Completá los campos requeridos (*).');
  }

  /*EVENTOS DE VALIDACIÓN 
     input/change → valida mientras escribe (sin forzar error en vacío)
     blur         → valida al salir (muestra error aunque esté vacío)
     Combinados en un solo bloque para evitar repetir el selector.
   */
  $('#contactForm input, #contactForm textarea, #contactForm select')
    .on('input change', function () {
      const id = $(this).attr('id');
      if (!RULES[id]) return;
      setFeedback(id, isValid(id, $(this).val().trim()), false);
      updateSubmitBtn();
    })
    .on('blur', function () {
      const id = $(this).attr('id');
      if (!RULES[id]) return;
      setFeedback(id, isValid(id, $(this).val().trim()), true);
      updateSubmitBtn();
    });

  /*  CHECKBOX DE PRIVACIDAD 
     Lógica separada porque no usa .val()
   */
  $('#privacidad').on('change', function () {
    const ok = $(this).is(':checked');
    $('#fb-privacidad')
      .text(ok ? '✓ Correcto' : '✕ ' + RULES.privacidad.msg)
      .removeClass('ok err').addClass(ok ? 'ok' : 'err');
    updateSubmitBtn();
  });

  /* CONTADOR DE CARACTERES DEL TEXTAREA 
     Cambia de color cuando se acerca al límite.
 */
  $('#mensaje').on('input', function () {
    const len  = $(this).val().length;
    const $cnt = $('#charCount');
    $cnt.text(len + ' / 500').removeClass('warn over');
    if      (len >= 500) $cnt.addClass('over');
    else if (len >= 400) $cnt.addClass('warn');
  });

  const modalConfirmacion = new bootstrap.Modal($('#modalConfirmacion')[0]);

  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    // Validación final: si algún campo falla, mostramos
    // el error y cortamos. Reutiliza isValid sin duplicar lógica.
    const allOk = REQUIRED_FIELDS.every(function (id) {
      const ok = id === 'privacidad'
        ? $('#privacidad').is(':checked')
        : isValid(id, $('#' + id).val().trim());
      if (!ok) setFeedback(id, false, true);
      return ok;
    });
    if (!allOk) return;

    $('#emailConfirm').text(sanitize($('#email').val().trim()));
    $('#spinnerOverlay').addClass('activo');

    setTimeout(function () {
      $('#spinnerOverlay').removeClass('activo');
      modalConfirmacion.show();

      // Reset
      $('#contactForm')[0].reset();
      $('#contactForm input, #contactForm textarea, #contactForm select')
        .removeClass('is-valid is-invalid');
      $('.contacto-feedback').text('').removeClass('ok err');
      $('#charCount').text('0 / 500').removeClass('warn over');
      $('#btnSubmit').prop('disabled', true);
      $('#formStatus').text('Completá los campos requeridos (*).');
    }, 1800);
  });

$('[data-bs-toggle="tooltip"]').each(function () {
    new bootstrap.Tooltip(this);
  });

});