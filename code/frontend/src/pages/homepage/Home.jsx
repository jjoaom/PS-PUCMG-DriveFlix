import { useNavigate } from "react-router-dom";
import { FaBoltLightning, FaBullseye, FaCarSide, FaShieldHalved } from "react-icons/fa6";

export default function Home() {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem("userId");
  const accessType = localStorage.getItem("accessType");
  const handleClick = () => {
    navigate(isLogged ? "/MeusPedidos" : "/Login");
  };

  return (
    <>
      <div className="text-white">

        

        <main>
          <section className="container py-5 ">
            <div className="row align-items-center min-vh-75">
              <div className="col-lg-7">
                <span className="badge mb-3 px-3 py-2 hero-badge">
                  Aluguel de carros digital
                </span>

                <h1 className="fw-bold mb-3 hero-title">
                  Escolha. Alugue.
                  <br />
                  Dirija com estilo.
                </h1>

                <p className="mb-4 hero-subtitle">
                  A DriveFlix conecta você ao carro ideal de forma simples,
                  rápida e sem burocracia. Veja modelos disponíveis, envie seu
                  pedido e acompanhe tudo pela plataforma.
                </p>

                <div className="d-flex gap-3 flex-wrap">
                  <button
                    className="btn btn-lg px-4 hero-button-primary"
                    onClick={() => navigate("/catalogo")}
                  >
                    Ver catálogo
                  </button>

                  <button
                    className="btn btn-lg px-4 hero-button-secondary"
                    onClick={handleClick}
                  >
                    Meus aluguéis
                  </button>
                </div>
              </div>

              <div className="col-lg-5 mt-5 mt-lg-0">
                <div className="p-4 rounded-4 hero-glass-card">
                  <div className="display-1">
                    <FaCarSide />
                  </div>

                  <h3 className="fw-bold mt-3">DriveFlix Experience</h3>

                  <p className="hero-copy">
                    Uma plataforma pensada para clientes e agentes gerenciarem
                    pedidos, veículos e aluguéis com praticidade.
                  </p>

                  <div className="row g-3 mt-3">
                    <div className="col-6">
                      <div className="p-3 rounded-3 hero-stat-tile">
                        <h4 className="mb-0">+20</h4>
                        <small className="hero-stat-label">carros</small>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-3 rounded-3 hero-stat-tile">
                        <h4 className="mb-0">100%</h4>
                        <small className="hero-stat-label">digital</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container pb-5">
            <div className="row g-4">
              {[
                {
                  icon: <FaBoltLightning />,
                  title: "Rápido",
                  text: "Escolha um carro e faça seu pedido em poucos cliques.",
                },
                {
                  icon: <FaShieldHalved />,
                  title: "Seguro",
                  text: "Dados organizados e pedidos acompanhados pelo sistema.",
                },
                {
                  icon: <FaBullseye />,
                  title: "Prático",
                  text: "Clientes e agentes acessam as funções certas para cada perfil.",
                },
              ].map((item) => (
                <div className="col-md-4" key={item.title}>
                  <div className="h-100 p-4 rounded-4 hero-feature-card">
                    <div className="fs-1">{item.icon}</div>
                    <h4 className="fw-bold mt-3">{item.title}</h4>
                    <p className="hero-copy">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}