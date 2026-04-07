package example.micronaut.autentificacao.cliente;

@jakarta.inject.Singleton()
@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u00000\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u0002\n\u0000\n\u0002\u0010\t\n\u0000\n\u0002\u0010 \n\u0002\u0018\u0002\n\u0002\b\u0007\b\u0007\u0018\u00002\u00020\u0001B\u0015\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u0012\u0006\u0010\u0004\u001a\u00020\u0005\u00a2\u0006\u0002\u0010\u0006J\u000e\u0010\u0007\u001a\u00020\b2\u0006\u0010\t\u001a\u00020\nJ\f\u0010\u000b\u001a\b\u0012\u0004\u0012\u00020\r0\fJ\u000e\u0010\u000e\u001a\u00020\r2\u0006\u0010\t\u001a\u00020\nJ\u000e\u0010\u000f\u001a\u00020\r2\u0006\u0010\u0010\u001a\u00020\nJ\u000e\u0010\u0011\u001a\u00020\r2\u0006\u0010\u0012\u001a\u00020\rJ\u0016\u0010\u0013\u001a\u00020\r2\u0006\u0010\t\u001a\u00020\n2\u0006\u0010\u0012\u001a\u00020\rR\u000e\u0010\u0002\u001a\u00020\u0003X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0004\u001a\u00020\u0005X\u0082\u0004\u00a2\u0006\u0002\n\u0000\u00a8\u0006\u0014"}, d2 = {"Lexample/micronaut/autentificacao/cliente/ClientService;", "", "clientRepository", "Lexample/micronaut/autentificacao/cliente/ClientRepository;", "userRepository", "Lexample/micronaut/autentificacao/usuario/UserRepository;", "(Lexample/micronaut/autentificacao/cliente/ClientRepository;Lexample/micronaut/autentificacao/usuario/UserRepository;)V", "delete", "", "id", "", "findAll", "", "Lexample/micronaut/autentificacao/cliente/ClientDTO;", "findById", "findByUserId", "userId", "register", "clientDTO", "update", "default"})
public final class ClientService {
    @org.jetbrains.annotations.NotNull()
    private final example.micronaut.autentificacao.cliente.ClientRepository clientRepository = null;
    @org.jetbrains.annotations.NotNull()
    private final example.micronaut.autentificacao.usuario.UserRepository userRepository = null;
    
    public ClientService(@org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.cliente.ClientRepository clientRepository, @org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.usuario.UserRepository userRepository) {
        super();
    }
    
    @org.jetbrains.annotations.NotNull()
    public final example.micronaut.autentificacao.cliente.ClientDTO register(@org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.cliente.ClientDTO clientDTO) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final java.util.List<example.micronaut.autentificacao.cliente.ClientDTO> findAll() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final example.micronaut.autentificacao.cliente.ClientDTO findById(long id) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final example.micronaut.autentificacao.cliente.ClientDTO findByUserId(long userId) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final example.micronaut.autentificacao.cliente.ClientDTO update(long id, @org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.cliente.ClientDTO clientDTO) {
        return null;
    }
    
    public final void delete(long id) {
    }
}