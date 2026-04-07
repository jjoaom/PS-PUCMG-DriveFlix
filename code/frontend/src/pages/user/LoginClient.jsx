export default function LoginClient() {
    return (
        <>
            <div className="container-fluid">
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
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