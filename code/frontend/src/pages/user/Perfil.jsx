import { useEffect, useState } from "react";

export default function Perfil() {
  const [cliente, setCliente] = useState(null);
  const [renda, setRenda] = useState("");
  const [editandoRenda, setEditandoRenda] = useState(false);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [modalSucesso, setModalSucesso] = useState(false);

  useEffect(() => {
    buscarCliente();
  }, []);

  function formatarMoeda(valor) {
    if (!valor) return "";

    const numero = Number(valor) / 100;

    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function apenasNumeros(valor) {
    return valor.replace(/\D/g, "");
  }

  async function buscarCliente() {
    try {
      setLoading(true);
      setErro("");

      const clientId = localStorage.getItem("clientId");

      if (!clientId) {
        throw new Error("clientId não encontrado no localStorage.");
      }

      const response = await fetch(`http://localhost:8080/api/clients/${clientId}`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar cliente: ${response.status}`);
      }

      const data = await response.json();
      setCliente(data);
      setRenda(data.renda != null ? String(Math.round(data.renda * 100)) : "");
    } catch (err) {
      setErro(err.message || "Erro ao carregar perfil.");
    } finally {
      setLoading(false);
    }
  }

  async function salvarRenda() {
    try {
      setSalvando(true);
      setErro("");

      if (!cliente?.id) {
        throw new Error("Cliente não encontrado.");
      }

      const rendaNumerica = renda === "" ? null : Number(renda) / 100;

      const response = await fetch(`http://localhost:8080/api/clients/${cliente.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...cliente,
          renda: rendaNumerica,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao salvar renda: ${response.status}`);
      }

      const data = await response.json();

      setCliente(data);
      setRenda(data.renda != null ? String(Math.round(data.renda * 100)) : "");
      setEditandoRenda(false);
      setModalSucesso(true);
    } catch (err) {
      setErro(err.message || "Erro ao atualizar renda.");
    } finally {
      setSalvando(false);
    }
  }

  function cancelarEdicao() {
    setRenda(cliente?.renda != null ? String(Math.round(cliente.renda * 100)) : "");
    setEditandoRenda(false);
  }

  if (loading) {
    return <div className="container py-5">Carregando perfil...</div>;
  }

  return (
    <div className="d-flex justify-content-center py-5">
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="cor_roxa">Perfil do Cliente</h1>
        </div>

        {erro && <div className="alert alert-danger">{erro}</div>}

        {cliente && (
          <div className="card p-4 shadow-sm">
            <div className="mb-3">
              <strong>Nome:</strong> {cliente.name}
            </div>

            <div className="mb-3">
              <strong>CPF:</strong> {cliente.cpf}
            </div>

            <div className="mb-3">
              <strong>RG:</strong> {cliente.rg}
            </div>

            <div className="mb-3">
              <strong>Telefone:</strong> {cliente.phone}
            </div>

            <div className="mb-3">
              <strong>Endereço:</strong> {cliente.address}
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Renda:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                value={formatarMoeda(renda)}
                disabled={!editandoRenda}
                onChange={(e) => {
                  const valorLimpo = apenasNumeros(e.target.value);
                  setRenda(valorLimpo);
                }}
              />
            </div>

            {!editandoRenda ? (
              <button
                className="btn btn-primary"
                onClick={() => setEditandoRenda(true)}
              >
                Editar renda
              </button>
            ) : (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={salvarRenda}
                  disabled={salvando}
                >
                  {salvando ? "Salvando..." : "Salvar"}
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={cancelarEdicao}
                  disabled={salvando}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {modalSucesso && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            zIndex: 9999,
          }}
        >
          <div
            className="card shadow-lg border-0 text-center p-4"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "18px",
            }}
          >
            <h4 className="text-success mb-3">Renda atualizada!</h4>
            <p className="mb-4">Sua renda foi salva com sucesso.</p>

            <button
              className="btn btn-primary"
              onClick={() => setModalSucesso(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}