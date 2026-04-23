import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function FormularioPedido() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("PENDENTE");
  const [parecerFinanceiro, setParecerFinanceiro] = useState("EM_ANALISE");

  const enviarFormulario = async (e) => {
    e.preventDefault();

    const clientId = localStorage.getItem("clientId");

    if (!clientId) {
      alert("ID do cliente não encontrado no localStorage.");
      return;
    }

    const payload = {
      status,
      parecerFinanceiro,
      clientId: Number(clientId),
      carId: Number(carId)
    };

    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Erro ao criar pedido");
      }

      alert("Pedido enviado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar pedido.");
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm p-4">
        <h3 className="mb-3">Solicitação de aluguel</h3>

        <form onSubmit={enviarFormulario}>
          <div className="mb-3">
            <label className="form-label">Carro selecionado</label>
            <input type="text" className="form-control" value={carId} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <input
              type="text"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Parecer financeiro</label>
            <input
              type="text"
              className="form-control"
              value={parecerFinanceiro}
              onChange={(e) => setParecerFinanceiro(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Enviar pedido
          </button>
        </form>
      </div>
    </div>
  );
}