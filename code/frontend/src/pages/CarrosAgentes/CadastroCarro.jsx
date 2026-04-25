import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Scene from "../homepage/Scene";

export default function CadastroCarro() {
  const navigate = useNavigate();

  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [preco, setPreco] = useState("");
  const [imagemFile, setImagemFile] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    const agentId = localStorage.getItem("agentId");

    if (!agentId) {
      setErro("Agente não encontrado. Faça login novamente.");
      return;
    }

    if (!imagemFile) {
      setErro("Selecione uma imagem do carro.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("marca", marca);
      formData.append("modelo", modelo);
      formData.append("placa", placa);
      formData.append("status", "disponivel");
      formData.append("preco", preco);
      formData.append("agentId", agentId);
      formData.append("imagem", imagemFile);

      const response = await fetch("/api/cars", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar carro");
      }

      alert("Carro cadastrado com sucesso!");
      navigate("/carros");
    } catch (err) {
      console.error(err);
      setErro("Erro ao cadastrar carro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Scene />

      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "500px" }}>
          <h3 className="mb-4 text-center">Cadastrar Carro</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Marca</label>
              <input
                type="text"
                className="form-control"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Modelo</label>
              <input
                type="text"
                className="form-control"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Placa</label>
              <input
                type="text"
                className="form-control"
                value={placa}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Preço (R$)</label>
              <input
                type="number"
                className="form-control"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Imagem do carro</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImagemFile(e.target.files[0])}
                required
              />
            </div>

            {imagemFile && (
              <div className="mb-3 text-center">
                <img
                  src={URL.createObjectURL(imagemFile)}
                  alt="Pré-visualização"
                  className="img-fluid rounded"
                  style={{ maxHeight: "180px", objectFit: "cover" }}
                />
              </div>
            )}

            {erro && <p className="text-danger">{erro}</p>}

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}