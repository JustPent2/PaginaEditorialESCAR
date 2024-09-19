import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function TextFormGesConsignaciones() {
  const [consignaciones, setConsignaciones] = useState([]);
  const [consignacionSeleccionada, setConsignacionSeleccionada] = useState(null);
  const [detalleProductos, setDetalleProductos] = useState([]);

  // Cargar las consignaciones desde la base de datos
  useEffect(() => {
    axios.get('http://localhost:3001/consignaciones')
      .then((response) => {
        setConsignaciones(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las consignaciones:', error);
      });
  }, []);

  // Manejar la gestión de una consignación
  const gestionarConsignacion = (consignacion) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas gestionar la consignación de la institución ${consignacion.nombre_institucion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, gestionar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setConsignacionSeleccionada(consignacion);
        // Obtener los detalles de la consignación
        axios.get(`http://localhost:3001/detalle_consignaciones/${consignacion.id_consignacion}`)
          .then((response) => {
            setDetalleProductos(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los detalles de la consignación:', error);
          });
      }
    });
  };

  // Función para procesar la consignación y moverla a ventas
const procesarConsignacion = (idConsignacion) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas procesar esta consignación como venta?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, procesar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.post(`http://localhost:3001/procesar_consignacion/${idConsignacion}`)
        .then(() => {
          Swal.fire('Procesada', 'La consignación ha sido procesada como venta.', 'success');
          // Actualizar la lista de consignaciones
          setConsignaciones(consignaciones.filter(consignacion => consignacion.id_consignacion !== idConsignacion));
          // Cerrar la sección de detalles
          setConsignacionSeleccionada(null);
        })
        .catch((error) => {
          console.error('Error al procesar la consignación:', error);
          Swal.fire('Error', 'Hubo un error al procesar la consignación.', 'error');
        });
    }
  });
};

// Función para modificar el plazo de consignación
const modificarPlazo = (idConsignacion) => {
  Swal.fire({
    title: 'Modificar Plazo',
    input: 'text',
    inputLabel: 'Ingresa la nueva fecha de plazo (YYYY-MM-DD)',
    showCancelButton: true,
    confirmButtonText: 'Modificar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const nuevoPlazo = result.value;
      axios.put(`http://localhost:3001/modificar_plazo/${idConsignacion}`, { nuevoPlazo })
        .then(() => {
          Swal.fire('Modificado', 'El plazo de consignación ha sido modificado.', 'success');
          // Actualizar la lista de consignaciones con el nuevo plazo
          setConsignaciones(consignaciones.map(consignacion =>
            consignacion.id_consignacion === idConsignacion
              ? { ...consignacion, plazo_consignacion: nuevoPlazo }
              : consignacion
          ));
          // Cerrar la sección de detalles
          setConsignacionSeleccionada(null);
        })
        .catch((error) => {
          console.error('Error al modificar el plazo:', error);
          Swal.fire('Error', 'Hubo un error al modificar el plazo.', 'error');
        });
    }
  });
};

// Función para cancelar la consignación
const cancelarConsignacion = (idConsignacion) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esto eliminará la consignación permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:3001/cancelar_consignacion/${idConsignacion}`)
        .then(() => {
          Swal.fire('Cancelada', 'La consignación ha sido eliminada.', 'success');
          // Eliminar la consignación de la lista
          setConsignaciones(consignaciones.filter(consignacion => consignacion.id_consignacion !== idConsignacion));
          // Cerrar la sección de detalles
          setConsignacionSeleccionada(null);
        })
        .catch((error) => {
          console.error('Error al cancelar la consignación:', error);
          Swal.fire('Error', 'Hubo un error al cancelar la consignación.', 'error');
        });
    }
  });
};


  return (
    <div className="container mt-5">
      {/* Tabla de consignaciones */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Consignación</th>
            <th>Nombre Institución</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Total Final</th>
            <th>Fecha Consignación</th>
            <th>Plazo Consignación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {consignaciones.map((consignacion) => (
            <tr key={consignacion.id_consignacion}>
              <td>{consignacion.id_consignacion}</td>
              <td>{consignacion.nombre_institucion}</td>
              <td>{consignacion.direccion_institucion}</td>
              <td>{consignacion.telefono_institucion}</td>
              <td>Q.{consignacion.total_final}</td>
              <td>{new Date(consignacion.fecha_consignacion).toLocaleString()}</td>
              <td>{new Date(consignacion.plazo_consignacion).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => gestionarConsignacion(consignacion)}>
                  Gestionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sección de detalles de la consignación */}
      {consignacionSeleccionada && (
        <div className="card p-4 mb-4">
            <div className="card p-4 mb-4">
            <h3 className="text-center">Detalles de la Consignación</h3>
            <div className="row justify-content-center">
              {/* Primera columna */}
              <div className="col-md-6">
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text">Nombre Institución:</span>
                    <input
                      type="text"
                      className="form-control"
                      value={consignacionSeleccionada.nombre_institucion}
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
                      value={consignacionSeleccionada.direccion_institucion}
                      readOnly />
                  </div>
                </div>
              </div>

              {/* Segunda columna */}
              <div className="col-md-6">
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text">Teléfono Institución:</span>
                    <input
                      type="text"
                      className="form-control"
                      value={consignacionSeleccionada.telefono_institucion}
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
                      value={`Q.${consignacionSeleccionada.total_final}`}
                      readOnly />
                  </div>
                </div>
              </div>

              {/* Fecha y plazo de consignación */}
              <div className="col-md-6">
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text">Fecha de Consignación:</span>
                    <input
                      type="text"
                      className="form-control"
                      value={new Date(consignacionSeleccionada.fecha_consignacion).toLocaleDateString()}
                      readOnly />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text">Plazo de Consignación:</span>
                    <input
                      type="text"
                      className="form-control"
                      value={new Date(consignacionSeleccionada.plazo_consignacion).toLocaleDateString()}
                      readOnly />
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="d-flex justify-content-center mt-4">
                  <button className="btn btn-success mx-2" onClick={() => procesarConsignacion(consignacionSeleccionada.id_consignacion)}>
                      Procesar Consignación
                  </button>
                  <button className="btn btn-warning mx-2" onClick={() => modificarPlazo(consignacionSeleccionada.id_consignacion)}>
                      Modificar Plazo
                  </button>
                  <button className="btn btn-danger mx-2" onClick={() => cancelarConsignacion(consignacionSeleccionada.id_consignacion)}>
                      Cancelar consignacion
                  </button>
                  </div>
              </div>
          </div>

          {/* Tabla de productos */}
          <h4>Productos en Consignación</h4>
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
                <tr key={detalle.id_detalle_consignacion}>
                  <td>{detalle.nombre_producto}</td>
                  <td>{detalle.cantidad}</td>
                  <td>Q.{detalle.precio_unitario}</td>
                  <td>Q.{detalle.precio_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TextFormGesConsignaciones;