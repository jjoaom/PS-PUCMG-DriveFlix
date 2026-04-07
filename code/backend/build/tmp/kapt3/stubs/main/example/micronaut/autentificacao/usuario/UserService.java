package example.micronaut.autentificacao.usuario;

@jakarta.inject.Singleton()
@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000.\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u0002\n\u0000\n\u0002\u0010\t\n\u0000\n\u0002\u0010 \n\u0002\b\u0003\b\u0007\u0018\u00002\u00020\u0001B\r\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\u0002\u0010\u0004J\u000e\u0010\u0005\u001a\u00020\u00062\u0006\u0010\u0007\u001a\u00020\u0006J\u000e\u0010\b\u001a\u00020\t2\u0006\u0010\n\u001a\u00020\u000bJ\f\u0010\f\u001a\b\u0012\u0004\u0012\u00020\u00060\rJ\u000e\u0010\u000e\u001a\u00020\u00062\u0006\u0010\n\u001a\u00020\u000bJ\u0016\u0010\u000f\u001a\u00020\u00062\u0006\u0010\n\u001a\u00020\u000b2\u0006\u0010\u0007\u001a\u00020\u0006R\u000e\u0010\u0002\u001a\u00020\u0003X\u0082\u0004\u00a2\u0006\u0002\n\u0000\u00a8\u0006\u0010"}, d2 = {"Lexample/micronaut/autentificacao/usuario/UserService;", "", "userRepository", "Lexample/micronaut/autentificacao/usuario/UserRepository;", "(Lexample/micronaut/autentificacao/usuario/UserRepository;)V", "create", "Lexample/micronaut/autentificacao/usuario/UserDTO;", "userDTO", "delete", "", "id", "", "findAll", "", "findById", "update", "default"})
public final class UserService {
    @org.jetbrains.annotations.NotNull()
    private final example.micronaut.autentificacao.usuario.UserRepository userRepository = null;
    
    public UserService(@org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.usuario.UserRepository userRepository) {
        super();
    }
    
    @org.jetbrains.annotations.NotNull()
    public final example.micronaut.autentificacao.usuario.UserDTO create(@org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.usuario.UserDTO userDTO) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final java.util.List<example.micronaut.autentificacao.usuario.UserDTO> findAll() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final example.micronaut.autentificacao.usuario.UserDTO findById(long id) {
        return null;
    }
    
    public final void delete(long id) {
    }
    
    @org.jetbrains.annotations.NotNull()
    public final example.micronaut.autentificacao.usuario.UserDTO update(long id, @org.jetbrains.annotations.NotNull()
    example.micronaut.autentificacao.usuario.UserDTO userDTO) {
        return null;
    }
}