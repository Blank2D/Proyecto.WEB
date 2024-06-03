function validarInicioSesion(){

      // Validar Nombre Película (entre 5 y 100 caracteres alfanuméricos)
  var expNombreLogin = /^[A-Za-z0-9\s]{5,100}$/;
  var NombreLogin = document.getElementById('username');
  if (!expNombreLogin.test(NombreLogin)) {
      alert('El nombre de usuario debe tener entre 5 y 100 caracteres alfanuméricos.');
      document.getElementById('username').focus();
      return false;
  }

  
    var expContraseñaLogin = /^[A-Za-z0-9\s]{5,100}$/;
    var ContraseñaLogin= document.getElementById('password');
    if (!expContraseñaLogin.test(ContraseñaLogin)) {
        alert('la contraseña debe tener entre 5 y 100 caracteres alfanuméricos.');
        document.getElementById('password').focus();
        return false;
    }

    var expValidarCon = /^[A-Za-z0-9\s]{5,100}$/;
    if (!expValidarCon.test(Contraseña)) {
        alert('la contraseña debe tener entre 5 y 100 caracteres alfanuméricos.');
        document.getElementById('password').focus();
        return false;
    }

}