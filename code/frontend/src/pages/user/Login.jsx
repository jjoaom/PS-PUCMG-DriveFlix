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
      <div className="col-12 col-sm-8 col-md-6 col-lg-4" style={{ maxWidth: "400px" }}>
        <form
          onSubmit={handleLogin}
          className="card p-4 text-center position-relative pt-5"
          style={{
            backgroundColor: "#111827",
            color: "#fff",
            border: "1px solid #7c3aed",
            borderRadius: "18px",
            boxShadow:
              "0 0 18px rgba(124, 58, 237, 0.8), 0 0 40px rgba(96, 165, 250, 0.25)",
          }}
        >
          <img
            src="/driveflix-icon.png"
            alt="Profile"
            className="rounded-circle position-absolute top-0 start-50 translate-middle object-fit-cover"
            style={{
              width: "85px",
              height: "85px",
            }}
          />

          <h4 className="mb-3" style={{ color: "#a855f7" }}>
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
              style={inputStyle}
            />
            <label htmlFor="floatingInput" style={labelStyle}>
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
              style={inputStyle}
            />
            <label htmlFor="floatingPassword" style={labelStyle}>
              Senha
            </label>
          </div>

          <div className="mb-3">
            <select
              className="form-select"
              value={accessType}
              onChange={(e) => setAccessType(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Selecione seu acesso</option>
              <option value="CLIENTE">Cliente</option>
              <option value="AGENTE">Agente</option>
            </select>
          </div>

          {error && <p className="text-danger">{error}</p>}

          <p>
            <NavLink
              to="/forgot-my-password"
              style={{ color: "#60a5fa" }}
            >
              Esqueci minha senha
            </NavLink>
          </p>

          <button
            type="submit"
            className="btn w-100 mb-2"
            style={{
              backgroundColor: "#7c3aed",
              color: "#fff",
              fontWeight: "bold",
              boxShadow: "0 0 12px rgba(124, 58, 237, 0.8)",
            }}
          >
            Entrar
          </button>

          <NavLink
            to="/cadastro"
            className="btn w-100"
            style={{
              backgroundColor: "#1f2937",
              color: "#fff",
              border: "1px solid #7c3aed",
            }}
          >
            Registre-se
          </NavLink>
        </form>
      </div>
    </div>
  );
}