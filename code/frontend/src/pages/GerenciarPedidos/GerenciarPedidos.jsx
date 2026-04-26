import { useEffect, useMemo, useState } from "react";

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
      <div className="container-fluid page-shell page-shell-padding">
        
        <div className="container-fluid">
          <div className="d-flex align-items-center mb-4 flex-wrap">

            {/* ESQUERDA */}
            <h2 className="text-white m-0 me-auto">Pedidos de Aluguel</h2>

            {/* CENTRO */}
            <div className="mx-auto toolbar-search-wrap">
              <input
                type="text"
                placeholder="Buscar por cliente, carro..."
                className="form-control text-center text-white drive-input toolbar-control"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            {/* DIREITA */}
            <select
              className="form-select ms-auto drive-select toolbar-control"
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
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
                    <div className="card h-100 drive-card-static">
                      <div className="drive-image-wrap">
                        <img
                          src={imageSrc}
                          className="card-img-top drive-card-image"
                          alt={`${pedido.marca || ""} ${pedido.modelo || ""}`}
                          onError={(e) => {
                            e.currentTarget.src = "/cars/default-car.jpg";
                          }}
                        />

                        <span className="drive-floating-badge">
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
                          Data: {formatarData(pedido.dataPedido)}
                        </p>

                        <p className="mb-0 drive-price-status">
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