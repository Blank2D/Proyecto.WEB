function valida() {
  // Validar Nombre Película (entre 5 y 100 caracteres alfanuméricos)
  var expNombre = /^[A-Za-z0-9\s]{5,100}$/;
  var NombreProducto = document.getElementById('NombreProducto').value;
  if (!expNombre.test(NombreProducto)) {
      alert('El nombre del producto debe tener entre 5 y 100 caracteres alfanuméricos.');
      document.getElementById('NombreProducto').focus();
      return false;
  }

  // Validar Descripción (entre 10 y 300 caracteres alfanuméricos)
  var expDescripcion = /^[A-Za-z0-9\s]{10,300}$/;
  var DescripcionProducto = document.getElementById('DescripcionProducto').value;
  if (!expDescripcion.test(DescripcionProducto)) {
      alert('La descripción debe tener entre 10 y 300 caracteres alfanuméricos.');
      document.getElementById('descripcion').focus();
      return false;
  }


  // Validar Categoría (debe estar seleccionada)
  var categoria = document.getElementById('NombreCategoria').value;
  if (categoria === "") {
      alert('Debe seleccionar una categoría.');
      document.getElementById('NombreCategoria').focus();
      return false;
  }

  // Validar Precio Entrada (solo números del 0-9)
  var expPrecio = /^[0-9]+$/;
  var PrecioProducto = document.getElementById('PrecioProducto').value;
  if (!expPrecio.test(PrecioProducto)) {
      alert('El precio de la entrada debe ser un número positivo.');
      document.getElementById('PrecioProducto').focus();
      return false;
  }
}