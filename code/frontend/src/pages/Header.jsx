import { NavLink } from "react-router-dom";
import { IoCarSportSharp } from "react-icons/io5";
import { GiCarKey } from "react-icons/gi";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { HiOutlineLogin } from "react-icons/hi";
import { HiUserAdd } from "react-icons/hi";

export default function Header() {
  return (
    <div className="m-2">
      <ul className="nav nav-tabs align-items-center">

        <li className="nav-item me-2">
          <NavLink to="/" className="nav-link p-0">
            <img
              src="/driveflix-icon.png"
              alt="Logo"
              className="rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/catalogo" className="nav-link cor_roxa">
            <IoCarSportSharp /> Catálogo
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/pedidos" className="nav-link cor_roxa">
            <GiCarKey /> Pedidos
          </NavLink>
        </li>

        <li className="nav-item ms-auto">
          <NavLink to="/login" className="nav-link cor_roxa">
            <HiOutlineLogin /> Login
          </NavLink>
        </li>

        <li className="nav-item ">
          <NavLink to="/cadastro" className="nav-link cor_roxa">
            <HiUserAdd /> Cadastro
          </NavLink>
        </li>

        <li className="nav-item ">
          <NavLink to="/perfil" className="nav-link cor_roxa">
            <GiFullMotorcycleHelmet /> Perfil
          </NavLink>
        </li>

      </ul>

    </div>
  );
}