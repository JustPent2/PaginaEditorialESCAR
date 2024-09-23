import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function TextFormRegistros() {
  const [registros, setRegistros] = useState([]);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [detalleProductos, setDetalleProductos] = useState([]);

  // Cargar los registros desde la base de datos
  useEffect(() => {
    cargarRegistros();
  }, []);

  const cargarRegistros = () => {
    axios.get('http://localhost:3001/verregistros')
      .then((response) => {
        console.log('Datos recibidos:', response.data);  // Verifica los datos recibidos
        setRegistros(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los registros:', error);
      });
  };

  // Manejar la gestión de un registro
  const gestionarRegistro = (registro) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas ver el registro de la institución ${registro.nombre_institucion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        setRegistroSeleccionado(registro);
        // Obtener los detalles del registro
        axios.get(`http://localhost:3001/detalle_registro/${registro.id_registro}`)
          .then((response) => {
            setDetalleProductos(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los detalles del registro:', error);
          });
      }
    });
  };

  // Eliminación del Pedido en caso de Cancelar
  const eliminarRegistro = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar registro',
      cancelButtonText: 'No, mantener registro'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar a la API para eliminar el pedido y sus detalles
        fetch(`http://localhost:3001/cancelar_registro/${registroSeleccionado.id_registro}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
            // Puedes agregar alguna redirección o actualización de la tabla de pedidos aquí
            setRegistroSeleccionado(null);
            setDetalleProductos([]);
            // Recargar la tabla de pedidos
            cargarRegistros();
          })
          .catch((error) => {
            console.error('Error al eliminar el registro:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro', 'error');
          });
      }
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Registros</h1>
      {/* Tabla de registros */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Registro</th>
            <th>Nombre Institución</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Total Final</th>
            <th>Fecha Venta Final</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id_registro}>
              <td>{registro.id_registro}</td>
              <td>{registro.nombre_institucion}</td>
              <td>{registro.direccion_institucion}</td>
              <td>{registro.telefono_institucion}</td>
              <td>Q.{registro.total_final}</td>
              <td>{new Date(registro.fecha_venta_final).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => gestionarRegistro(registro)}>
                  Gestionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sección de detalles del registro */}
      {registroSeleccionado && (
        <div className="card p-4 mb-4">
          <h3 className="text-center">Detalles del Registro</h3>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-text">Nombre Institución:</span>
                  <input
                    type="text"
                    className="form-control"
                    value={registroSeleccionado.nombre_institucion}
                    readOnly />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-text">Dirección Institución:</span>
                  <input
                    type="text"
                    className="form-control"
                    value={registroSeleccionado.direccion_institucion}
                    readOnly />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-text">Teléfono Institución:</span>
                  <input
                    type="text"
                    className="form-control"
                    value={registroSeleccionado.telefono_institucion}
                    readOnly />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-text">Total Final:</span>
                  <input
                    type="text"
                    className="form-control"
                    value={`Q.${registroSeleccionado.total_final}`}
                    readOnly />
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de productos */}
          <h4>Productos Comprados</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Precio Total</th>
              </tr>
            </thead>
            <tbody>
              {detalleProductos.map((detalle) => (
                <tr key={detalle.id_detalle_registro}>
                  <td>{detalle.nombre_producto}</td>
                  <td>{detalle.cantidad}</td>
                  <td>Q.{detalle.precio_unitario}</td>
                  <td>Q.{detalle.precio_total}</td>
                </tr>
              ))}
            </tbody>
          </table>

            {/* Botones de acción */}
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-danger mx-2" onClick={eliminarRegistro}>
                    Eliminar Registro
                </button>
            </div>
        </div>
      )}
    </div>
  );
}

export default TextFormRegistros;