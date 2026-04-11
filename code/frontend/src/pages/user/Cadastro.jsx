import { NavLink } from "react-router-dom";

export default function Cadastro() {
  return (
    <div className="container d-flex align-items-center justify-content-center main-content">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="card p-4 shadow-sm text-center position-relative pt-5">

          {/* Avatar */}
          <img
            src="/driveflix-icon.png"
            alt="Profile"
            className="rounded-circle position-absolute top-0 start-50 translate-middle object-fit-cover border border-3 border-white"
            style={{ width: "100px", height: "100px" }}
          />

          <h4 className="cor_roxa mb-3">Cadastro de Cliente</h4>

          {/* Nome */}
          <div className="form-floating mb-2">
            <input type="text" className="form-control" id="nome" placeholder="Nome completo" />
            <label htmlFor="nome">Nome completo</label>
          </div>

          {/* CPF */}
          <div className="form-floating mb-2">
            <input type="text" className="form-control" id="cpf" placeholder="CPF" />
            <label htmlFor="cpf">CPF</label>
          </div>

          {/* RG */}
          <div className="form-floating mb-2">
            <input type="text" className="form-control" id="rg" placeholder="RG" />
            <label htmlFor="rg">RG</label>
          </div>

          {/* Telefone */}
          <div className="form-floating mb-2">
            <input type="tel" className="form-control" id="telefone" placeholder="Telefone" />
            <label htmlFor="telefone">Telefone</label>
          </div>

          {/* Email */}
          <div className="form-floating mb-2">
            <input type="email" className="form-control" id="email" placeholder="Email" />
            <label htmlFor="email">Email</label>
          </div>

          {/* Senha */}
          <div className="form-floating mb-2">
            <input type="password" className="form-control" id="senha" placeholder="Senha" />
            <label htmlFor="senha">Senha</label>
          </div>

          {/* Confirmar senha */}
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="confirmarSenha" placeholder="Confirmar senha" />
            <label htmlFor="confirmarSenha">Confirmar senha</label>
          </div>

          {/* Botão */}
          <button className="btn cor_roxa_bg text-white w-100 mb-2">
            Cadastrar
          </button>

          {/* Link */}
          <p className="mb-0">
            <NavLink to="/login" className="link-body-emphasis">
              Já tem conta? Entrar
            </NavLink>
          </p>

        </div>
      </div>
    </div>
  );
}