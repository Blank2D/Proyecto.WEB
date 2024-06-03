//Libreria de Express
const express = require('express');
//Libreria Path
const path = require('path');
//Libreria      
const mysql = require('mysql2');

const fileupload = require('express-fileupload');

const fs = require('fs')
// hola
const busboy = require('connect-busboy');
const { error } = require('console');



const app = express();
const port = 3000;

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Miperrito1!',
    database: 'ventasdb'
});


// Configura busboy
app.use(busboy()); 

app.use(fileupload());

//Verificacion de errores para validar si la conexion es correcta
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});

//Envio los datos del formulario por url
app.use(express.urlencoded({ extended: true }));
//Convierto en formato json
app.use(express.json());
//Configuro para que la aplicacon inicie desde el director o carpeta pagina principal
app.use(express.static(path.join(__dirname, 'public/pages')));

//Recibo los valores y los envio a la tabla
app.post('/guardar_producto',(req, res) => {
    const { NombreProducto, DescripcionProducto, NombreCategoria, PrecioProducto, StockProducto } = req.body;
    
    
        try{
            const imagenProductoLocal = req.files.ImagenProducto;
            const nombreimagen = req.files.ImagenProducto.name;

            rutaImagenesLocal = __dirname + '/public/pages/imagenesAlmacenadas/' + nombreimagen;

            imagenProductoLocal.mv(rutaImagenesLocal, (err) => {})

            var rutaImagenes = 'imagenesAlmacenadas/' + nombreimagen;
            
        }

        catch{
            rutaImagenes = '/images/sillycat.jpg';
        }

        finally{
                const sql = 'INSERT INTO Productos (NombreProducto, DescripcionProducto, NombreCategoria, PrecioProducto, StockProducto, Imagenproducto) VALUES ( ?, ?, ?, ?, ?, ?)';
                connection.query(sql, [NombreProducto, DescripcionProducto, NombreCategoria, PrecioProducto, StockProducto, rutaImagenes], (err, result) => {
                    if (err) {};
                    console.log('Producto insertado correctamente.');
                });
                res.redirect('/AgregarCRUD.html');
        }
            
});



//Ruta para mostrar las películas en el listardatos.html con metodo GET
app.get('/productos', (req, res) => {
    //Realiza una consulta SQL para seleccionar todas las filas de la tabla "peliculas"
    connection.query('SELECT * FROM Productos', (err, rows) => {
        //Maneja los errores, si los hay
        if (err) throw err;
        res.send(rows); //Aquí puedes enviar la respuesta como quieras (por ejemplo, renderizar un HTML o enviar un JSON)
    });
});


//METODO PARA TRAER SOLO 4 Productos
app.get('/productos_inicio', (req, res) => {
    //Realiza una consulta SQL para seleccionar todas las filas de la tabla "peliculas"
    connection.query('SELECT * FROM Productos LIMIT 4', (err, rows) => {
        //Maneja los errores, si los hay
        if (err) throw err;
        res.send(rows); //Aquí puedes enviar la respuesta como quieras (por ejemplo, renderizar un HTML o enviar un JSON)
    });
});





//Define una ruta DELETE en la aplicación Express para eliminar una película por su ID
app.delete('/eliminar_producto/:IdProducto', (req, res) => {
    //Obtiene el parámetro 'id' de la URL para eliminar la pelicula en especifico
    const id = req.params.IdProducto;
    //Define la consulta SQL para eliminar una película donde el ID coincida
    const sql = 'DELETE FROM Productos WHERE idProducto = ?';
    //Ejecuta la consulta SQL, utilizando el Id que se enviara a la consulta SQL
    connection.query(sql, [id], (err, result) => {
        // Si ocurre un error durante la ejecución de la consulta, lanza una excepción
        if (err) throw err;
        // Imprime un mensaje en la consola indicando que la película fue eliminada correctamente
        console.log('Producto eliminado correctamente.');
        // Envía una respuesta HTTP 200 OK al cliente, indicando que la eliminación fue exitosa
        res.sendStatus(200); 
    });
});


app.post('/modificar_producto', (req, res) => {
    const { IdProducto, NombreProducto, DescripcionProducto, NombreCategoria, PrecioProducto, StockProducto } = req.body;

    const sql = 'UPDATE Productos SET NombreProducto = ?, DescripcionProducto = ?, NombreCategoria = ?, PrecioProducto = ?, StockProducto = StockProducto + ? WHERE IdProducto = ?';
    connection.query(sql, [NombreProducto, DescripcionProducto, NombreCategoria, PrecioProducto, StockProducto, IdProducto], (err, result) => {
        if (err) {
            console.error('Error al modificar el producto:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log(req.body);
        res.redirect('/ListarCRUD.html');
    });
});

app.get('/productos/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM Productos WHERE IdProducto = ?';
    connection.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Error al obtener el producto:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(result[0]);
    });
});




//Recibo los valores y los envio a la tabla
app.post('/guardar_usuario',(req, res) => {
    const { NombreUsuario, CorreoUsuario, ContrasenaUsuario, ValidacionContrasena, NombreRol } = req.body;
    const sql = 'INSERT INTO Usuarios (NombreUsuario, CorreoUsuario, ContrasenaUsuario, ValidacionContrasena, NombreRol) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [NombreUsuario, CorreoUsuario, ContrasenaUsuario, ValidacionContrasena, NombreRol], (err, result) => {
        if (err) throw err;
        console.log('Usuario insertado correctamente.');
        res.redirect('/');
    });
});

app.post('/iniciar_sesion', (req, res) => {
    const { username, password } = req.body;

    // Consulta para verificar el usuario y la contraseña
    const query = 'SELECT * FROM usuarios WHERE NombreUsuario = ? AND ContrasenaUsuario = ?';
    connection.query(query, [username, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            // Si el usuario y la contraseña coinciden, redirige al usuario a ListarCRUD.html
            res.redirect('/ListarCRUD.html');
        } else {
            // Si no coinciden, envía un mensaje de error
            res.send('Nombre de usuario o contraseña incorrectos.');
        }
    });
});





app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

