import { NavLink } from "react-router-dom";
import { RiHome5Line } from "react-icons/ri";
import { IoCarSportSharp } from "react-icons/io5";
import { GiCarKey } from "react-icons/gi";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { RiLoginBoxLine } from "react-icons/ri";
import { GoSignIn } from "react-icons/go";

export default function Header() {
  return (
    <div className="m-2">
      <ul className="nav nav-tabs">

        <li className="nav-item">
          <NavLink to="/" className="nav-link cor_roxa">
            <RiHome5Line />
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
            <RiLoginBoxLine /> Login
          </NavLink>
        </li>

        <li className="nav-item ms-auto">
          <NavLink to="/cadastro" className="nav-link cor_roxa">
            <GoSignIn /> Cadastro
          </NavLink>
        </li>

        <li className="nav-item ms-auto">
          <NavLink to="/perfil" className="nav-link cor_roxa">
            <GiFullMotorcycleHelmet /> Perfil
          </NavLink>
        </li>

      </ul>
      
    </div>
  );
}