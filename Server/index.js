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


// Ruta para obtener todas las consignaciones
app.get('/consignaciones', (req, res) => {
    const sqlQuery = 'SELECT * FROM consignaciones';
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.log('Error al obtener consignaciones:', err);
        res.status(500).send('Error al obtener consignaciones');
      } else {
        res.json(result);
      }
    });
});

// Ruta para obtener los detalles de una consignación específica
app.get('/detalle_consignaciones/:id_consignacion', (req, res) => {
    const id_consignacion = req.params.id_consignacion;
    const sqlQuery = `SELECT dc.*, ip.titulo AS nombre_producto, (dc.cantidad * dc.precio_unitario) AS precio_total FROM detalle_consignaciones dc JOIN inventario_productos ip ON dc.id_producto = ip.id WHERE dc.id_consignacion = ?`;

    db.query(sqlQuery, [id_consignacion], (err, result) => {
        if (err) {
            console.log('Error al obtener detalles de la consignación:', err);
            res.status(500).send('Error al obtener detalles de la consignación');
        } else {
            res.json(result);
        }
    });
});

// Ruta para cancelar una consignación
app.delete('/cancelar_consignacion/:id_consignacion', (req, res) => {
    const id_consignacion = req.params.id_consignacion;

    // Primero eliminamos los detalles de la consignación
    const deleteDetailsQuery = 'DELETE FROM detalle_consignaciones WHERE id_consignacion = ?';
    db.query(deleteDetailsQuery, [id_consignacion], (err, result) => {
        if (err) {
            console.log('Error al eliminar detalles de la consignación:', err);
            res.status(500).send('Error al eliminar detalles de la consignación');
        } else {
            // Después eliminamos la consignación
            const deleteConsignacionQuery = 'DELETE FROM consignaciones WHERE id_consignacion = ?';
            db.query(deleteConsignacionQuery, [id_consignacion], (err, result) => {
                if (err) {
                    console.log('Error al eliminar consignación:', err);
                    res.status(500).send('Error al eliminar consignación');
                } else {
                    res.json({ message: 'Consignación cancelada correctamente' });
                }
            });
        }
    });
});

// Ruta para procesar una venta a partir de una consignación
app.post('/procesar_consignacion/:id_consignacion', (req, res) => {
    const id_consignacion = req.params.id_consignacion;

    // Consultamos la consignación y sus detalles
    const getConsignacionDetailsQuery = 'SELECT * FROM consignaciones WHERE id_consignacion = ?';
    db.query(getConsignacionDetailsQuery, [id_consignacion], (err, consignacionResult) => {
        if (err) {
            console.log('Error al obtener la consignación:', err);
            return res.status(500).send('Error al obtener la consignación');
        }

        const consignacion = consignacionResult[0];

        // Insertamos la consignación en la tabla ventas
        const insertVentaQuery = 'INSERT INTO ventas SET ?';
        const ventaData = {
            nombre_institucion: consignacion.nombre_institucion,
            direccion_institucion: consignacion.direccion_institucion,
            telefono_institucion: consignacion.telefono_institucion,
            total_final: consignacion.total_final,
            fecha_consignacion: consignacion.fecha_consignacion,
            plazo_consignacion: consignacion.plazo_consignacion 
        };

        db.query(insertVentaQuery, ventaData, (err, ventaResult) => {
            if (err) {
                console.log('Error al insertar venta:', err);
                return res.status(500).send('Error al insertar venta');
            }

            const id_venta = ventaResult.insertId;

            // Transferimos los productos a la tabla detalle_ventas
            const getDetalleConsignacionQuery = 'SELECT * FROM detalle_consignaciones WHERE id_consignacion = ?';
            db.query(getDetalleConsignacionQuery, [id_consignacion], (err, detalles) => {
                if (err) {
                    console.log('Error al obtener detalles de la consignación:', err);
                    return res.status(500).send('Error al obtener detalles de la consignación');
                }

                const insertDetalleVentaQuery = 'INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio_unitario, precio_total) VALUES ?';
                const detalleVentaData = detalles.map((detalle) => [
                    id_venta,
                    detalle.id_producto,
                    detalle.cantidad,
                    detalle.precio_unitario,
                    detalle.precio_total
                ]);

                db.query(insertDetalleVentaQuery, [detalleVentaData], (err, result) => {
                    if (err) {
                        console.log('Error al insertar detalle venta:', err);
                        return res.status(500).send('Error al insertar detalle venta');
                    }

                    // Eliminamos la consignación después de transferir los datos
                    const deleteDetailsQuery = 'DELETE FROM detalle_consignaciones WHERE id_consignacion = ?';
                    db.query(deleteDetailsQuery, [id_consignacion], (err, result) => {
                        if (err) {
                            console.log('Error al eliminar detalles de la consignación:', err);
                            return res.status(500).send('Error al eliminar detalles de la consignación');
                        }

                        const deleteConsignacionQuery = 'DELETE FROM consignaciones WHERE id_consignacion = ?';
                        db.query(deleteConsignacionQuery, [id_consignacion], (err, result) => {
                            if (err) {
                                console.log('Error al eliminar consignación:', err);
                                return res.status(500).send('Error al eliminar consignación');
                            }

                            // Respuesta final después de todas las operaciones
                            res.json({ message: 'Consignación procesada y venta creada correctamente' });
                        });
                    });
                });
            });
        });
    });
});


