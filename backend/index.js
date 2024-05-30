const express = require('express')
const cors = require('cors');
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()
app.use(cors());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    next()
})

app.use(bodyParser.json())

const PUERTO = 3000

const conexion = mysql.createConnection(
    {
        host: 'localhost',
        database: 'miramar',
        user: 'dwes',
        password: 'abc123'
    }
)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto: ${PUERTO}`)
})

conexion.connect(error => {
    if (error) throw error
    console.log('Conexión exitosa a la base de datos');
})

app.get('/', (req, res) => {
    res.send('API')
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM usuario WHERE email = ?`;
    conexion.query(query, [email], (error, resultados) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al buscar el usuario' });
        }

        if (resultados.length === 0) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        const usuario = resultados[0];
        const hashedPassword = usuario.password;

        // Verificar la contraseña
        const queryCheckPassword = `SELECT PASSWORD(?) AS hashedPassword`;
        conexion.query(queryCheckPassword, [password], (error, resultados) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ error: 'Error al verificar la contraseña' });
            }

            const inputHashedPassword = resultados[0].hashedPassword;
            if (inputHashedPassword === hashedPassword) {
                return res.json({ mensaje: 'Autenticación exitosa' });
            } else {
                return res.status(401).json({ error: 'Email o contraseña incorrectos' });
            }
        });
    });
});


app.post('/users', (req, res) => {
    const { fullName, email, password } = req.body;

    const query = `INSERT INTO usuario (fullName, email, password) VALUES (?, ?, PASSWORD(?))`;
    const params = [fullName, email, password];

    conexion.query(query, params, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar el usuario' });
        }

        res.json(`Se ha insertado el usuario correctamente`);
    });
});

app.get('/habitaciones', (req, res) => {
    const query = `SELECT * FROM habitacion WHERE disponible = 1`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No hay habitaciones`)
        }
    })
})

app.get('/reservas', (req, res) => {
    const query = `SELECT * FROM reserva`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json[(`No hay reservas`)]
        }
    })
})

app.get('/reservas/:id_reserva', (req, res) => {
    const { id_reserva } = req.params

    const query = `SELECT * FROM reserva WHERE id_reserva='${id_reserva}'`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No se ha encontrado ninguna reserva con ese id`)
        }
    })
})

app.post('/reservas/agregar', (req, res) => {
    const { id_habitacion, fecha_entrada, fecha_salida } = req.body;

    const checkQuery = `SELECT disponible FROM habitacion WHERE id_habitacion = ?`;
    conexion.query(checkQuery, [id_habitacion], (error, resultados) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json('Error al verificar la disponibilidad de la habitación');
        }

        if (resultados.length === 0 || !resultados[0].disponible) {
            return res.status(400).json('La habitación no está disponible o no existe');
        }

        const insertQuery = `INSERT INTO reserva (id_habitacion, fecha_entrada, fecha_salida) VALUES (?, ?, ?)`;
        const params = [id_habitacion, fecha_entrada, fecha_salida];

        conexion.query(insertQuery, params, (error, resultado) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json('Error al insertar la reserva');
            }

            const updateQuery = `UPDATE habitacion SET disponible = 0 WHERE id_habitacion = ?`;
            conexion.query(updateQuery, [id_habitacion], (error, resultado) => {
                if (error) {
                    console.error(error.message);
                    return res.status(500).json('Error al actualizar la disponibilidad de la habitación');
                }

                res.json('Se ha creado la reserva correctamente');
            });
        });
    });
});

app.put('/reservas/actualizar/:id_reserva', (req, res) => {
    const { id_reserva } = req.params;
    const { fecha_entrada, fecha_salida } = req.body;

    const updateQuery = `UPDATE reserva SET fecha_entrada = ?, fecha_salida = ? WHERE id_reserva = ?`;
    const params = [fecha_entrada, fecha_salida, id_reserva];

    conexion.query(updateQuery, params, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al actualizar la reserva' });
        }

        res.json('Se ha actualizado la reserva correctamente');
    });
});


app.delete('/reservas/borrar/:id_reserva', (req, res) => {
    const { id_reserva } = req.params;

    const getHabitacionQuery = `SELECT id_habitacion FROM reserva WHERE id_reserva = ?`;
    conexion.query(getHabitacionQuery, [id_reserva], (error, resultados) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al obtener la habitación de la reserva' });
        }

        if (resultados.length === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        const id_habitacion = resultados[0].id_habitacion;

        const deleteQuery = `DELETE FROM reserva WHERE id_reserva = ?`;
        conexion.query(deleteQuery, [id_reserva], (error, resultado) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ error: 'Error al eliminar la reserva' });
            }

            const updateQuery = `UPDATE habitacion SET disponible = 1 WHERE id_habitacion = ?`;
            conexion.query(updateQuery, [id_habitacion], (error, resultado) => {
                if (error) {
                    console.error(error.message);
                    return res.status(500).json({ error: 'Error al actualizar la disponibilidad de la habitación' });
                }

                res.json('Se ha eliminado la reserva correctamente');
            });
        });
    });
});
