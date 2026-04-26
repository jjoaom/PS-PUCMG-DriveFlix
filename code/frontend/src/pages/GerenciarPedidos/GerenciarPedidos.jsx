import { useEffect, useMemo, useState } from "react";
import Scene from "../homepage/Scene";

export default function GerenciarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState("recentes");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const agentId = localStorage.getItem("agentId");

    if (!agentId) {
      setErro("agentId não encontrado.");
      setLoading(false);
      return;
    }

    fetch(`/api/pedidos/agente/${agentId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Erro ao buscar pedidos.");
        return res.json();
      })
      .then((data) => {
        setPedidos(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setErro("Erro ao carregar pedidos.");
      })
      .finally(() => setLoading(false));
  }, []);

  function montarImagemUrl(imagemUrl) {
    if (!imagemUrl) return "/cars/default-car.jpg";

    if (imagemUrl.startsWith("/uploads")) {
      return `http://localhost:8080/api${imagemUrl}`;
    }

    return imagemUrl;
  }

  function formatarData(data) {
    if (!data) return "Data não informada";

    return new Date(data).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  const pedidosFiltrados = useMemo(() => {
    let lista = [...pedidos];

    if (busca.trim()) {
      const termo = busca.toLowerCase();

      lista = lista.filter((p) =>
        String(p.id).includes(termo) ||
        p.marca?.toLowerCase().includes(termo) ||
        p.modelo?.toLowerCase().includes(termo) ||
        p.placa?.toLowerCase().includes(termo) ||
        p.nomeCliente?.toLowerCase().includes(termo) ||
        p.status?.toLowerCase().includes(termo)
      );
    }

    lista.sort((a, b) => {
      const d1 = new Date(a.dataCriacao);
      const d2 = new Date(b.dataCriacao);
      return ordem === "recentes" ? d2 - d1 : d1 - d2;
    });

    return lista;
  }, [pedidos, busca, ordem]);

  return (
    <>
      <div
        className="container-fluid px-4 py-4"
        style={{
          backgroundColor: "#0b0f1a",
          minHeight: "100vh",
        }}
      >
        
        <div className="container-fluid">
          <div className="d-flex align-items-center mb-4 flex-wrap">

            {/* ESQUERDA */}
            <h2 className="text-white m-0 me-auto">Pedidos de Aluguel</h2>

            {/* CENTRO */}
            <div className="mx-auto" style={{ width: "400px" }}>
              <input
                type="text"
                placeholder="Buscar por cliente, carro..."
                className="form-control text-center"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={{
                  height: "45px",
                  backgroundColor: "#111827",
                  color: "#fff",
                  border: "1px solid #374151"
                }}
              />
            </div>

            {/* DIREITA */}
            <select
              className="form-select ms-auto"
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
              style={{
                width: "150px",
                height: "45px",
                backgroundColor: "#111827",
                color: "#fff",
                border: "1px solid #374151"
              }}
            >
              <option value="recentes">Recentes</option>
              <option value="antigos">Antigos</option>
            </select>

          </div>

          {loading && <p className="text-white">Carregando...</p>}
          {erro && <p className="text-danger">{erro}</p>}

          {!loading && !erro && pedidosFiltrados.length === 0 && (
            <p className="text-white mt-4">Nenhum pedido encontrado.</p>
          )}

          {!loading && !erro && pedidosFiltrados.length > 0 && (
            <div className="row g-4">
              {pedidosFiltrados.map((pedido) => {
                const imageSrc = montarImagemUrl(pedido.imagemUrl);

                return (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                    key={pedido.id}
                  >
                    <div
                      className="card h-100"
                      style={{
                        backgroundColor: "#111827",
                        color: "#fff",
                        border: "1px solid #1f2937",
                        borderRadius: "12px",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ position: "relative" }}>
                        <img
                          src={imageSrc}
                          className="card-img-top"
                          alt={`${pedido.marca || ""} ${pedido.modelo || ""}`}
                          style={{
                            height: "180px",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.currentTarget.src = "/cars/default-car.jpg";
                          }}
                        />

                        <span
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            backgroundColor: "#60a5fa",
                            color: "#000",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          {pedido.status || "sem status"}
                        </span>
                      </div>

                      <div className="card-body">
                        <h5 className="card-title mb-2">
                          {pedido.marca} {pedido.modelo}
                        </h5>

                        <p className="mb-1 text-secondary">
                          Cliente: {pedido.nomeCliente || "Não informado"}
                        </p>

                        <p className="mb-1 text-secondary">
                          Placa: {pedido.placa || "Não informada"}
                        </p>

                        <p className="mb-1 text-secondary">
                          Data: {formatarData(pedido.dataCriacao)}
                        </p>

                        <p
                          className="mb-0"
                          style={{
                            color: "#60a5fa",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          Status: {pedido.status || "Pendente"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}