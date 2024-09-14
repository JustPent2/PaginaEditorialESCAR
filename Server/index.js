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

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "USUARIOS"
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

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "INVENTARIO"

// ... Contenido

// OPERACIONES DE BASE DE DATOS CON LA TABLA DE "PEDIDO"

// ... Contenido

// INDICACIÓN DE PUERTO A UTILIZAR
app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001 FUNCIONA")
})