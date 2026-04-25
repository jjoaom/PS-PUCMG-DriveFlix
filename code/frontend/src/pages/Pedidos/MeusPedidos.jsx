import { useEffect, useState } from "react";

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
        if (!res.ok) {
          throw new Error("Erro ao buscar pedidos.");
        }
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
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mt-4">Carregando...</div>;
  }

  if (erro) {
    return <div className="container mt-4">{erro}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Meus Pedidos</h2>

      {pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <div className="row">
          {pedidos.map((pedido) => {
            const imageSrc = pedido.imagemUrl?.startsWith("/uploads")
              ? `http://localhost:8080/api${pedido.imagemUrl}`
              : pedido.imagemUrl;

            return (
              <div className="col-md-4 mb-4" key={pedido.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={imageSrc}
                    className="card-img-top"
                    alt={`${pedido.marca} ${pedido.modelo}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className="card-body">
                    <h5 className="card-title">
                      {pedido.marca} {pedido.modelo}
                    </h5>
                    <p><strong>Placa:</strong> {pedido.placa}</p>
                    <p><strong>Data:</strong> {pedido.dataPedido}</p>
                    <p><strong>Status:</strong> {pedido.status}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}