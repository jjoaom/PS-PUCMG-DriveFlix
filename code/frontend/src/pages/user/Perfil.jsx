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

      const response = await fetch(`/api/clients/${clientId}`);

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

      const response = await fetch(`/api/clients/${cliente.id}`, {
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

  const inputStyle = {
    backgroundColor: "#111827",
    color: "#fff",
    border: "1px solid #374151",
    boxShadow: "none",
  };

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#0b0f1a",
          color: "#fff",
        }}
      >
        Carregando perfil...
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-center py-5"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0f1a",
        color: "#fff",
        paddingInline: "16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <h1
          className="text-center mb-4"
          style={{
            color: "#a855f7",
            textShadow: "0 0 14px rgba(168, 85, 247, 0.65)",
          }}
        >
          Perfil do Cliente
        </h1>

        {erro && <div className="alert alert-danger">{erro}</div>}

        {cliente && (
          <div
            className="card p-4"
            style={{
              backgroundColor: "#111827",
              color: "#fff",
              border: "1px solid #7c3aed",
              borderRadius: "18px",
              boxShadow:
                "0 0 18px rgba(124, 58, 237, 0.75), 0 0 38px rgba(96, 165, 250, 0.25)",
            }}
          >
            <div className="mb-3" style={{ color: "#d1d5db" }}>
              <strong className="text-white">Nome:</strong> {cliente.name}
            </div>

            <div className="mb-3" style={{ color: "#d1d5db" }}>
              <strong className="text-white">CPF:</strong> {cliente.cpf}
            </div>

            <div className="mb-3" style={{ color: "#d1d5db" }}>
              <strong className="text-white">RG:</strong> {cliente.rg}
            </div>

            <div className="mb-3" style={{ color: "#d1d5db" }}>
              <strong className="text-white">Telefone:</strong> {cliente.phone}
            </div>

            <div className="mb-3" style={{ color: "#d1d5db" }}>
              <strong className="text-white">Endereço:</strong> {cliente.address}
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
                style={{
                  ...inputStyle,
                  opacity: editandoRenda ? 1 : 0.75,
                }}
              />
            </div>

            {!editandoRenda ? (
              <button
                className="btn w-100"
                onClick={() => setEditandoRenda(true)}
                style={{
                  backgroundColor: "#7c3aed",
                  color: "#fff",
                  fontWeight: "bold",
                  boxShadow: "0 0 12px rgba(124, 58, 237, 0.8)",
                }}
              >
                Editar renda
              </button>
            ) : (
              <div className="d-flex gap-2">
                <button
                  className="btn w-50"
                  onClick={salvarRenda}
                  disabled={salvando}
                  style={{
                    backgroundColor: "#22c55e",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {salvando ? "Salvando..." : "Salvar"}
                </button>

                <button
                  className="btn w-50"
                  onClick={cancelarEdicao}
                  disabled={salvando}
                  style={{
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    border: "1px solid #374151",
                  }}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        )}

        {modalSucesso && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              background: "rgba(0, 0, 0, 0.75)",
              zIndex: 9999,
            }}
          >
            <div
              className="card text-center p-4"
              style={{
                width: "100%",
                maxWidth: "380px",
                backgroundColor: "#111827",
                color: "#fff",
                border: "1px solid #22c55e",
                borderRadius: "18px",
                boxShadow:
                  "0 0 18px rgba(34, 197, 94, 0.75), 0 0 38px rgba(34, 197, 94, 0.25)",
              }}
            >
              <h4 className="mb-3" style={{ color: "#22c55e" }}>
                Renda atualizada!
              </h4>

              <p className="mb-4 text-secondary">
                Sua renda foi salva com sucesso.
              </p>

              <button
                className="btn"
                onClick={() => setModalSucesso(false)}
                style={{
                  backgroundColor: "#22c55e",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}