// Modificación de Fecha de Plazo de Consignación
app.put('/modificar_plazo/:id_consignacion', (req, res) => {
    const { nuevoPlazo } = req.body;
    const sql = 'UPDATE consignaciones SET plazo_consignacion = ? WHERE id_consignacion = ?';
    db.query(sql, [nuevoPlazo, req.params.id_consignacion], (err, result) => {
      if (err) {
        console.log('Error al modificar plazo:', err);
        res.status(500).send('Error al modificar plazo');
      } else {
        res.json({ message: 'Plazo modificado correctamente' });
      }
    });
  });

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "VENTAS" PARA INTERNO-----------------------------------------------

// Ruta para obtener todas las ventas
app.get('/ventas', (req, res) => {
    const sqlQuery = 'SELECT * FROM ventas';
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log('Error al obtener ventas:', err);
            res.status(500).send('Error al obtener ventas');
        } else {
            res.json(result);
        }
    });
});

// Ruta para obtener los detalles de una venta específica
app.get('/detalle_ventas/:id_venta', (req, res) => {
    const id_venta = req.params.id_venta;
    const sqlQuery = `SELECT dv.*, ip.titulo AS nombre_producto, (dv.cantidad * dv.precio_unitario) AS precio_total FROM detalle_ventas dv JOIN inventario_productos ip ON dv.id_producto = ip.id WHERE dv.id_venta = ?`;

    db.query(sqlQuery, [id_venta], (err, result) => {
        if (err) {
            console.log('Error al obtener detalles de la venta:', err);
            res.status(500).send('Error al obtener detalles de la venta');
        } else {
            res.json(result);
        }
    });
});

// Ruta para cancelar una venta
app.delete('/cancelar_venta/:id_venta', (req, res) => {
    const id_venta = req.params.id_venta;

    // Primero eliminamos los detalles de la venta
    const deleteDetailsQuery = 'DELETE FROM detalle_ventas WHERE id_venta = ?';
    db.query(deleteDetailsQuery, [id_venta], (err, result) => {
        if (err) {
            console.log('Error al eliminar detalles de la venta:', err);
            res.status(500).send('Error al eliminar detalles de la venta');
        } else {
            // Después eliminamos la venta
            const deleteVentaQuery = 'DELETE FROM ventas WHERE id_venta = ?';
            db.query(deleteVentaQuery, [id_venta], (err, result) => {
                if (err) {
                    console.log('Error al eliminar venta:', err);
                    res.status(500).send('Error al eliminar venta');
                } else {
                    res.json({ message: 'Venta cancelada correctamente' });
                }
            });
        }
    });
});

