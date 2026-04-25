import { useNavigate } from "react-router-dom";
import Scene from "./Scene";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Scene />

      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #05010d 0%, #12002e 55%, #05010d 100%)",
          color: "#fff",
        }}
      >
        <section className="container py-5 ">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-7">
              <span
                className="badge mb-3 px-3 py-2"
                style={{
                  background: "rgba(120, 0, 255, 0.18)",
                  color: "#b98cff",
                  border: "1px solid rgba(185, 140, 255, 0.35)",
                }}
              >
                Aluguel de carros digital
              </span>

              <h1
                className="fw-bold mb-3"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  lineHeight: "1",
                }}
              >
                Escolha. Alugue.
                <br />
                Dirija com estilo.
              </h1>

              <p
                className="mb-4"
                style={{
                  maxWidth: "620px",
                  color: "#d7c9ff",
                  fontSize: "1.15rem",
                }}
              >
                A DriveFlix conecta você ao carro ideal de forma simples,
                rápida e sem burocracia. Veja modelos disponíveis, envie seu
                pedido e acompanhe tudo pela plataforma.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <button
                  className="btn btn-lg px-4"
                  style={{
                    background: "#7c3cff",
                    color: "#fff",
                    border: "none",
                    boxShadow: "0 0 25px rgba(124, 60, 255, 0.6)",
                  }}
                  onClick={() => navigate("/catalogo")}
                >
                  Ver catálogo
                </button>

                <button
                  className="btn btn-lg px-4"
                  style={{
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.35)",
                    background: "rgba(255,255,255,0.06)",
                  }}
                  onClick={() => navigate("/MeusPedidos")}
                >
                  Meus aluguéis
                </button>
              </div>
            </div>

            <div className="col-lg-5 mt-5 mt-lg-0">
              <div
                className="p-4 rounded-4"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div style={{ fontSize: "5rem" }}>🏎️</div>

                <h3 className="fw-bold mt-3">DriveFlix Experience</h3>

                <p style={{ color: "#d7c9ff" }}>
                  Uma plataforma pensada para clientes e agentes gerenciarem
                  pedidos, veículos e aluguéis com praticidade.
                </p>

                <div className="row g-3 mt-3">
                  <div className="col-6">
                    <div
                      className="p-3 rounded-3"
                      style={{ background: "rgba(0,0,0,0.25)" }}
                    >
                      <h4 className="mb-0">+20</h4>
                      <small style={{ color: "#c9b8ff" }}>carros</small>
                    </div>
                  </div>

                  <div className="col-6">
                    <div
                      className="p-3 rounded-3"
                      style={{ background: "rgba(0,0,0,0.25)" }}
                    >
                      <h4 className="mb-0">100%</h4>
                      <small style={{ color: "#c9b8ff" }}>digital</small>
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
                icon: "⚡",
                title: "Rápido",
                text: "Escolha um carro e faça seu pedido em poucos cliques.",
              },
              {
                icon: "🔒",
                title: "Seguro",
                text: "Dados organizados e pedidos acompanhados pelo sistema.",
              },
              {
                icon: "🎯",
                title: "Prático",
                text: "Clientes e agentes acessam as funções certas para cada perfil.",
              },
            ].map((item) => (
              <div className="col-md-4" key={item.title}>
                <div
                  className="h-100 p-4 rounded-4"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ fontSize: "2.2rem" }}>{item.icon}</div>
                  <h4 className="fw-bold mt-3">{item.title}</h4>
                  <p style={{ color: "#d7c9ff" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}