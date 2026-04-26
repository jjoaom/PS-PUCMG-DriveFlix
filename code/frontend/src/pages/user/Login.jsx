import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessType, setAccessType] = useState("");
  const [error, setError] = useState("");

  function isSafeLong(value) {
    return Number.isInteger(value) && value >= 0 && Number.isSafeInteger(value);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!accessType) {
      setError("Selecione se você é Cliente ou Agente.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          tipo: accessType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      const userId = Number(data.userId);
      const clientId = Number(data.clientId);
      const agentId = Number(data.agenteId);

      localStorage.clear();

      if (isSafeLong(userId)) {
        localStorage.setItem("userId", String(userId));
      }

      if (accessType === "CLIENTE" && isSafeLong(clientId)) {
        localStorage.setItem("clientId", String(clientId));
      }

      if (accessType === "AGENTE" && isSafeLong(agentId)) {
        localStorage.setItem("agentId", String(agentId));
      }

      localStorage.setItem("accessType", accessType);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center auth-shell">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 auth-wrapper login">
        <form
          onSubmit={handleLogin}
          className="card p-4 text-center position-relative auth-card"
        >
          <img
            src="/driveflix-icon.png"
            alt="Profile"
            className="rounded-circle position-absolute top-0 start-50 translate-middle object-fit-cover auth-avatar login"
          />

          <h4 className="mb-3 auth-title">
            Login
          </h4>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control auth-input"
            />
            <label htmlFor="floatingInput" className="auth-label">
              Endereço de Email
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control auth-input"
            />
            <label htmlFor="floatingPassword" className="auth-label">
              Senha
            </label>
          </div>

          <div className="mb-3">
            <select
              className="form-select auth-input"
              value={accessType}
              onChange={(e) => setAccessType(e.target.value)}
              required
            >
              <option value="">Selecione seu acesso</option>
              <option value="CLIENTE">Cliente</option>
              <option value="AGENTE">Agente</option>
            </select>
          </div>

          {error && <p className="text-danger">{error}</p>}

          <p>
            <NavLink to="/forgot-my-password" className="link-accent">
              Esqueci minha senha
            </NavLink>
          </p>

          <button
            type="submit"
            className="btn w-100 mb-2 btn-drive-primary"
          >
            Entrar
          </button>

          <NavLink
            to="/cadastro"
            className="btn w-100 btn-drive-secondary"
          >
            Registre-se
          </NavLink>
        </form>
      </div>
    </div>
  );
}