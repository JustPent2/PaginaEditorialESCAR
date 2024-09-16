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

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "PEDIDO" -----------------------------------------------

// ... Contenido

// INDICACIÓN DE PUERTO A UTILIZAR
app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001 FUNCIONA")
})