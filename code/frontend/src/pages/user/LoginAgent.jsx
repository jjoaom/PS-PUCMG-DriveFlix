export default function LoginAgent() {
    return (
        <>
            <div className="container-fluid">
                <h1>Login</h1>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="Insira seu email"/>
                        <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                        <label for="floatingPassword">Password</label>
                </div>
                <div className="px-4">
                    <p><a href="/forgot-my-password" class="link-body-emphasis">Esqueci minha senha</a></p>
                </div>
            </div>
        </>
    );
}