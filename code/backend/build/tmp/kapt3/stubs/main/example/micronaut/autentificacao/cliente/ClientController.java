package example.micronaut.autentificacao.cliente;

@io.micronaut.http.annotation.Controller(value = "/clients")
@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000*\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\t\n\u0000\n\u0002\u0010 \n\u0002\u0018\u0002\n\u0002\b\u0007\b\u0007\u0018\u00002\u00020\u0001B\r\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\u0002\u0010\u0004J\u0018\u0010\u0005\u001a\b\u0012\u0004\u0012\u00020\u00010\u00062\b\b\u0001\u0010\u0007\u001a\u00020\bH\u0007J\u000e\u0010\t\u001a\b\u0012\u0004\u0012\u00020\u000b0\nH\u0007J\u0016\u0010\f\u001a\b\u0012\u0004\u0012\u00020\u00010\u00062\u0006\u0010\u0007\u001a\u00020\bH\u0007J\u0016\u0010\r\u001a\b\u0012\u0004\u0012\u00020\u00010\u00062\u0006\u0010\u000e\u001a\u00020\bH\u0007J\u0018\u0010\u000f\u001a\b\u0012\u0004\u0012\u00020\u00010\u00062\b\b\u0001\u0010\u0010\u001a\u00020\u000bH\u0007J\"\u0010\u0011\u001a\b\u0012\u0004\u0012\u00020\u00010\u00062\b\b\u0001\u0010\u0007\u001a\u00020\b2\b\b\u0001\u0010\u0010\u001a\u00020\u000bH\u0007R\u000e\u0010\u0002\u001a\u00020\u0003X\u0082\u0004\u00a2\u0006\u0002\n\u0000\u00a8\u0006\u0012"}, d2 = {"Lexample/micronaut/autentificacao/cliente/ClientController;", "", "clientService", "Lexample/micronaut/autentificacao/cliente/ClientService;", "(Lexample/micronaut/autentificacao/cliente/ClientService;)V", "delete", "Lio/micronaut/http/HttpResponse;", "id", "", "findAll", "", "Lexample/micronaut/autentificacao/cliente/ClientDTO;", "findById", "findByUserId", "userId", "register", "clientDTO", "update", "default"})
public final class ClientController {
    @org.jetbrains.annotations.NotNull()
    private final example.micronaut.autentificacao.cliente.ClientService clientService = null;
    
    public ClientController(@org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.cliente.ClientService clientService) {
        super();
    }
    
    @io.micronaut.http.annotation.Post(value = "/register")
    @org.jetbrains.annotations.NotNull()
    public final io.micronaut.http.HttpResponse<java.lang.Object> register(@io.micronaut.http.annotation.Body()
    @org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.cliente.ClientDTO clientDTO) {
        return null;
    }
    
    @io.micronaut.http.annotation.Get()
    @org.jetbrains.annotations.NotNull()
    public final java.util.List<example.micronaut.autentificacao.cliente.ClientDTO> findAll() {
        return null;
    }
    
    @io.micronaut.http.annotation.Get(value = "/{id}")
    @org.jetbrains.annotations.NotNull()
    public final io.micronaut.http.HttpResponse<java.lang.Object> findById(long id) {
        return null;
    }
    
    @io.micronaut.http.annotation.Get(value = "/user/{userId}")
    @org.jetbrains.annotations.NotNull()
    public final io.micronaut.http.HttpResponse<java.lang.Object> findByUserId(long userId) {
        return null;
    }
    
    @io.micronaut.http.annotation.Put(value = "/{id}")
    @org.jetbrains.annotations.NotNull()
    public final io.micronaut.http.HttpResponse<java.lang.Object> update(@io.micronaut.http.annotation.PathVariable()
    long id, @io.micronaut.http.annotation.Body()
    @org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.cliente.ClientDTO clientDTO) {
        return null;
    }
    
    @io.micronaut.http.annotation.Delete(value = "/{id}")
    @org.jetbrains.annotations.NotNull()
    public final io.micronaut.http.HttpResponse<java.lang.Object> delete(@io.micronaut.http.annotation.PathVariable()
    long id) {
        return null;
    }
}