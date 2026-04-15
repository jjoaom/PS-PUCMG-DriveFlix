import { useEffect, useState } from "react";
import Scene from "./Scene";
import CarCard from "../../components/CarCard";

export default function Home() {
  const [carros, setCarros] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Scene />

      <div className="container-fluid px-4 py-4">
        <h2 className="text-white mb-4">Carros</h2>

        {loading && <p className="text-white">Carregando...</p>}
        {erro && <p className="text-danger">{erro}</p>}

        <div className="row g-4">
          {carros.map((carro) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={carro.id}>
              <CarCard carro={carro} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}