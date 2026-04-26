import { useEffect, useState } from "react";
import { FaCar, FaCalendarAlt, FaClock } from "react-icons/fa";

export default function MeusPedidos() {
  const clientId = localStorage.getItem("clientId");
  const [pedidos, setPedidos] = useState([]);
  const [erro, setErro] = useState(
    clientId ? "" : "clientId não encontrado no localStorage."
  );
  const [loading, setLoading] = useState(!!clientId);

  useEffect(() => {
    if (!clientId) {
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
  }, [clientId]);

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
      <div className="container-fluid page-shell page-shell-padding">
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

                      <div className="card-body d-flex flex-column gap-2 p-3">
                        <h5 className="card-title mb-0">
                          {pedido.marca} {pedido.modelo}
                        </h5>

                        <span
                          className={`drive-status-chip ${
                            pedido.status === "APROVADO"
                              ? "drive-status-aprovado"
                              : pedido.status === "REPROVADO"
                                ? "drive-status-reprovado"
                                : "drive-status-pendente"
                          }`}
                        >
                          {pedido.status || "PENDENTE"}
                        </span>

                        <p className="mb-0 drive-meta-text">
                          <FaCar className="me-2" />
                          {pedido.placa || "Placa não informada"}
                        </p>

                        {pedido.dataInicio && pedido.dataFim && (
                          <p className="mb-0 drive-meta-text">
                            <FaCalendarAlt className="me-2" />
                            {pedido.dataInicio} → {pedido.dataFim}
                          </p>
                        )}

                        <p className="mb-0 drive-meta-text">
                          <FaClock className="me-2" />
                          Pedido em: {formatarData(pedido.dataPedido)}
                        </p>

                        {pedido.valorTotal != null && (
                          <p className="mb-0 mt-1 drive-price-total">
                            {Number(pedido.valorTotal).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        )}
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