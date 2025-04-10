import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const InvoiceListLayer = () => {
  return (
    <div id="invoiceListCard" className='card'>
      <div id="invoiceListHeader" className='card-header d-flex flex-wrap align-items-center justify-content-between gap-3'>
        <div className='d-flex flex-wrap align-items-center gap-3'>
          <div id="filterPedidosGroup" className='d-flex align-items-center gap-2'>
            <span id="pedidosLabel">Pedidos</span>
          </div>

          <div id="searchPedidos" className='icon-field'>
            <input
              type='text'
              name='searchField'
              className='form-control form-control-sm w-auto'
              placeholder='Buscar'
              id='searchInput'
            />
            <span id="searchIcon" className='icon'>
              <Icon icon='ion:search-outline' />
            </span>
          </div>
        </div>

        <div id="statusAndAddActions" className='d-flex flex-wrap align-items-center gap-3'>
          <select
            id="selectStatusFilter"
            className='form-select form-select-sm w-auto'
            defaultValue='Select Status'
          >
            <option value='Select Status' disabled>Filtrar</option>
            <option value='Paid'>Completado</option>
            <option value='Pending'>En Reparto</option>
          </select>
          <Link id="addPedidoButton" to='/invoice-add' className='btn btn-sm btn-primary-600'>
            <i className='ri-add-line' /> Crear Pedido
          </Link>
        </div>
      </div>

      <div id="invoiceListBody" className='card-body'>
        <table id="invoiceTable" className='table bordered-table mb-0'>
          <thead>
            <tr>
              <th scope='col'>
                <div id="checkAllGroup" className='form-check style-check d-flex align-items-center'>
                  <input className='form-check-input' type='checkbox' id='checkAll' />
                  <label className='form-check-label' htmlFor='checkAll'>Número</label>
                </div>
              </th>
              <th scope='col'>ID</th>
              <th scope='col'>Proveedor</th>
              <th scope='col'>Fecha</th>
              <th scope='col'>Cantidad</th>
              <th scope='col'>Estatus</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody id="invoiceTableBody">
            {invoices.map((invoice, index) => (
              <tr key={invoice.id} id={`invoiceRow${index + 1}`}>
                <td>
                  <div className='form-check style-check d-flex align-items-center'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={`check${index + 1}`}
                    />
                    <label className='form-check-label' htmlFor={`check${index + 1}`}>
                      {String(index + 1).padStart(2, '0')}
                    </label>
                  </div>
                </td>
                <td><Link to='#' className='text-primary-600'>{invoice.id}</Link></td>
                <td>
                  <h6 className='text-md mb-0 fw-medium flex-grow-1'>{invoice.proveedor}</h6>
                </td>
                <td>{invoice.fecha}</td>
                <td>{invoice.cantidad}</td>
                <td>
                  <span className={`px-24 py-4 rounded-pill fw-medium text-sm ${invoice.estatusClass}`}>{invoice.estatus}</span>
                </td>
                <td>
                  <Link
                    to='/invoice-preview'
                    className='invoiceViewBtn w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center'
                  >
                    <Icon icon='iconamoon:eye-light' />
                  </Link>
                  <Link
                    to='/invoice-edit'
                    className='invoiceEditBtn w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center'
                  >
                    <Icon icon='lucide:edit' />
                  </Link>
                  <Link
                    to='#'
                    className='invoiceDeleteBtn w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center'
                  >
                    <Icon icon='mingcute:delete-2-line' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div id="invoicePagination" className='d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24'>
          <span id="paginationSummary">Mostrando 1 a 10 de 12 pedidos</span>
          <ul className='pagination d-flex flex-wrap align-items-center gap-2 justify-content-center'>
            <li className='page-item'><Link id="paginationPrev" className='page-link bg-base' to='#'><Icon icon='ep:d-arrow-left' className='text-xl' /></Link></li>
            <li className='page-item'><Link id="paginationPage1" className='page-link bg-primary-600 text-white' to='#'>1</Link></li>
            <li className='page-item'><Link id="paginationPage2" className='page-link bg-primary-50 text-secondary-light' to='#'>2</Link></li>
            <li className='page-item'><Link id="paginationPage3" className='page-link bg-primary-50 text-secondary-light' to='#'>3</Link></li>
            <li className='page-item'><Link id="paginationNext" className='page-link bg-base' to='#'><Icon icon='ep:d-arrow-right' className='text-xl' /></Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const invoices = [
  { id: "#526534", proveedor: "GUCCI", fecha: "25 Ene 2024", cantidad: 200, estatus: "Completado", estatusClass: "bg-success-focus text-success-main" },
  { id: "#696589", proveedor: "Bershka", fecha: "25 Ene 2024", cantidad: 200, estatus: "Completado", estatusClass: "bg-success-focus text-success-main" },
  { id: "#256584", proveedor: "Tommy", fecha: "10 Feb 2024", cantidad: 100, estatus: "Completado", estatusClass: "bg-success-focus text-success-main" },
  { id: "#526587", proveedor: "ZARA", fecha: "10 Feb 2024", cantidad: 300, estatus: "Completado", estatusClass: "bg-success-focus text-success-main" },
  { id: "#105986", proveedor: "GUCCI", fecha: "15 Mar 2024", cantidad: 250, estatus: "Pendiente", estatusClass: "bg-warning-focus text-warning-main" },
  { id: "#526589", proveedor: "GUCCI", fecha: "15 Mar 2024", cantidad: 248, estatus: "En Reparto", estatusClass: "bg-success-focus text-success-main" },
  { id: "#526520", proveedor: "ZARA", fecha: "27 Abr 2024", cantidad: 400, estatus: "Completado", estatusClass: "bg-success-focus text-success-main" },
  { id: "#256584", proveedor: "Tommy", fecha: "27 Abr 2024", cantidad: 600, estatus: "Pendiente", estatusClass: "bg-warning-focus text-warning-main" },
  { id: "#200257", proveedor: "Michael Kors", fecha: "30 Abr 2024", cantidad: 200, estatus: "Completado", estatusClass: "bg-success-focus text-success-main" },
  { id: "#526525", proveedor: "Tommy", fecha: "30 Abr 2024", cantidad: 500, estatus: "Completado", estatusClass: "bg-success-focus text-success-main" },
];

export default InvoiceListLayer;
