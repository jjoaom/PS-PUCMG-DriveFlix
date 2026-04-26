import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IMaskInput } from "react-imask";

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

  return (
    <div className="d-flex align-items-center justify-content-center auth-shell">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 auth-wrapper">
        <form
          onSubmit={handleCadastro}
          className="card p-4 text-center position-relative auth-card"
        >
          <img
            src="/driveflix-icon.png"
            alt="Profile"
            className="rounded-circle position-absolute top-0 start-50 translate-middle object-fit-cover auth-avatar"
          />

          <h4 className="mb-3 auth-title">
            {tipoCadastro === "cliente"
              ? "Cadastro de Cliente"
              : "Cadastro de Agente"}
          </h4>

          <div className="d-flex gap-2 mb-3">
            <button
              type="button"
              className={`btn w-50 cadastro-toggle ${tipoCadastro === "cliente" ? "active" : ""}`}
              onClick={() => setTipoCadastro("cliente")}
            >
              Cliente
            </button>

            <button
              type="button"
              className={`btn w-50 cadastro-toggle ${tipoCadastro === "agente" ? "active" : ""}`}
              onClick={() => setTipoCadastro("agente")}
            >
              Agente
            </button>
          </div>

          {tipoCadastro === "cliente" && (
            <>
              <div className="form-floating mb-2">
                <input type="text" className="form-control auth-input" id="nome" placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="nome" className="auth-label">Nome completo</label>
              </div>

              <div className="form-floating mb-2">
                <IMaskInput
                  mask="000.000.000-00"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="form-control auth-input"
                  id="cpf"
                  required
                  unmask={false}
                />
                <label htmlFor="cpf" className="auth-label">CPF</label>
              </div>

              <div className="form-floating mb-2">
                <IMaskInput
                  mask="00.000.000"
                  placeholder="00.000.000"
                  value={rg}
                  onChange={(e) => setRg(e.target.value)}
                  className="form-control auth-input"
                  id="rg"
                  required
                  unmask={false}
                />
                <label htmlFor="rg" className="auth-label">RG</label>
              </div>

              <div className="form-floating mb-2">
                <IMaskInput
                  mask="(00) 00000-0000"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control auth-input"
                  id="telefone"
                  required
                  unmask={false}
                />
                <label htmlFor="telefone" className="auth-label">Telefone</label>
              </div>

              <div className="form-floating mb-2">
                <input type="text" className="form-control auth-input" id="address" placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} />
                <label htmlFor="address" className="auth-label">Endereço</label>
              </div>
            </>
          )}

          {tipoCadastro === "agente" && (
            <>
              <div className="form-floating mb-2">
                <IMaskInput
                  mask="00.000.000/0000-00"
                  placeholder="00.000.000/0000-00"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  className="form-control auth-input"
                  id="cnpj"
                  required
                  unmask={false}
                />
                <label htmlFor="cnpj" className="auth-label">CNPJ</label>
              </div>

              <div className="form-floating mb-2">
                <input type="text" className="form-control auth-input" id="razaoSocial" placeholder="Razão Social" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} />
                <label htmlFor="razaoSocial" className="auth-label">Razão Social</label>
              </div>

              <div className="form-floating mb-2">
                <select className="form-select auth-input" id="tipoAgente" value={tipoAgente} onChange={(e) => setTipoAgente(e.target.value)}>
                  <option value="EMPRESA">Empresa</option>
                  <option value="BANCO">Banco</option>
                </select>
                <label htmlFor="tipoAgente" className="auth-label">Tipo de agente</label>
              </div>
            </>
          )}

          <div className="form-floating mb-2">
            <input type="email" className="form-control auth-input" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="email" className="auth-label">Email</label>
          </div>

          <div className="form-floating mb-2">
            <input type="password" className="form-control auth-input" id="senha" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="senha" className="auth-label">Senha</label>
          </div>

          <div className="form-floating mb-3">
            <input type="password" className="form-control auth-input" id="confirmarSenha" placeholder="Confirmar senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
            <label htmlFor="confirmarSenha" className="auth-label">Confirmar senha</label>
          </div>

          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <button
            type="submit"
            className="btn w-100 mb-2 btn-drive-primary"
          >
            Cadastrar
          </button>

          <p className="mb-0">
            <NavLink to="/login" className="link-accent">
              Já tem conta? Entrar
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}