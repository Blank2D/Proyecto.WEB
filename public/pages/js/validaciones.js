function validar() {
  // Validar Nombre Película (entre 5 y 100 caracteres alfanuméricos)
  var expNombreProducto = /^[A-Za-z0-9\s]{5,100}$/;
  var NombreProducto = document.getElementById('NombreProducto').value;
  if (!expNombreProducto.test(NombreProducto)) {
      alert('El nombre del producto debe tener entre 5 y 100 caracteres alfanuméricos.');
      document.getElementById('NombreProducto').focus();
      return false;
  }

  console.log('la funcion funciona XDDDD');
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
      alert('El precio del producto debe ser un número positivo.');
      document.getElementById('PrecioProducto').focus();
      return false;
  }

  var expStock = /^[0-9]+$/;
  var StockProducto = document.getElementById('StockProducto').value;
  if (!expStock.test(StockProducto)) {
      alert('El stock debe ser un número positivo.');
      document.getElementById('StockProducto').focus();
      return false;
  }

  // Validar Nombre Película (entre 5 y 100 caracteres alfanuméricos)
  var expNombreLogin = /^[A-Za-z0-9\s]{5,100}$/;
  var NombreLogin = document.getElementById('username').value;
  if (!expNombreLogin.test(NombreLogin)) {
      alert('El nombre de usuario debe tener entre 5 y 100 caracteres alfanuméricos.');
      document.getElementById('username').focus();
      return false;
  }

  var expNombreUsuario = /^[A-Za-z0-9\s]{5,100}$/;
  var NombreProducto = document.getElementById('NombreUsuario').value;
  if (!expNombreUsuario.test(NombreUsuario)) {
      alert('El nombre de usuario debe tener entre 5 y 100 caracteres alfanuméricos.');
      document.getElementById('NombreUsuario').focus();
      return false;
    }

    // Validar Nombre Película (entre 5 y 100 caracteres alfanuméricos)
    var expContraseña = /^[A-Za-z0-9\s]{5,100}$/;
    var Contraseña= document.getElementById('ContraseñaUsuario').value;
    if (!expContraseña.test(Contraseña)) {
        alert('la contraseña debe tener entre 5 y 100 caracteres alfanuméricos.');
        document.getElementById('ContraseñaUsuario').focus();
        return false;
    }

    var expContraseñaLogin = /^[A-Za-z0-9\s]{5,100}$/;
    var ContraseñaLogin= document.getElementById('password').value;
    if (!expContraseñaLogin.test(ContraseñaLogin)) {
        alert('la contraseña debe tener entre 5 y 100 caracteres alfanuméricos.');
        document.getElementById('password').focus();
        return false;
    }

      // Validar Nombre Película (entre 5 y 100 caracteres alfanuméricos)
  var expCorreo = /^*@{1}[gmail.com][GMAIL.COM]$/;
  var Correo = document.getElementById('email').value;
  if (!expCorreo.test(Correo)) {
      alert('El nombre del producto debe tener entre 5 y 100 caracteres alfanuméricos.');
      document.getElementById('NombreProducto').focus();
      return false;
  }

  var expValidarCon = /^[A-Za-z0-9\s]{5,100}$/;
  if (!expValidarCon.test(Contraseña)) {
      alert('la contraseña debe tener entre 5 y 100 caracteres alfanuméricos.');
      document.getElementById('password').focus();
      return false;
  }
}