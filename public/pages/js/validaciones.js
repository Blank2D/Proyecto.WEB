function valida() {
  // Validar Nombre Película (entre 5 y 100 caracteres alfanuméricos)
  var expNombre = /^[A-Za-z0-9\s]{5,100}$/;
  var nombre = document.getElementById('nombre').value;
  if (!expNombre.test(nombre)) {
      alert('El nombre de la película debe tener entre 5 y 100 caracteres alfanuméricos.');
      document.getElementById('nombre').focus();
      return false;
  }

  // Validar Descripción (entre 10 y 300 caracteres alfanuméricos)
  var expDescripcion = /^[A-Za-z0-9\s]{10,300}$/;
  var descripcion = document.getElementById('descripcion').value;
  if (!expDescripcion.test(descripcion)) {
      alert('La descripción debe tener entre 10 y 300 caracteres alfanuméricos.');
      document.getElementById('descripcion').focus();
      return false;
  }

  // Validar Fecha de Estreno (fecha no puede ser en el futuro)
  var fechaInput = new Date(document.getElementById('fecha').value);
  var fechaActual = new Date();
  if (fechaInput > fechaActual) {
      alert('La fecha de estreno no puede ser una fecha futura.');
      document.getElementById('fecha').focus();
      return false;
  }

  // Validar Categoría (debe estar seleccionada)
  var categoria = document.getElementById('categoria').value;
  if (categoria === "") {
      alert('Debe seleccionar una categoría.');
      document.getElementById('categoria').focus();
      return false;
  }

  // Validar Precio Entrada (solo números del 0-9)
  var expPrecio = /^[0-9]+$/;
  var precio = document.getElementById('precio').value;
  if (!expPrecio.test(precio)) {
      alert('El precio de la entrada debe ser un número positivo.');
      document.getElementById('precio').focus();
      return false;
  }
}