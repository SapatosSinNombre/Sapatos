import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const InvoiceListLayer = () => {
  const [pedidos, setPedidos] = useState(pedidosBase);
  const [searchTerm, setSearchTerm] = useState("");

  const cambiarEstatus = (index, nuevoEstatus) => {
    const nuevosPedidos = [...pedidos];
    nuevosPedidos[index].estatus = nuevoEstatus;
    setPedidos(nuevosPedidos);
  };

  const estiloEstatus = (estatus) => {
    if (estatus === "Completado" || estatus === "En Reparto") {
      return "bg-success-focus text-success-main";
    } else if (estatus === "Pendiente") {
      return "bg-warning-focus text-warning-main";
    }
    return "";
  };

  return (
    <div className="card">
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <span>Pedidos</span>
          </div>
          <div className="icon-field">
            <input
              type="text"
              className="form-control form-control-sm w-auto"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="icon">
              <Icon icon="ion:search-outline" />
            </span>
          </div>
          <div>
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="Completado">Completado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Reparto">En Reparto</option>
            </select>
          </div>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <Link to="/crearpedido" className="btn btn-sm btn-primary-600">
            <i className="ri-add-line" /> Crear Pedido
          </Link>
        </div>
      </div>

      <div className="card-body">
        <table className="table bordered-table mb-0">
          <thead>
            <tr>
              <th>Número</th>
              <th>ID</th>
              <th>Proveedor</th>
              <th>Fecha</th>
              <th>Cantidad</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos
              .filter(
                (p) =>
                  p.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  p.id.includes(searchTerm)
              )
              .map((pedido, idx) => (
                <tr key={idx}>
                  <td>{String(idx + 1).padStart(2, "0")}</td>
                  <td>
                    <Link to="#" className="text-primary-600">
                      {pedido.id}
                    </Link>
                  </td>
                  <td>
                    <h6 className="text-md mb-0 fw-medium">{pedido.proveedor}</h6>
                  </td>
                  <td>{pedido.fecha}</td>
                  <td>{pedido.cantidad}</td>
                  <td className="position-relative" style={{ minWidth: 120 }}>
                    <span
                      className={`d-block px-12 py-2 rounded-pill fw-medium text-sm ${estiloEstatus(
                        pedido.estatus
                      )}`}
                    >
                      {pedido.estatus}
                    </span>
                    <select
                      value={pedido.estatus}
                      onChange={(e) => cambiarEstatus(idx, e.target.value)}
                      className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                      style={{ cursor: "pointer" }}
                    >
                      <option value="Completado">Completado</option>
                      <option value="En Reparto">En Reparto</option>
                      <option value="Pendiente">Pendiente</option>
                    </select>
                  </td>
                  <td>
                    <Link
                      to="/invoice-preview"
                      className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                    >
                      <Icon icon="iconamoon:eye-light" />
                    </Link>
                    <Link
                      to="#"
                      className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                    >
                      <Icon icon="mingcute:delete-2-line" />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceListLayer;