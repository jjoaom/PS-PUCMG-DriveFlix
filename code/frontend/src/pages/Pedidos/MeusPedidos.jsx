import { useEffect, useState } from "react";
import Scene from "../homepage/Scene";

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clientId = localStorage.getItem("clientId");

    if (!clientId) {
      setErro("clientId não encontrado no localStorage.");
      setLoading(false);
      return;
    }

    fetch(`/api/pedidos/cliente/${clientId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Erro ao buscar pedidos.");
        return res.json();
      })
      .then((data) => {
        setPedidos(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setErro("Não foi possível carregar os pedidos.");
        setPedidos([]);
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
          <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
            <h2 className="text-white m-0">Meus Pedidos</h2>
          </div>

          {loading && <p className="text-white">Carregando...</p>}

          {erro && <p className="text-danger">{erro}</p>}

          {!loading && !erro && pedidos.length === 0 && (
            <p className="text-white">Nenhum pedido encontrado.</p>
          )}

          {!loading && !erro && pedidos.length > 0 && (
            <div className="row g-4">
              {pedidos.map((pedido) => {
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