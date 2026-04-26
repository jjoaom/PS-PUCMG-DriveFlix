import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CarCard({ carro }) {
  const navigate = useNavigate();

  const [etapa, setEtapa] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const hoje = new Date().toISOString().split("T")[0];

  const numeroDias =
    dataInicio && dataFim
      ? Math.max(0, Math.ceil((new Date(dataFim) - new Date(dataInicio)) / (1000 * 60 * 60 * 24)))
      : 0;

  const valorTotal = numeroDias * (carro.preco || 0);

  const imageSrc = carro.imagemUrl?.startsWith("/uploads")
    ? `http://localhost:8080/api${carro.imagemUrl}`
    : carro.imagemUrl || "/cars/default-car.jpg";

  function fecharTudo() {
    setEtapa(0);
    setErro("");
    setDataInicio("");
    setDataFim("");
  }

  async function enviarPedido() {
    if (!dataInicio || !dataFim) {
      setErro("Preencha as duas datas.");
      return;
    }
    if (new Date(dataFim) <= new Date(dataInicio)) {
      setErro("A data de devolução deve ser após a data de retirada.");
      return;
    }

    const clientId = localStorage.getItem("userId");
    if (!clientId) {
      setErro("Cliente não identificado. Faça login novamente.");
      return;
    }

    setEnviando(true);
    setErro("");

    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: Number(clientId),
          carId: Number(carro.id),
          dataInicio,
          dataFim,
        }),
      });

      if (!response.ok) throw new Error();
      setEtapa(3);
    } catch {
      setErro("Erro ao enviar pedido. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <div
        className="card h-100 drive-card"
        onClick={() => setEtapa(1)}
      >
        <div className="drive-image-wrap">
          <img
            src={imageSrc}
            className="card-img-top drive-card-image"
            alt={`${carro.marca} ${carro.modelo}`}
            onError={(e) => { e.currentTarget.src = "/cars/default-car.jpg"; }}
          />
          <span className="drive-floating-badge">
            {carro.status}
          </span>
        </div>
        <div className="card-body">
          <h5 className="card-title mb-2">{carro.marca} {carro.modelo}</h5>
          <p className="mb-1 text-secondary">Placa: {carro.placa}</p>
          <p className="mb-0 drive-price">
            {Number(carro.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            <span className="drive-price-small"> /dia</span>
          </p>
        </div>
      </div>

      {etapa > 0 && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center overlay-modal"
        >
          <div className="card shadow-lg border-0 modal-drive">
            <div className="card-body p-4">

              {etapa === 1 && (
                <>
                  <h4 className="mb-3 text-center">Solicitar aluguel</h4>
                  <p className="text-center mb-4">
                    Deseja alugar o <strong>{carro.marca} {carro.modelo}</strong>?
                  </p>
                  <div className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-secondary" onClick={fecharTudo}>Cancelar</button>
                    <button className="btn btn-primary" onClick={() => setEtapa(2)}>Continuar</button>
                  </div>
                </>
              )}

              {etapa === 2 && (
                <>
                  <h4 className="mb-3 text-center">Período do aluguel</h4>

                  <div className="mb-3">
                    <label className="form-label">Data de retirada</label>
                    <input
                      type="date"
                      className="form-control"
                      min={hoje}
                      value={dataInicio}
                      onChange={(e) => { setDataInicio(e.target.value); setErro(""); }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Data de devolução</label>
                    <input
                      type="date"
                      className="form-control"
                      min={dataInicio || hoje}
                      value={dataFim}
                      onChange={(e) => { setDataFim(e.target.value); setErro(""); }}
                    />
                  </div>

                  {numeroDias > 0 && (
                    <div className="alert alert-info py-2 mb-3">
                      <strong>{numeroDias} dia{numeroDias > 1 ? "s" : ""}</strong> ×{" "}
                      {Number(carro.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} ={" "}
                      <strong>{valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                    </div>
                  )}

                  {erro && <div className="alert alert-danger py-2 mb-3">{erro}</div>}

                  <div className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-secondary" onClick={() => setEtapa(1)} disabled={enviando}>Voltar</button>
                    <button className="btn btn-success" onClick={enviarPedido} disabled={enviando}>
                      {enviando ? "Enviando..." : "Confirmar pedido"}
                    </button>
                  </div>
                </>
              )}

              {etapa === 3 && (
                <>
                  <h4 className="mb-3 text-success text-center">Pedido enviado!</h4>
                  <p className="text-center mb-1">
                    <strong>{carro.marca} {carro.modelo}</strong>
                  </p>
                  <p className="text-center text-muted mb-4">
                    {numeroDias} dia{numeroDias > 1 ? "s" : ""} •{" "}
                    {valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </p>
                  <div className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-secondary" onClick={fecharTudo}>Fechar</button>
                    <button className="btn btn-primary" onClick={() => navigate("/MeusPedidos")}>
                      Ver meus pedidos
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}