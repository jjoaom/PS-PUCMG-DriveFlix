package example.micronaut.autentificacao.usuario;

@io.micronaut.http.annotation.Controller(value = "/users")
@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000.\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\t\n\u0000\n\u0002\u0010 \n\u0002\b\u0003\b\u0007\u0018\u00002\u00020\u0001B\r\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\u0002\u0010\u0004J\u0018\u0010\u0005\u001a\b\u0012\u0004\u0012\u00020\u00010\u00062\b\b\u0001\u0010\u0007\u001a\u00020\bH\u0007J\u0018\u0010\t\u001a\b\u0012\u0004\u0012\u00020\u00010\u00062\b\b\u0001\u0010\n\u001a\u00020\u000bH\u0007J\u000e\u0010\f\u001a\b\u0012\u0004\u0012\u00020\b0\rH\u0007J\u0016\u0010\u000e\u001a\b\u0012\u0004\u0012\u00020\u00010\u00062\u0006\u0010\n\u001a\u00020\u000bH\u0007J\"\u0010\u000f\u001a\b\u0012\u0004\u0012\u00020\u00010\u00062\b\b\u0001\u0010\n\u001a\u00020\u000b2\b\b\u0001\u0010\u0007\u001a\u00020\bH\u0007R\u000e\u0010\u0002\u001a\u00020\u0003X\u0082\u0004\u00a2\u0006\u0002\n\u0000\u00a8\u0006\u0010"}, d2 = {"Lexample/micronaut/autentificacao/usuario/UserController;", "", "userService", "Lexample/micronaut/autentificacao/usuario/UserService;", "(Lexample/micronaut/autentificacao/usuario/UserService;)V", "create", "Lio/micronaut/http/HttpResponse;", "userDTO", "Lexample/micronaut/autentificacao/usuario/UserDTO;", "delete", "id", "", "findAll", "", "findById", "update", "default"})
public final class UserController {
    @org.jetbrains.annotations.NotNull()
    private final example.micronaut.autentificacao.usuario.UserService userService = null;
    
    public UserController(@org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.usuario.UserService userService) {
        super();
    }
    
    @io.micronaut.http.annotation.Post()
    @org.jetbrains.annotations.NotNull()
    public final io.micronaut.http.HttpResponse<java.lang.Object> create(@io.micronaut.http.annotation.Body()
    @org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.usuario.UserDTO userDTO) {
        return null;
    }
    
    @io.micronaut.http.annotation.Get()
    @org.jetbrains.annotations.NotNull()
    public final java.util.List<example.micronaut.autentificacao.usuario.UserDTO> findAll() {
        return null;
    }
    
    @io.micronaut.http.annotation.Get(value = "/{id}")
    @org.jetbrains.annotations.NotNull()
    public final io.micronaut.http.HttpResponse<java.lang.Object> findById(long id) {
        return null;
    }
    
    @io.micronaut.http.annotation.Put(value = "/{id}")
    @org.jetbrains.annotations.NotNull()
    public final io.micronaut.http.HttpResponse<java.lang.Object> update(@io.micronaut.http.annotation.PathVariable()
    long id, @io.micronaut.http.annotation.Body()
    @org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.usuario.UserDTO userDTO) {
        return null;
    }
    
    @io.micronaut.http.annotation.Delete(value = "/{id}")
    @org.jetbrains.annotations.NotNull()
    public final io.micronaut.http.HttpResponse<java.lang.Object> delete(@io.micronaut.http.annotation.PathVariable()
    long id) {
        return null;
    }
}