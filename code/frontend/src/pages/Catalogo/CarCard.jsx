import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CarCard({ carro }) {
  console.log(carro);
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  function abrirModal() {
    setEtapa(1);
    setMensagem("");
    setModalAberto(true);
  }

  function fecharModal() {
    if (loading) return;
    setModalAberto(false);
    setEtapa(1);
    setMensagem("");
  }

  async function criarPedido() {
    const clientId = localStorage.getItem("clientId");

    if (!clientId) {
      setMensagem("Cliente não identificado. Faça login novamente.");
      return;
    }

    const payload = {
      status: "PENDENTE",
      parecerFinanceiro: "EM_ANALISE",
      clientId: Number(clientId),
      carId: Number(carro.id)
    };

    try {
      setLoading(true);
      setMensagem("");

      const response = await fetch("http://localhost:8080/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Erro ao criar pedido.");
      }

      setEtapa(3);
      setMensagem("Pedido criado com sucesso!");
    } catch (err) {
      console.error(err);
      setMensagem("Não foi possível criar o pedido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className="card h-100 shadow-sm"
        onClick={abrirModal}
        style={{ cursor: "pointer" }}
      >
        <img
          src={carro.imagemUrl}
          className="card-img-top"
          alt={`${carro.marca} ${carro.modelo}`}
          style={{ height: "180px", objectFit: "cover" }}
        />

        <div className="card-body">
          <h5 className="card-title">
            {carro.marca} {carro.modelo}
          </h5>

          <p className="card-text mb-1">
            <strong>Placa:</strong> {carro.placa}
          </p>

          <p className="card-text mb-1">
            <strong>Status:</strong> {carro.status}
          </p>

          <p className="card-text mb-0">
            <strong>Preço:</strong>{" "}
            {Number(carro.preco).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </p>
        </div>
      </div>

      {modalAberto && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: "rgba(0, 0, 0, 0.65)",
            zIndex: 9999
          }}
        >
          <div
            className="card shadow-lg border-0"
            style={{
              width: "100%",
              maxWidth: "430px",
              borderRadius: "18px"
            }}
          >
            <div className="card-body p-4 text-center">
              {etapa === 1 && (
                <>
                  <h4 className="mb-3">Solicitar aluguel</h4>
                  <p className="mb-4">
                    Deseja solicitar o aluguel do carro{" "}
                    <strong>
                      {carro.marca} {carro.modelo}
                    </strong>
                    ?
                  </p>

                  <div className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-secondary" onClick={fecharModal}>
                      Cancelar
                    </button>

                    <button
                      className="btn btn-primary"
                      onClick={() => setEtapa(2)}
                    >
                      Continuar
                    </button>
                  </div>
                </>
              )}

              {etapa === 2 && (
                <>
                  <h4 className="mb-3">Confirmar pedido</h4>
                  <p className="mb-2">
                    Essa ação irá gerar uma solicitação de aluguel.
                  </p>
                  <p className="mb-4">
                    Confirma o envio do pedido?
                  </p>

                  {mensagem && (
                    <div className="alert alert-danger py-2">{mensagem}</div>
                  )}

                  <div className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEtapa(1)}
                      disabled={loading}
                    >
                      Voltar
                    </button>

                    <button
                      className="btn btn-success"
                      onClick={criarPedido}
                      disabled={loading}
                    >
                      {loading ? "Enviando..." : "Confirmar"}
                    </button>
                  </div>
                </>
              )}

              {etapa === 3 && (
                <>
                  <h4 className="mb-3 text-success">Pedido enviado!</h4>
                  <p className="mb-4">{mensagem}</p>

                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/MeusPedidos")}
                  >
                    Ver meus pedidos
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}