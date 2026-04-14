import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accessType, setAccessType] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao fazer login");
            }

             // SALVA NO LOCALSTORAGE
            localStorage.setItem("clientId", data.clientId);
            localStorage.setItem("userId", data.userId);
            console.log("Login OK:", data);

            // opcional: redirecionar
            window.location.href = "/";

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center main-content">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                <form onSubmit={handleLogin} className="card p-4 shadow-sm text-center position-relative pt-5">

                    <img
                        src="/driveflix-icon.png"
                        alt="Profile"
                        className="rounded-circle position-absolute top-0 start-50 translate-middle object-fit-cover"
                        style={{ width: "100px", height: "100px" }}
                    />

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Endereço de Email</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="mb-3">
                        <select
                            className="form-select"
                            value={accessType}
                            onChange={(e) => setAccessType(e.target.value)}
                        >
                            <option value="">Selecione seu acesso</option>
                            <option value="client">Cliente</option>
                            <option value="agent">Agente</option>
                        </select>
                    </div>

                    {error && <p className="text-danger">{error}</p>}

                    <p>
                        <NavLink to="/forgot-my-password" className="link-body-emphasis cor_roxa_text">
                            Esqueci minha senha
                        </NavLink>
                    </p>

                    <button type="submit" className="btn cor_roxa_bg text-white w-100 mb-2">
                        <strong>Entrar</strong>
                    </button>

                    <NavLink to="/cadastro" className="btn cor_roxa_bg text-white w-100">
                        <strong>Registre-se</strong>
                    </NavLink>
                </form>
            </div>
        </div>
    );
}