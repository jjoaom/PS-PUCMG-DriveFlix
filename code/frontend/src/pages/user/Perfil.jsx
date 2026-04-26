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

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center text-white page-shell">
        Carregando perfil...
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center py-5 text-white perfil-shell">
      <div className="perfil-wrapper">
        <h1 className="text-center mb-4 perfil-title">
          Bem vindo, {cliente.name}
        </h1>

        {erro && <div className="alert alert-danger">{erro}</div>}

        {cliente && (
          <div className="card p-4 perfil-card">
            <div className="mb-3 perfil-text">
              <strong className="text-white">Nome:</strong> {cliente.name}
            </div>

            <div className="mb-3 perfil-text">
              <strong className="text-white">CPF:</strong> {cliente.cpf}
            </div>

            <div className="mb-3 perfil-text">
              <strong className="text-white">RG:</strong> {cliente.rg}
            </div>

            <div className="mb-3 perfil-text">
              <strong className="text-white">Telefone:</strong> {cliente.phone}
            </div>

            <div className="mb-3 perfil-text">
              <strong className="text-white">Endereço:</strong> {cliente.address}
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Renda:</strong>
              </label>

              <input
                type="text"
                className={`form-control perfil-input ${!editandoRenda ? "opacity-75" : ""}`}
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
                className="btn w-100 btn-drive-primary"
                onClick={() => setEditandoRenda(true)}
              >
                Editar renda
              </button>
            ) : (
              <div className="d-flex gap-2">
                <button
                  className="btn w-50 btn-drive-success"
                  onClick={salvarRenda}
                  disabled={salvando}
                >
                  {salvando ? "Salvando..." : "Salvar"}
                </button>

                <button
                  className="btn w-50 btn-drive-secondary"
                  onClick={cancelarEdicao}
                  disabled={salvando}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        )}

        {modalSucesso && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center overlay-modal-strong"
          >
            <div className="card text-center p-4 perfil-success-card">
              <h4 className="mb-3 perfil-success-title">
                Renda atualizada!
              </h4>

              <p className="mb-4 text-secondary">
                Sua renda foi salva com sucesso.
              </p>

              <button
                className="btn btn-drive-success"
                onClick={() => setModalSucesso(false)}
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