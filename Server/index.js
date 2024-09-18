const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// INDICACIÓN GENERAL DE USO DE BASE DE DATOS
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "editorial_db"
});

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "USUARIOS" -----------------------------------------------
app.post("/create", (req,res)=>{
    const nombre = req.body.nombre;
    const contrasenia = req.body.contrasenia;
    const correo = req.body.correo;
    const numero = req.body.numero;
    const rol = req.body.rol;

    db.query('INSERT INTO usuarios(nombre_usuario,contraseña,correo_electronico,numero_telefono,rol) VALUES(?,?,?,?,?)',[nombre,contrasenia,correo,numero,rol],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.get("/registros", (req,res)=>{
    db.query('SELECT * FROM usuarios',
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.put("/update", (req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const contrasenia = req.body.contrasenia;
    const correo = req.body.correo;
    const numero = req.body.numero;
    const rol = req.body.rol;

    db.query('UPDATE usuarios SET nombre_usuario=?,contraseña=?,correo_electronico=?,numero_telefono=?,rol=? WHERE id_usuario=?',[nombre,contrasenia,correo,numero,rol,id],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM usuarios WHERE id_usuario=?',id,
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "INVENTARIO" -----------------------------------------------

app.post("/createInventario", (req, res) => {
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const precio_sugerido = req.body.precio_sugerido;
    const cantidad_disponible = req.body.cantidad_disponible;
    const estado = req.body.estado || 'disponible'; // Si no se especifica, por defecto es 'disponible'

    db.query(
        'INSERT INTO inventario_productos(titulo, descripcion, precio_sugerido, cantidad_disponible, estado) VALUES(?, ?, ?, ?, ?)',
        [titulo, descripcion, precio_sugerido, cantidad_disponible, estado],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/registrosInventario", (req, res) => {
    db.query('SELECT * FROM inventario_productos',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/updateInventario", (req, res) => {
    const id = req.body.id;
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const precio_sugerido = req.body.precio_sugerido;
    const cantidad_disponible = req.body.cantidad_disponible;
    const estado = req.body.estado;

    db.query(
        'UPDATE inventario_productos SET titulo=?, descripcion=?, precio_sugerido=?, cantidad_disponible=?, estado=? WHERE id=?',
        [titulo, descripcion, precio_sugerido, cantidad_disponible, estado, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/deleteInventario/:id", (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM inventario_productos WHERE id=?', id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "PEDIDO" PARA EL CATALOGO-----------------------------------------------

app.post('/cotizar', (req, res) => {
    const { nombre_institucion, direccion_institucion, telefono_institucion, productos, total_final } = req.body;
  
    // Comenzamos creando un nuevo pedido en la tabla 'pedidos'
    const pedidoQuery = `INSERT INTO pedidos (nombre_institucion, direccion_institucion, telefono_institucion, total_final) VALUES (?, ?, ?, ?)`;
  
    db.query(pedidoQuery, [nombre_institucion, direccion_institucion, telefono_institucion, total_final], (err, result) => {
      if (err) {
        console.error('Error al insertar el pedido:', err);
        return res.status(500).json({ message: 'Error al crear el pedido' });
      }
  
      const id_pedido = result.insertId; // Obtenemos el id del pedido recién insertado
  
      // Insertar cada producto en la tabla 'detalle_pedidos'
      const detalleQuery = `INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, precio_unitario, precio_total) VALUES (?, ?, ?, ?, ?)`;
  
      productos.forEach((producto) => {
        const { id, price, cantidad } = producto;
        const precio_total = price * cantidad;
  
        db.query(detalleQuery, [id_pedido, id, cantidad, price, precio_total], (err, result) => {
          if (err) {
            console.error('Error al insertar el detalle del pedido:', err);
            return res.status(500).json({ message: 'Error al crear detalles del pedido' });
          }
        });
      });
  
      res.status(200).json({ message: 'Pedido creado exitosamente' });
    });
  });

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "PEDIDO" PARA INTERNO-----------------------------------------------

// Ruta para obtener todos los pedidos
app.get('/pedidos', (req, res) => {
    const sqlQuery = 'SELECT * FROM pedidos';
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.log('Error al obtener pedidos:', err);
        res.status(500).send('Error al obtener pedidos');
      } else {
        res.json(result);
      }
    });
  });
  
  // Ruta para obtener los detalles de un pedido específico
  app.get('/detalle_pedidos/:id_pedido', (req, res) => {
    const id_pedido = req.params.id_pedido;
    const sqlQuery = `SELECT dp.*, ip.titulo AS nombre_producto, (dp.cantidad * dp.precio_unitario) AS precio_total FROM detalle_pedidos dp JOIN inventario_productos ip ON dp.id_producto = ip.id WHERE dp.id_pedido = ?`;

    db.query(sqlQuery, [id_pedido], (err, result) => {
        if (err) {
        console.log('Error al obtener detalles del pedido:', err);
        res.status(500).send('Error al obtener detalles del pedido');
        } else {
        res.json(result);
        }
    });
  });

  // Ruta para cancelar un pedido
app.delete('/cancelar_pedido/:id_pedido', (req, res) => {
  const id_pedido = req.params.id_pedido;

  // Primero eliminamos los detalles del pedido
  const deleteDetailsQuery = 'DELETE FROM detalle_pedidos WHERE id_pedido = ?';
  db.query(deleteDetailsQuery, [id_pedido], (err, result) => {
    if (err) {
      console.log('Error al eliminar detalles del pedido:', err);
      res.status(500).send('Error al eliminar detalles del pedido');
    } else {
      // Después eliminamos el pedido
      const deleteOrderQuery = 'DELETE FROM pedidos WHERE id_pedido = ?';
      db.query(deleteOrderQuery, [id_pedido], (err, result) => {
        if (err) {
          console.log('Error al eliminar pedido:', err);
          res.status(500).send('Error al eliminar pedido');
        } else {
          res.json({ message: 'Pedido cancelado correctamente' });
        }
      });
    }
  });
});

  // Ruta para procesar un pedido
  app.post('/procesar_pedido/:id_pedido', (req, res) => {
    const id_pedido = req.params.id_pedido;

    // Consultamos el pedido y los detalles
    const getOrderDetailsQuery = 'SELECT * FROM pedidos WHERE id_pedido = ?';
    db.query(getOrderDetailsQuery, [id_pedido], (err, pedidoResult) => {
        if (err) {
            console.log('Error al obtener el pedido:', err);
            return res.status(500).send('Error al obtener el pedido');
        }

        const pedido = pedidoResult[0];

        // Insertamos el pedido en la tabla consignaciones
        const insertConsignacionQuery = 'INSERT INTO consignaciones SET ?';
        const consignacionData = {
            nombre_institucion: pedido.nombre_institucion,
            direccion_institucion: pedido.direccion_institucion,
            telefono_institucion: pedido.telefono_institucion,
            total_final: pedido.total_final
        };
        db.query(insertConsignacionQuery, consignacionData, (err, consignacionResult) => {
            if (err) {
                console.log('Error al insertar consignación:', err);
                return res.status(500).send('Error al insertar consignación');
            }

            const id_consignacion = consignacionResult.insertId;

            // Transferimos los productos a la tabla detalle_consignaciones
            const getDetallePedidoQuery = 'SELECT * FROM detalle_pedidos WHERE id_pedido = ?';
            db.query(getDetallePedidoQuery, [id_pedido], (err, detalles) => {
                if (err) {
                    console.log('Error al obtener detalles del pedido:', err);
                    return res.status(500).send('Error al obtener detalles del pedido');
                }

                const insertDetalleConsignacionQuery = 'INSERT INTO detalle_consignaciones (id_consignacion, id_producto, cantidad, precio_unitario, precio_total) VALUES ?';
                const detalleConsignacionData = detalles.map((detalle) => [
                    id_consignacion,
                    detalle.id_producto,
                    detalle.cantidad,
                    detalle.precio_unitario,
                    detalle.precio_total
                ]);

                db.query(insertDetalleConsignacionQuery, [detalleConsignacionData], (err, result) => {
                    if (err) {
                        console.log('Error al insertar detalle consignación:', err);
                        return res.status(500).send('Error al insertar detalle consignación');
                    }

                    // Eliminación del Registro en Pedidos
                    const deleteDetailsQuery = 'DELETE FROM detalle_pedidos WHERE id_pedido = ?';
                    db.query(deleteDetailsQuery, [id_pedido], (err, result) => {
                        if (err) {
                            console.log('Error al eliminar detalles del pedido:', err);
                            return res.status(500).send('Error al eliminar detalles del pedido');
                        }

                        const deleteOrderQuery = 'DELETE FROM pedidos WHERE id_pedido = ?';
                        db.query(deleteOrderQuery, [id_pedido], (err, result) => {
                            if (err) {
                                console.log('Error al eliminar pedido:', err);
                                return res.status(500).send('Error al eliminar pedido');
                            }

                            // Respuesta final después de todas las operaciones
                            res.json({ message: 'Pedido cancelado correctamente' });
                        });
                    });
                });
            });
        });
    });
});

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "CONSIGNACIONES" PARA INTERNO-----------------------------------------------

// ...

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "VENTAS" PARA INTERNO-----------------------------------------------

// ...

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "REGISTROS" PARA INTERNO-----------------------------------------------

// ...

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "BITACORA" PARA INTERNO-----------------------------------------------

// ...

// INDICACIÓN DE PUERTO A UTILIZAR
app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001 FUNCIONA")
})