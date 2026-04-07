export default function CadastroClient() {
    return (
        <>
            <div className="container-fluid">
                <h1 className="cor_roxa">Cadastro de Cliente</h1>
                <div className="mb-2">
                    <div className="form-floating cor_roxa-bg">
                        <input type="text" className="form-control" id="floatingName" placeholder="Nome" />
                        <label for="floatingName"></label>
                    </div>
                    <div className="form-floating cor_roxa-bg">
                        <input type="text" className="form-control" id="floatingCpf" placeholder="Cpf" />
                        <label for="floatingCpf"></label>
                    </div>
                    <div className="form-floating cor_roxa-bg">
                        <input type="text" className="form-control" id="floatingRg" placeholder="Rg" />
                        <label for="floatingRg"></label>
                    </div>
                    <div className="form-floating cor_roxa-bg">
                        <input type="text" className="form-control" id="floatingTelefone" placeholder="Telefone" />
                        <label for="floatingTelefone"></label>
                    </div>
                    <div className="form-floating cor_roxa-bg">
                        <input type="text" className="form-control" id="floatingName" placeholder="Nome" />
                        <label for="floatingName"></label>
                    </div>
                    <div className="form-floating cor_roxa-bg mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="Email" />
                        <label for="floatingInput"></label>
                    </div>
                    <div className="form-floating cor_roxa-bg">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Senha" />
                        <label for="floatingPassword"></label>
                    </div>
                    <div className="form-floating cor_roxa-bg">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Confirme sua senha" />
                        <label for="floatingPassword"></label>
                    </div>

                </div>
                <div className="px-4">
                    <p><a href="/forgot-my-password" class="link-body-emphasis">Esqueci minha senha</a></p>
                </div>
            </div>
        </>
    );
}