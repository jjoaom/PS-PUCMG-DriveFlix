import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Scene from "../homepage/Scene";
import CarCard from "../catalogo/CarCard";

export default function CarrosAgente() {
  const navigate = useNavigate();

  const [carros, setCarros] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [ordem, setOrdem] = useState("");
  const [busca, setBusca] = useState("");
  const [somenteDisponiveis, setSomenteDisponiveis] = useState(false);

  useEffect(() => {
    const agentId = localStorage.getItem("agentId");

    if (!agentId) {
      setErro("Agente não encontrado. Faça login novamente.");
      setLoading(false);
      return;
    }

    fetch(`/api/cars/agente/${agentId}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setCarros(data);
        } else {
          setCarros([]);
          setErro("A resposta da API não veio em lista.");
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar carros do agente:", err);
        setErro("Não foi possível carregar seus carros.");
        setCarros([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const carrosFiltrados = carros.filter((carro) => {
    const texto = busca.toLowerCase();

    const matchBusca =
      carro.marca.toLowerCase().includes(texto) ||
      carro.modelo.toLowerCase().includes(texto);

    const matchDisponivel =
      !somenteDisponiveis ||
      carro.status.toLowerCase() === "disponivel";

    return matchBusca && matchDisponivel;
  });

  const carrosOrdenados = [...carrosFiltrados].sort((a, b) => {
    if (ordem === "maior") return b.preco - a.preco;
    if (ordem === "menor") return a.preco - b.preco;
    if (ordem === "recentes") return b.id - a.id;
    if (ordem === "antigos") return a.id - b.id;
    return 0;
  });

  return (
    <>
      <div
        className="container-fluid px-4 py-4">
        
        {/* HEADER */}
        <div className="d-flex align-items-center mb-4 flex-wrap">

          {/* ESQUERDA */}
          <h2 className="text-white m-0 me-auto">Meus Carros</h2>

          {/* CENTRO */}
          <div className="mx-auto" style={{ width: "400px" }}>
            <input
              type="text"
              className="form-control text-center"
              placeholder="Buscar por marca ou modelo..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{
                height: "45px",
                backgroundColor: "#111827",
                color: "#fff",
                border: "1px solid #374151",
              }}
            />
          </div>

          {/* DIREITA */}
          <div className="d-flex align-items-center gap-3 ms-auto">

            <button
              className="btn"
              onClick={() => navigate("/cadastro-carro")}
              style={{
                backgroundColor: "#60a5fa",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Cadastrar carro
            </button>

            <div className="form-check m-0">
              <input
                className="form-check-input"
                type="checkbox"
                id="disponiveisCheck"
                checked={somenteDisponiveis}
                onChange={(e) => setSomenteDisponiveis(e.target.checked)}
                style={{
                  backgroundColor: "#111827",
                  borderColor: "#374151",
                }}
              />
              <label
                className="form-check-label text-white"
                htmlFor="disponiveisCheck"
              >
                Apenas disponíveis
              </label>
            </div>

            <select
              className="form-select"
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
              style={{
                width: "160px",
                height: "45px",
                backgroundColor: "#111827",
                color: "#fff",
                border: "1px solid #374151",
              }}
            >
              <option value="">Ordenar</option>
              <option value="recentes">Mais recentes</option>
              <option value="antigos">Mais antigos</option>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
            </select>

          </div>
        </div>

        {/* ESTADOS */}
        {loading && <p className="text-white">Carregando...</p>}
        {erro && <p className="text-danger">{erro}</p>}

        {!loading && !erro && carrosOrdenados.length === 0 && (
          <p className="text-white">
            Você ainda não cadastrou nenhum carro.
          </p>
        )}

        {/* GRID */}
        {!loading && !erro && carrosOrdenados.length > 0 && (
          <div className="row g-4">
            {carrosOrdenados.map((carro) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={carro.id}
              >
                <CarCard carro={carro} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}