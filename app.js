//Libreria de Express
const express = require('express');
//Libreria Path
const path = require('path');
//Libreria      
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Enano2002$',
    database: 'ventasdb'
});

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
app.use(express.static(path.join(__dirname, 'pages')));

//Recibo los valores y los envio a la tabla
app.post('/guardar_producto',(req, res) => {
    const { nombre, descripcion, categoria, precio } = req.body;
    const sql = 'INSERT INTO Productos (NombreProducto, DescripcionProducto, NombreCategoria, PrecioProducto) VALUES (?, ?, ?, ?)';
    connection.query(sql, [nombre, descripcion, categoria, precio], (err, result) => {
        if (err) throw err;
        console.log('Producto insertado correctamente.');
        res.redirect('/');
    });
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


//Define una ruta DELETE en la aplicación Express para eliminar una película por su ID
app.delete('/eliminar_producto/:id', (req, res) => {
    //Obtiene el parámetro 'id' de la URL para eliminar la pelicula en especifico
    const id = req.params.id;
    //Define la consulta SQL para eliminar una película donde el ID coincida
    const sql = 'DELETE FROM Productos WHERE id = ?';
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
    // Desestructura los datos del cuerpo de la solicitud (req.body)
    const { id, nombre, descripcion, categoria, precio } = req.body;
    // Consulta SQL para actualizar los datos de la película en la base de datos
    const sql = 'UPDATE Peliculas SET nombre = ?, descripcion = ?, categoria = ?, precio = ? WHERE id = ?';
    // Ejecuta la consulta SQL
    connection.query(sql, [nombre, descripcion, categoria, precio, id], (err, result) => {
        if (err) {
            // Si ocurre un error, muestra un mensaje en la consola y envía una respuesta de error al cliente
            console.error('Error al modificar el producto:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Si la actualización es exitosa, muestra un mensaje en la consola
        console.log('Producto modificado correctamente.');
        // Redirecciona al usuario a la página de listado de películas
        res.redirect('/listarCRUD.html');
    });
});

app.post('/guardar_producto',(req, res) => {
    const { nombre, descripcion, categoria, precio } = req.body;
    const sql = 'INSERT INTO Productos (nombre, descripcion, categoria, precio) VALUES (?, ?, ?, ?)';
    connection.query(sql, [nombre, descripcion, categoria, precio], (err, result) => {
        if (err) {
            // Manejar el error si ocurre durante la consulta
            console.error('Error al obtener los datos de la película:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Verificar si no se encontró ninguna película con el ID proporcionado
        if (result.length === 0) {
            res.status(404).send('Película no encontrada');
            return;
        }
        // Enviar los datos de la película como respuesta en formato JSON
        res.json(result[0]);
    });
});



app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

