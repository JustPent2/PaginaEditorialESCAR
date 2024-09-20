import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function TextFormGesVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [detalleProductos, setDetalleProductos] = useState([]);

  // Cargar las ventas desde la base de datos
  useEffect(() => {
    axios.get('http://localhost:3001/ventas')
      .then((response) => {
        setVentas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las ventas:', error);
      });
  }, []);

  // Manejar la gestión de una venta
  const gestionarVenta = (venta) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas gestionar la venta de la institución ${venta.nombre_institucion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, gestionar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setVentaSeleccionada(venta);
        // Obtener los detalles de la venta
        axios.get(`http://localhost:3001/detalle_ventas/${venta.id_venta}`)
          .then((response) => {
            setDetalleProductos(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los detalles de la venta:', error);
          });
      }
    });
  };

  // Función para procesar la venta y moverla a registros
  const procesarVenta = (idVenta) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas procesar esta venta y convertirla en un registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, procesar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`http://localhost:3001/procesar_venta/${idVenta}`)
          .then(() => {
            Swal.fire('Procesada', 'La venta ha sido procesada como registro.', 'success');
            // Actualizar la lista de ventas
            setVentas(ventas.filter(venta => venta.id_venta !== idVenta));
            // Cerrar la sección de detalles
            setVentaSeleccionada(null);
          })
          .catch((error) => {
            console.error('Error al procesar la venta:', error);
            Swal.fire('Error', 'Hubo un error al procesar la venta.', 'error');
          });
      }
    });
  };

  // Función para cancelar la venta
  const cancelarVenta = (idVenta) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará la venta permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/cancelar_venta/${idVenta}`)
          .then(() => {
            Swal.fire('Cancelada', 'La venta ha sido eliminada.', 'success');
            // Eliminar la venta de la lista
            setVentas(ventas.filter(venta => venta.id_venta !== idVenta));
            // Cerrar la sección de detalles
            setVentaSeleccionada(null);
          })
          .catch((error) => {
            console.error('Error al cancelar la venta:', error);
            Swal.fire('Error', 'Hubo un error al cancelar la venta.', 'error');
          });
      }
    });
  };

  return (
    <div className="container mt-5">
      {/* Tabla de ventas */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Nombre Institución</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Total Final</th>
            <th>Fecha Venta</th>
            <th>Plazo Asignado</th>
            <th>ESTADO</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => {
            const plazoFecha = new Date(venta.plazo_consignacion); // Fecha de plazo de consignación
            const hoy = new Date(); // Fecha actual
            const diferenciaDias = Math.ceil((plazoFecha - hoy) / (1000 * 60 * 60 * 24)); // Diferencia en días
            
            let estado = 'DISPONIBLE';
            let estadoColor = 'text-success'; // Verde por defecto
            
            if (diferenciaDias > 5) {
              estado = 'EN ESPERA...';
              estadoColor = 'text-danger'; // Rojo
            } else if (diferenciaDias <= 5 && diferenciaDias > 0) {
              estado = 'PRÓXIMO';
              estadoColor = 'text-warning'; // Amarillo
            }

            return (
              <tr key={venta.id_venta}>
                <td>{venta.id_venta}</td>
                <td>{venta.nombre_institucion}</td>
                <td>{venta.direccion_institucion}</td>
                <td>{venta.telefono_institucion}</td>
                <td>Q.{venta.total_final}</td>
                <td>{new Date(venta.fecha_venta).toLocaleString()}</td>
                <td>{new Date(venta.plazo_consignacion).toLocaleDateString()}</td>
                <td>
                  <span className={estadoColor}>{estado}</span>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => gestionarVenta(venta)}
                  >
                    Gestionar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Sección de detalles de la venta */}
      {ventaSeleccionada && (
        <div className="card p-4 mb-4">
          <h3 className="text-center">Detalles de la Venta</h3>
          <div className="row justify-content-center">
            {/* Primera columna */}
            <div className="col-md-6">
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-text">Nombre Institución:</span>
                  <input
                    type="text"
                    className="form-control"
                    value={ventaSeleccionada.nombre_institucion}
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
                    value={ventaSeleccionada.direccion_institucion}
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
                    value={ventaSeleccionada.telefono_institucion}
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
                    value={`Q.${ventaSeleccionada.total_final}`}
                    readOnly />
                </div>
              </div>
            </div>

            {/* Fecha y plazo de venta */}
            <div className="col-md-6">
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-text">Fecha de Venta:</span>
                  <input
                    type="text"
                    className="form-control"
                    value={new Date(ventaSeleccionada.fecha_venta).toLocaleDateString()}
                    readOnly />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-text">Plazo Asignado:</span>
                  <input
                    type="text"
                    className="form-control"
                    value={new Date(ventaSeleccionada.plazo_consignacion).toLocaleDateString()}
                    readOnly />
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="col-12 text-center mt-3">
              <button
                className="btn btn-success mx-2"
                onClick={() => procesarVenta(ventaSeleccionada.id_venta)}>
                Procesar Venta
              </button>
              <button
                className="btn btn-danger mx-2"
                onClick={() => cancelarVenta(ventaSeleccionada.id_venta)}>
                Cancelar Venta
              </button>
            </div>
          </div>

          {/* Tabla de productos */}
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>Nombre Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Precio Total</th>
              </tr>
            </thead>
            <tbody>
              {detalleProductos.map((producto) => (
                <tr key={producto.id_detalle_registro}>
                  <td>{producto.nombre_producto}</td>
                  <td>{producto.cantidad}</td>
                  <td>Q.{producto.precio_unitario}</td>
                  <td>Q.{producto.precio_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TextFormGesVentas;