// Ruta para procesar una venta a partir de una consignación
app.post('/procesar_venta/:id_venta', (req, res) => {
    const id_venta = req.params.id_venta;

    // Consultamos la venta y sus detalles
    const getVentaDetailsQuery = 'SELECT * FROM ventas WHERE id_venta = ?';
    db.query(getVentaDetailsQuery, [id_venta], (err, ventaResult) => {
        if (err) {
            console.log('Error al obtener la venta:', err);
            return res.status(500).send('Error al obtener la venta');
        }

        const venta = ventaResult[0];

        // Asegúrate de que la venta existe
        if (!venta) {
            return res.status(404).send('Venta no encontrada');
        }

        // Insertamos la venta en la tabla de registros con los campos adecuados
        const insertRegistroQuery = `INSERT INTO registro SET ?`;
        const registroData = {
            nombre_institucion: venta.nombre_institucion,
            direccion_institucion: venta.direccion_institucion,
            telefono_institucion: venta.telefono_institucion,
            total_final: venta.total_final,
            fecha_consignacion: venta.fecha_consignacion, // Nueva columna
            plazo_consignacion: venta.plazo_consignacion, // Nueva columna
            fecha_venta: venta.fecha_venta, // Nueva columna
            fecha_venta_final: new Date()  // fecha_venta_final actual
        };

        db.query(insertRegistroQuery, registroData, (err, registroResult) => {
            if (err) {
                console.log('Error al insertar registro:', err);
                return res.status(500).send('Error al insertar registro');
            }

            const id_registro = registroResult.insertId;

            // Transferimos los productos a la tabla detalle_registro
            const getDetalleVentaQuery = 'SELECT * FROM detalle_ventas WHERE id_venta = ?';
            db.query(getDetalleVentaQuery, [id_venta], (err, detalles) => {
                if (err) {
                    console.log('Error al obtener detalles de la venta:', err);
                    return res.status(500).send('Error al obtener detalles de la venta');
                }

                if (detalles.length === 0) {
                    return res.status(404).send('No se encontraron detalles de la venta');
                }

                const insertDetalleRegistroQuery = 'INSERT INTO detalle_registro (id_registro, id_producto, cantidad, precio_unitario, precio_total) VALUES ?';
                const detalleRegistroData = detalles.map((detalle) => [
                    id_registro,
                    detalle.id_producto,
                    detalle.cantidad,
                    detalle.precio_unitario,
                    detalle.precio_total
                ]);

                db.query(insertDetalleRegistroQuery, [detalleRegistroData], (err, result) => {
                    if (err) {
                        console.log('Error al insertar detalle registro:', err);
                        return res.status(500).send('Error al insertar detalle registro');
                    }

                    // Actualizamos la cantidad en inventario_producto para cada producto
                    detalles.forEach((detalle) => {
                        const updateInventarioQuery = 'UPDATE inventario_productos SET cantidad_disponible = cantidad_disponible - ? WHERE id = ?';
                        db.query(updateInventarioQuery, [detalle.cantidad, detalle.id_producto], (err, result) => {
                            if (err) {
                                console.log('Error al actualizar inventario:', err);
                            }
                        });
                    });

                    // Eliminamos los detalles de la venta después de transferir los datos
                    const deleteDetailsQuery = 'DELETE FROM detalle_ventas WHERE id_venta = ?';
                    db.query(deleteDetailsQuery, [id_venta], (err, result) => {
                        if (err) {
                            console.log('Error al eliminar detalles de la venta:', err);
                            return res.status(500).send('Error al eliminar detalles de la venta');
                        }

                        // Eliminamos la venta después de transferir los datos
                        const deleteVentaQuery = 'DELETE FROM ventas WHERE id_venta = ?';
                        db.query(deleteVentaQuery, [id_venta], (err, result) => {
                            if (err) {
                                console.log('Error al eliminar venta:', err);
                                return res.status(500).send('Error al eliminar venta');
                            }

                            // Respuesta final después de todas las operaciones
                            res.json({ message: 'Venta procesada y registro creado correctamente' });
                        });
                    });
                });
            });
        });
    });
});

