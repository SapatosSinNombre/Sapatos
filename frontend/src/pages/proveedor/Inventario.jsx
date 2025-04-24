import MasterLayout from "../../components/masterLayout";
import Inventory from "../../components/Inventory";

const Inventario = () => {
  return (
    <>
      <MasterLayout role="proveedor">
      <div id="inventarioProveedor">
        <h1>Inventario</h1>
        <Inventory />
        </div>
      </MasterLayout>
    </>
  );
};

export default Inventario;