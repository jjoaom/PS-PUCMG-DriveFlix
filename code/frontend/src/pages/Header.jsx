import { NavLink, useNavigate } from "react-router-dom";
import { IoCarSportSharp } from "react-icons/io5";
import { GiCarKey, GiFullMotorcycleHelmet } from "react-icons/gi";
import { HiOutlineLogin, HiUserAdd } from "react-icons/hi";

export default function Header() {
  const navigate = useNavigate();

  const isLogged = !!localStorage.getItem("userId");
  const accessType = localStorage.getItem("accessType");
  const isAgente = accessType === "AGENTE";

  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("clientId");
    localStorage.removeItem("agentId");
    localStorage.removeItem("accessType");
    navigate("/");
  }

  const navClass = ({ isActive }) =>
    `nav-link header-nav-link px-3 ${isActive ? "text-white active-driveflix" : "text-light"
    }`;

  return (
    <div className="header-shell">
      <ul className="nav align-items-center">
        <li className="nav-item me-3">
          <NavLink to="/" className="nav-link header-nav-link p-0">
            <img
              src="/driveflix-icon.png"
              alt="Logo"
              className="rounded-circle header-logo"
            />
          </NavLink>
        </li>

        {isLogged && isAgente ? (
          <>
            <li className="nav-item">
              <NavLink to="/" className={navClass}>Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/catalogo" className={navClass}>
                <IoCarSportSharp /> Catálogo
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/carros" className={navClass}>
                <IoCarSportSharp /> Carros
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/alugueis" className={navClass}>
                <GiCarKey /> Aluguéis
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/gerenciar-pedidos" className={navClass}>
                <GiCarKey /> Gerenciar Pedidos
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <NavLink to="/catalogo" className={navClass}>
                <IoCarSportSharp /> Catálogo
              </NavLink>
            </li>

            {isLogged && (
              <li className="nav-item">
                <NavLink to="/MeusPedidos" className={navClass}>
                  <GiCarKey /> Pedidos
                </NavLink>
              </li>
            )}
          </>
        )}

        <li className="nav-item ms-auto"></li>

        {!isLogged ? (
          <>
            <li className="nav-item">
              <NavLink to="/login" className={navClass}>
                <HiOutlineLogin /> Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/cadastro" className={navClass}>
                <HiUserAdd /> Cadastro
              </NavLink>
            </li>
          </>
        ) : (
          <>
            {!isAgente && (
              <li className="nav-item">
                <NavLink to="/perfil" className={navClass}>
                  <GiFullMotorcycleHelmet /> Perfil
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="nav-link header-nav-link text-light btn btn-link px-3 text-decoration-none"
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