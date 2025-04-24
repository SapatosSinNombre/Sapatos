import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const SidebarButton = ({ to, icon, label }) => {
  return (
    <li>
    <NavLink
     id={`sidebarButton-${label.toLowerCase()}`} // ID dinámico para pruebas
      to={to}
      className={({ isActive }) =>
      `sidebar-link d-flex align-items-center ${isActive ? "active" : ""}`
      }
    >
      <span className="icon me-2">
        <Icon icon={icon} />
      </span>
      <span>{label}</span>
    </NavLink>
  </li>
  );
};

export default SidebarButton;
