import { useState } from "react";

export default function CarCard({ carro }) {
  const [mostrarConfirmacao1, setMostrarConfirmacao1] = useState(false);
  const [mostrarConfirmacao2, setMostrarConfirmacao2] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const abrirPrimeiraConfirmacao = () => {
    setMostrarConfirmacao1(true);
  };

  const fecharTudo = () => {
    setMostrarConfirmacao1(false);
    setMostrarConfirmacao2(false);
  };

  const confirmarPrimeiraEtapa = () => {
    setMostrarConfirmacao1(false);
    setMostrarConfirmacao2(true);
  };

  const enviarPedido = async () => {
    const clientId = localStorage.getItem("userId");

    if (!clientId) {
      alert("Cliente não encontrado no localStorage.");
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientId: Number(clientId),
          carId: Number(carro.id)
        })
      });

      if (!response.ok) {
        throw new Error("Erro ao criar pedido");
      }

      alert("Pedido enviado com sucesso!");
      fecharTudo();
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar pedido.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <div
        className="card h-100 shadow-sm"
        onClick={abrirPrimeiraConfirmacao}
        style={{ cursor: "pointer" }}
      >
        <img
          src={carro.imagemUrl}
          alt={carro.modelo}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body">
          <h5 className="card-title">
            {carro.marca} {carro.modelo}
          </h5>

          <p className="mb-1">
            <strong>Placa:</strong> {carro.placa}
          </p>

          <p className="mb-0">
            <strong>Status:</strong> {carro.status}
          </p>
        </div>
      </div>

      {mostrarConfirmacao1 && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar aluguel</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={fecharTudo}
                ></button>
              </div>

              <div className="modal-body">
                <p>
                  Deseja alugar o carro <strong>{carro.marca} {carro.modelo}</strong>?
                </p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={fecharTudo}>
                  Não
                </button>
                <button className="btn btn-primary" onClick={confirmarPrimeiraEtapa}>
                  Sim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mostrarConfirmacao2 && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmação final</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={fecharTudo}
                ></button>
              </div>

              <div className="modal-body">
                <p>Tem certeza que deseja enviar o pedido de aluguel?</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={fecharTudo}>
                  Cancelar
                </button>
                <button
                  className="btn btn-success"
                  onClick={enviarPedido}
                  disabled={enviando}
                >
                  {enviando ? "Enviando..." : "Confirmar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}