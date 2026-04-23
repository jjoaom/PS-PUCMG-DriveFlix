import { useState, useEffect } from "react";
import Scene from "../homepage/Scene";
import CarCard from "./CarCard";

export default function Catalogo() {
  const [carros, setCarros] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [ordem, setOrdem] = useState("");
  const [busca, setBusca] = useState("");
  const [somenteDisponiveis, setSomenteDisponiveis] = useState(false);

  useEffect(() => {
    fetch("/api/cars")
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
        console.error("Erro ao buscar carros:", err);
        setErro("Não foi possível carregar os carros.");
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
      !somenteDisponiveis || carro.status.toLowerCase() === "disponivel";

    return matchBusca && matchDisponivel;
  });

  const carrosOrdenados = [...carrosFiltrados].sort((a, b) => {
    if (ordem === "maior") return b.preco - a.preco;
    if (ordem === "menor") return a.preco - b.preco;
    return 0;
  });

  return (
    <>
      <Scene />

      <div className="container-fluid px-4 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
          <h2 className="text-white">Carros</h2>
          <div className="form-check text-black">
            <input
              className="form-check-input"
              type="checkbox"
              id="disponiveisCheck"
              checked={somenteDisponiveis}
              onChange={(e) => setSomenteDisponiveis(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="disponiveisCheck">
              Apenas disponíveis
            </label>
          </div>
          
          <input
            type="text"
            className="form-control w-50"
            placeholder="Buscar por marca ou modelo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select
            className="form-select w-auto"
            value={ordem}
            onChange={(e) => setOrdem(e.target.value)}
          >
            <option value="">Ordenar</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </div>

        {loading && <p className="text-white">Carregando...</p>}
        {erro && <p className="text-danger">{erro}</p>}

        {!loading && !erro && (
          <div className="row g-4">
            {carrosOrdenados.map((carro) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={carro.placa}
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