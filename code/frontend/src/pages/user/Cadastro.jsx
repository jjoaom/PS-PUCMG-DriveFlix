import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cadastro() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleCadastro(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("/api/clients/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          cpf,
          rg,
          phone,
          email,
          password,
          address
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar");
      }

      setSuccess("Cadastro realizado com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center main-content">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <form onSubmit={handleCadastro} className="card p-4 shadow-sm text-center position-relative pt-5">

          <img
            src="/driveflix-icon.png"
            alt="Profile"
            className="rounded-circle position-absolute top-0 start-50 translate-middle object-fit-cover border border-3 border-white"
            style={{ width: "100px", height: "100px" }}
          />

          <h4 className="cor_roxa mb-3">Cadastro de Cliente</h4>

          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              id="nome"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="nome">Nome completo</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              id="cpf"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <label htmlFor="cpf">CPF</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              id="rg"
              placeholder="RG"
              value={rg}
              onChange={(e) => setRg(e.target.value)}
            />
            <label htmlFor="rg">RG</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="tel"
              className="form-control"
              id="telefone"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="telefone">Telefone</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Endereço"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="address">Endereço</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="password"
              className="form-control"
              id="senha"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="senha">Senha</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="confirmarSenha"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <label htmlFor="confirmarSenha">Confirmar senha</label>
          </div>

          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <button type="submit" className="btn cor_roxa_bg text-white w-100 mb-2">
            Cadastrar
          </button>

          <p className="mb-0">
            <NavLink to="/login" className="link-body-emphasis">
              Já tem conta? Entrar
            </NavLink>
          </p>

        </form>
      </div>
    </div>
  );
}