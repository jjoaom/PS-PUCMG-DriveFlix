import { NavLink, useNavigate } from "react-router-dom";
import { IoCarSportSharp } from "react-icons/io5";
import { GiCarKey, GiFullMotorcycleHelmet } from "react-icons/gi";
import { HiOutlineLogin, HiUserAdd } from "react-icons/hi";

export default function Header() {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem("userId");

  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("clientId");
    navigate("/");
  }

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
          <NavLink to="/MeusPedidos" className="nav-link cor_roxa">
            <GiCarKey /> Pedidos
          </NavLink>
        </li>

        {/* Espaço à direita */}
        <li className="nav-item ms-auto"></li>

        {!isLogged ? (
          <>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link cor_roxa">
                <HiOutlineLogin /> Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/cadastro" className="nav-link cor_roxa">
                <HiUserAdd /> Cadastro
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <NavLink to="/perfil" className="nav-link cor_roxa">
                <GiFullMotorcycleHelmet /> Perfil
              </NavLink>
            </li>

            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="nav-link cor_roxa btn btn-link"
              >
                Sair
              </button>
            </li>
          </>
        )}

      </ul>
    </div>
  );
}