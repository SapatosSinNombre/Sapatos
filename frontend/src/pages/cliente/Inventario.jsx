import MasterLayout from "../../components/masterLayout";
import Inventory from "../../components/Inventory";

const Inventario = () => {
  return (
    <>
      <MasterLayout role="cliente">
        <div id="clienteInventario">
        <h1>Inventario</h1>
        </div>
        <Inventory />
      </MasterLayout>
    </>
  );
};

export default Inventario;