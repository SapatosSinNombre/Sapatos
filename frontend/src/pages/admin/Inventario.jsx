import MasterLayout from "../../components/masterLayout";
import Inventory from "../../components/Inventory";

const Inventario = () => {
  return (
    <>
      <MasterLayout role="admin">
        <div id="inventarioAdmin">
        <h1>Inventario</h1>
        </div>
        <Inventory />
      </MasterLayout>
    </>
  );
};

export default Inventario;