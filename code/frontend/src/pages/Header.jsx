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

        {isLogged && isAgente ? (
          <>
            <li className="nav-item">
              <NavLink to="/" className="nav-link cor_roxa">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/catalogo" className="nav-link cor_roxa">
                <IoCarSportSharp /> Catálogo
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/carros" className="nav-link cor_roxa">
                <IoCarSportSharp /> Carros
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/alugueis" className="nav-link cor_roxa">
                <GiCarKey /> Aluguéis
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/gerenciar-pedidos" className="nav-link cor_roxa">
                <GiCarKey /> Gerenciar Pedidos
              </NavLink>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}

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
            {!isAgente && (
              <li className="nav-item">
                <NavLink to="/perfil" className="nav-link cor_roxa">
                  <GiFullMotorcycleHelmet /> Perfil
                </NavLink>
              </li>
            )}

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