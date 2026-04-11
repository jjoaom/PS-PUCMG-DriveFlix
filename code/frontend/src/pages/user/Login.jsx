import { NavLink } from "react-router-dom";

export default function Login() {
    return (
        <>
            <div className="container d-flex align-items-center justify-content-center main-content">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card p-4 shadow-sm text-center position-relative pt-5">

                        <img
                            src="/driveflix-icon.png"
                            alt="Profile"
                            className="rounded-circle position-absolute top-0 start-50 translate-middle object-fit-cover"
                            style={{ width: "100px", height: "100px" }}
                        />

                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Endereço de Email</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <div className="mb-3">
                            <select className="form-select">
                                <option defaultValue>Selecione seu acesso</option>
                                <option value="client">Cliente</option>
                                <option value="agent">Agente</option>
                            </select>
                        </div>

                        <p>
                            <a href="/forgot-my-password" className="link-body-emphasis cor_roxa_text">
                                Esqueci minha senha
                            </a>
                        </p>

                        <button className="btn cor_roxa_bg text-white w-100 mb-2">
                            <strong>Entrar</strong>
                        </button>

                        <NavLink to="/cadastro" className="btn cor_roxa_bg text-white w-100">
                            <strong>Registre-se</strong>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}