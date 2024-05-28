//Libreria de Express
const express = require('express');
//Libreria Path
const path = require('path');
//Libreria Mysql
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: '10.0.6.39',
    user: 'estudiante',
    password: 'Info-2023',
    database: ''
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
app.use(express.static(path.join(__dirname, 'pagina_principal')));

//Recibo los valores y los envio a la tabla
app.post('/guardar_pelicula',(req, res) => {
    const { nombre, descripcion, fecha, categoria, precio } = req.body;
    const sql = 'INSERT INTO Peliculas (nombre, descripcion, fecha, categoria, precio) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [nombre, descripcion, fecha, categoria, precio], (err, result) => {
        if (err) throw err;
        console.log('Película insertada correctamente.');
        res.redirect('/');
    });
});

//Ruta para mostrar las películas en el listardatos.html con metodo GET
app.get('/peliculas', (req, res) => {
    //Realiza una consulta SQL para seleccionar todas las filas de la tabla "peliculas"
    connection.query('SELECT * FROM Peliculas', (err, rows) => {
        //Maneja los errores, si los hay
        if (err) throw err;
        res.send(rows); //Aquí puedes enviar la respuesta como quieras (por ejemplo, renderizar un HTML o enviar un JSON)
    });
});


//Define una ruta DELETE en la aplicación Express para eliminar una película por su ID
app.delete('/eliminar_pelicula/:id', (req, res) => {
    //Obtiene el parámetro 'id' de la URL para eliminar la pelicula en especifico
    const id = req.params.id;
    //Define la consulta SQL para eliminar una película donde el ID coincida
    const sql = 'DELETE FROM Peliculas WHERE id = ?';
    //Ejecuta la consulta SQL, utilizando el Id que se enviara a la consulta SQL
    connection.query(sql, [id], (err, result) => {
        // Si ocurre un error durante la ejecución de la consulta, lanza una excepción
        if (err) throw err;
        // Imprime un mensaje en la consola indicando que la película fue eliminada correctamente
        console.log('Película eliminada correctamente.');
        // Envía una respuesta HTTP 200 OK al cliente, indicando que la eliminación fue exitosa
        res.sendStatus(200); 
    });
});


app.post('/modificar_pelicula', (req, res) => {
    // Desestructura los datos del cuerpo de la solicitud (req.body)
    const { id, nombre, descripcion, fecha, categoria, precio } = req.body;
    // Consulta SQL para actualizar los datos de la película en la base de datos
    const sql = 'UPDATE Peliculas SET nombre = ?, descripcion = ?, fecha = ?, categoria = ?, precio = ? WHERE id = ?';
    // Ejecuta la consulta SQL
    connection.query(sql, [nombre, descripcion, fecha, categoria, precio, id], (err, result) => {
        if (err) {
            // Si ocurre un error, muestra un mensaje en la consola y envía una respuesta de error al cliente
            console.error('Error al modificar la película:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Si la actualización es exitosa, muestra un mensaje en la consola
        console.log('Película modificada correctamente.');
        // Redirecciona al usuario a la página de listado de películas
        res.redirect('/listardatos.html');
    });
});

// Ruta para obtener los datos de una película por su ID
app.get('/peliculas/:id', (req, res) => {
    // Extraer el ID de los parámetros de la solicitud
    const id = req.params.id;
    // Ejecutar una consulta SQL para obtener los datos de la película con el ID proporcionado
    connection.query('SELECT * FROM Peliculas WHERE id = ?', [id], (err, result) => {
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

