export default function CarCard({ carro }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={carro.imagemUrl}
        className="card-img-top"
        alt={carro.modelo}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body">
        <h5 className="card-title">
          {carro.marca} {carro.modelo}
        </h5>
        <p className="mb-1"><strong>Placa:</strong> {carro.placa}</p>
        <p className="mb-1"><strong>Status:</strong> {carro.status}</p>
        <p className="mb-0"><strong>Preço:</strong> R$ {carro.preco}/dia</p>
      </div>
    </div>
  );
}