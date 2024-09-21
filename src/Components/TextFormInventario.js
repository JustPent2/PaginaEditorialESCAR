import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';

const TextFormInventario = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioSugerido, setPrecioSugerido] = useState("");
  const [cantidadDisponible, setCantidadDisponible] = useState("");
  const [estado, setEstado] = useState("disponible");
  const [registros, setRegistros] = useState([]);
  const [id, setId] = useState(null);

  // Función para limpiar los campos del formulario
  const limpiarFormulario = () => {
    setId(null);
    setTitulo("");
    setDescripcion("");
    setPrecioSugerido("");
    setCantidadDisponible("");
    setEstado("disponible");
  };

  // Función para obtener todos los registros de inventario_productos
  const obtenerRegistros = () => {
    axios.get("http://localhost:3001/registrosInventario").then((response) => {
        setRegistros(response.data);
      })
      .catch((error) => {
        Swal.fire("Error", "Hubo un problema al obtener los registros", "error");
      });
  };

  // Función para crear un nuevo registro
  const crearRegistro = () => {
    if (!titulo || !precioSugerido || !cantidadDisponible) {
      Swal.fire("Advertencia", "Todos los campos son obligatorios", "warning");
      return;
    }

    axios.post("http://localhost:3001/createInventario", {
        titulo,
        descripcion,
        precio_sugerido: precioSugerido,
        cantidad_disponible: cantidadDisponible,
        estado
      }).then(() => {
        Swal.fire("Éxito", "El producto ha sido agregado al inventario", "success");
        obtenerRegistros(); // Actualizamos la tabla
        setTitulo("");
        setDescripcion("");
        setPrecioSugerido("");
        setCantidadDisponible("");
        setEstado("disponible");
      }).catch((error) => {
        Swal.fire("Error", "No se pudo agregar el producto", "error");
      });
  };

  // Función para seleccionar un registro y cargarlo en el formulario
  const seleccionarRegistro = (registro) => {
    setId(registro.id);
    setTitulo(registro.titulo);
    setDescripcion(registro.descripcion);
    setPrecioSugerido(registro.precio_sugerido);
    setCantidadDisponible(registro.cantidad_disponible);
    setEstado(registro.estado);
  };

  // Función para actualizar un registro
  const actualizarRegistro = () => {
    if (!titulo || !precioSugerido || !cantidadDisponible) {
      Swal.fire("Advertencia", "Todos los campos son obligatorios", "warning");
      return;
    }

    axios.put("http://localhost:3001/updateInventario", {
        id,
        titulo,
        descripcion,
        precio_sugerido: precioSugerido,
        cantidad_disponible: cantidadDisponible,
        estado
      }).then(() => {
        Swal.fire("Éxito", "El producto ha sido actualizado", "success");
        obtenerRegistros();
        setId(null);
        setTitulo("");
        setDescripcion("");
        setPrecioSugerido("");
        setCantidadDisponible("");
        setEstado("disponible");
      }).catch((error) => {
        Swal.fire("Error", "No se pudo actualizar el producto", "error");
      });
  };

  // Función para eliminar un registro
  const eliminarRegistro = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/deleteInventario/${id}`)
          .then(() => {
            Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
            obtenerRegistros();
          })
          .catch((error) => {
            Swal.fire("Error", "No se pudo eliminar el producto", "error");
          });
      }
    });
  };

  // Cargar registros al iniciar
  useEffect(() => {
    obtenerRegistros();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Inventario de Productos</h1>
      <div className="card p-4 mb-4">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="titulo">Título del Producto</label>
            <input
              type="text"
              id="titulo"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}/>
          </div>
          <div className="col-md-6">
            <label htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}/>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <label htmlFor="precioSugerido">Precio Sugerido</label>
            <input
              type="number"
              id="precioSugerido"
              className="form-control"
              value={precioSugerido}
              onChange={(e) => setPrecioSugerido(e.target.value)}/>
          </div>
          <div className="col-md-6">
            <label htmlFor="cantidadDisponible">Cantidad Disponible</label>
            <input
              type="number"
              id="cantidadDisponible"
              className="form-control"
              value={cantidadDisponible}
              onChange={(e) => setCantidadDisponible(e.target.value)}/>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <label htmlFor="estado">Estado</label>
            <select
              id="estado"
              className="form-control"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}>
              <option value="disponible">Disponible</option>
              <option value="agotado">Agotado</option>
            </select>
          </div>
        </div>
        <div className="text-center mt-4">
        {id ? (
            <>
              <button className="btn btn-warning me-2" onClick={actualizarRegistro}>
                Actualizar Producto
              </button>
              <button className="btn btn-secondary" onClick={limpiarFormulario}>
                Cancelar Edición
              </button>
            </>
          ) : (
            <button className="btn btn-success" onClick={crearRegistro}>
              Agregar al Inventario
            </button>
          )}
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Título del Producto</th>
            <th>Descripción</th>
            <th>Precio Sugerido</th>
            <th>Cantidad Disponible</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, index) => (
            <tr key={registro.id}>
              <td>{index + 1}</td>
              <td>{registro.titulo}</td>
              <td>{registro.descripcion}</td>
              <td>Q{registro.precio_sugerido}</td>
              <td>{registro.cantidad_disponible}</td>
              <td>{registro.estado}</td>
              <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => seleccionarRegistro(registro)}>
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarRegistro(registro.id)}>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TextFormInventario;
