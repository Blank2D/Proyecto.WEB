function validarRegistro(){
    var expNombreUsuario = /^[A-Za-z0-9\s]{5,100}$/;
    var NombreUsuario = document.getElementById('NombreUsuario');
    if (!expNombreUsuario.test(NombreUsuario)) {
        alert('El nombre de usuario debe tener entre 5 y 100 caracteres alfanuméricos.');
        document.getElementById('NombreUsuario').focus();
        return false;
      }
      
        // Validar Nombre Película (entre 5 y 100 caracteres alfanuméricos)
        var expContraseña = /^[A-Za-z0-9\s]{5,100}$/;
        var Contraseña= document.getElementById('ContraseñaUsuario');
        if (!expContraseña.test(Contraseña)) {
            alert('la contraseña debe tener entre 5 y 100 caracteres alfanuméricos.');
            document.getElementById('ContraseñaUsuario').focus();
            return false;
        }
        // Validar Correo Electrónico (formato básico de email)
        var expCorreo = /^[a-zA-Z0-9._%+-]+@gmail.com$/i;
        var Correo = document.getElementById('CorreoUsuario');
        if (!expCorreo.test(Correo)) {
            alert('El correo electrónico debe ser una dirección válida de Gmail.');
            document.getElementById('CorreoUsuario').focus();
            return false;
        }
}