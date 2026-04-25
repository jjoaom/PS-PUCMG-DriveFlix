import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cadastro() {
  const navigate = useNavigate();

  const [tipoCadastro, setTipoCadastro] = useState("cliente");

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [tipoAgente, setTipoAgente] = useState("EMPRESA");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

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
      const endpoint =
        tipoCadastro === "cliente" ? "/api/clients/register" : "/api/agents";

      const body =
        tipoCadastro === "cliente"
          ? { name, cpf, rg, phone, email, password, address }
          : { email, password, cnpj, razaoSocial, tipo: tipoAgente };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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

  const inputStyle = {
    backgroundColor: "#111827",
    color: "#fff",
    border: "1px solid #374151",
  };

  const labelStyle = {
    color: "#9ca3af",
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0f1a",
        padding: "40px 16px",
      }}
    >
      <div className="col-12 col-sm-8 col-md-6 col-lg-4" style={{ maxWidth: "430px" }}>
        <form
          onSubmit={handleCadastro}
          className="card p-4 text-center position-relative pt-5"
          style={{
            backgroundColor: "#111827",
            color: "#fff",
            border: "1px solid #7c3aed",
            borderRadius: "18px",
            boxShadow:
              "0 0 18px rgba(124, 58, 237, 0.75), 0 0 38px rgba(96, 165, 250, 0.25)",
          }}
        >
          <img
            src="/driveflix-icon.png"
            alt="Profile"
            className="rounded-circle position-absolute top-0 start-50 translate-middle object-fit-cover"
            style={{
              width: "86px",
              height: "86px",
            }}
          />

          <h4 className="mb-3" style={{ color: "#a855f7" }}>
            {tipoCadastro === "cliente"
              ? "Cadastro de Cliente"
              : "Cadastro de Agente"}
          </h4>

          <div className="d-flex gap-2 mb-3">
            <button
              type="button"
              className="btn w-50"
              onClick={() => setTipoCadastro("cliente")}
              style={{
                backgroundColor:
                  tipoCadastro === "cliente" ? "#7c3aed" : "transparent",
                color: "#fff",
                border: "1px solid #7c3aed",
              }}
            >
              Cliente
            </button>

            <button
              type="button"
              className="btn w-50"
              onClick={() => setTipoCadastro("agente")}
              style={{
                backgroundColor:
                  tipoCadastro === "agente" ? "#7c3aed" : "transparent",
                color: "#fff",
                border: "1px solid #7c3aed",
              }}
            >
              Agente
            </button>
          </div>

          {tipoCadastro === "cliente" && (
            <>
              <div className="form-floating mb-2">
                <input type="text" className="form-control" id="nome" placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                <label htmlFor="nome" style={labelStyle}>Nome completo</label>
              </div>

              <div className="form-floating mb-2">
                <input type="text" className="form-control" id="cpf" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} style={inputStyle} />
                <label htmlFor="cpf" style={labelStyle}>CPF</label>
              </div>

              <div className="form-floating mb-2">
                <input type="text" className="form-control" id="rg" placeholder="RG" value={rg} onChange={(e) => setRg(e.target.value)} style={inputStyle} />
                <label htmlFor="rg" style={labelStyle}>RG</label>
              </div>

              <div className="form-floating mb-2">
                <input type="tel" className="form-control" id="telefone" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
                <label htmlFor="telefone" style={labelStyle}>Telefone</label>
              </div>

              <div className="form-floating mb-2">
                <input type="text" className="form-control" id="address" placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} />
                <label htmlFor="address" style={labelStyle}>Endereço</label>
              </div>
            </>
          )}

          {tipoCadastro === "agente" && (
            <>
              <div className="form-floating mb-2">
                <input type="text" className="form-control" id="cnpj" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} style={inputStyle} />
                <label htmlFor="cnpj" style={labelStyle}>CNPJ</label>
              </div>

              <div className="form-floating mb-2">
                <input type="text" className="form-control" id="razaoSocial" placeholder="Razão Social" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} style={inputStyle} />
                <label htmlFor="razaoSocial" style={labelStyle}>Razão Social</label>
              </div>

              <div className="form-floating mb-2">
                <select className="form-select" id="tipoAgente" value={tipoAgente} onChange={(e) => setTipoAgente(e.target.value)} style={inputStyle}>
                  <option value="EMPRESA">Empresa</option>
                  <option value="BANCO">Banco</option>
                </select>
                <label htmlFor="tipoAgente" style={labelStyle}>Tipo de agente</label>
              </div>
            </>
          )}

          <div className="form-floating mb-2">
            <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            <label htmlFor="email" style={labelStyle}>Email</label>
          </div>

          <div className="form-floating mb-2">
            <input type="password" className="form-control" id="senha" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            <label htmlFor="senha" style={labelStyle}>Senha</label>
          </div>

          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="confirmarSenha" placeholder="Confirmar senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} style={inputStyle} />
            <label htmlFor="confirmarSenha" style={labelStyle}>Confirmar senha</label>
          </div>

          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <button
            type="submit"
            className="btn w-100 mb-2"
            style={{
              backgroundColor: "#7c3aed",
              color: "#fff",
              fontWeight: "bold",
              boxShadow: "0 0 14px rgba(124, 58, 237, 0.75)",
            }}
          >
            Cadastrar
          </button>

          <p className="mb-0">
            <NavLink to="/login" style={{ color: "#60a5fa" }}>
              Já tem conta? Entrar
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}