// Actualizar cantidades en detalle ventas
app.put('/actualizar_detalle_venta/:id_detalle_venta', (req, res) => {
    const { id_detalle_venta } = req.params;
    const { cantidad } = req.body;
  
    // Validar la cantidad
    if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
      return res.status(400).send('La cantidad no es válida');
    }
  
    // Obtener el precio_unitario del producto y el id_venta para actualizar el total_final
    const getPrecioUnitarioQuery = `SELECT precio_unitario, id_venta FROM detalle_ventas WHERE id_detalle_venta = ?`;
  
    db.query(getPrecioUnitarioQuery, [id_detalle_venta], (err, result) => {
      if (err) {
        return res.status(500).send('Error al obtener el precio unitario');
      }
  
      if (result.length === 0) {
        return res.status(404).send('Detalle de venta no encontrado');
      }
  
      const precio_unitario = result[0].precio_unitario;
      const id_venta = result[0].id_venta;
      const precio_total = cantidad * precio_unitario;
  
      // Actualizar la cantidad y el precio_total en la tabla detalle_ventas
      const updateQuery = `UPDATE detalle_ventas SET cantidad = ?, precio_total = ? WHERE id_detalle_venta = ?`;
  
      db.query(updateQuery, [cantidad, precio_total, id_detalle_venta], (err, result) => {
        if (err) {
          return res.status(500).send('Error al actualizar el detalle de la venta');
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).send('No se encontró el detalle de la venta para actualizar');
        }
  
        // Calcular el nuevo total_final sumando los precios_totales de todos los productos de la venta
        const getTotalFinalQuery = `SELECT SUM(precio_total) AS total_final FROM detalle_ventas WHERE id_venta = ?`;
  
        db.query(getTotalFinalQuery, [id_venta], (err, totalResult) => {
          if (err) {
            return res.status(500).send('Error al calcular el total final de la venta');
          }
  
          const total_final = totalResult[0].total_final;
  
          // Actualizar el total_final en la tabla ventas
          const updateTotalFinalQuery = `UPDATE ventas SET total_final = ? WHERE id_venta = ?`;
  
          db.query(updateTotalFinalQuery, [total_final, id_venta], (err, result) => {
            if (err) {
              return res.status(500).send('Error al actualizar el total final de la venta');
            }
  
            res.send('Cantidad, precio total y total final de la venta actualizados correctamente');
          });
        });
      });
    });
  });

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "REGISTROS" PARA INTERNO-----------------------------------------------

// Ruta para obtener todos los registros
app.get('/verregistros', (req, res) => {
    const sqlQuery = 'SELECT * FROM registro';
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.log('Error al obtener registros:', err);
        res.status(500).send('Error al obtener registros');
      } else {
        res.json(result);
      }
    });
  });
  
  // Ruta para obtener los detalles de un registro específico
  app.get('/detalle_registro/:id_registro', (req, res) => {
    const id_registro = req.params.id_registro;
    const sqlQuery = `SELECT dr.*, ip.titulo AS nombre_producto, (dr.cantidad * dr.precio_unitario) AS precio_total 
                      FROM detalle_registro dr 
                      JOIN inventario_productos ip ON dr.id_producto = ip.id 
                      WHERE dr.id_registro = ?`;
  
    db.query(sqlQuery, [id_registro], (err, result) => {
      if (err) {
        console.log('Error al obtener detalles del registro:', err);
        res.status(500).send('Error al obtener detalles del registro');
      } else {
        res.json(result);
      }
    });
  });
  
  // Ruta para cancelar un registro
  app.delete('/cancelar_registro/:id_registro', (req, res) => {
    const id_registro = req.params.id_registro;
  
    // Primero eliminamos los detalles del registro
    const deleteDetailsQuery = 'DELETE FROM detalle_registro WHERE id_registro = ?';
    db.query(deleteDetailsQuery, [id_registro], (err, result) => {
      if (err) {
        console.log('Error al eliminar detalles del registro:', err);
        res.status(500).send('Error al eliminar detalles del registro');
      } else {
        // Después eliminamos el registro
        const deleteRegistroQuery = 'DELETE FROM registro WHERE id_registro = ?';
        db.query(deleteRegistroQuery, [id_registro], (err, result) => {
          if (err) {
            console.log('Error al eliminar registro:', err);
            res.status(500).send('Error al eliminar registro');
          } else {
            res.json({ message: 'Registro cancelado correctamente' });
          }
        });
      }
    });
  });

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "BITACORA" PARA INTERNO-----------------------------------------------

// ...

// INDICACIÓN DE PUERTO A UTILIZAR
app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001 FUNCIONA")
})