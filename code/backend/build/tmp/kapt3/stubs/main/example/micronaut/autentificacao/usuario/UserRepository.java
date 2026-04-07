package example.micronaut.autentificacao.usuario;

@io.micronaut.data.annotation.Repository()
@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000$\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\u0010\t\n\u0000\n\u0002\u0010\u000b\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0000\bg\u0018\u00002\u000e\u0012\u0004\u0012\u00020\u0002\u0012\u0004\u0012\u00020\u00030\u0001J\u0010\u0010\u0004\u001a\u00020\u00052\u0006\u0010\u0006\u001a\u00020\u0007H&J\u0016\u0010\b\u001a\b\u0012\u0004\u0012\u00020\u00020\t2\u0006\u0010\u0006\u001a\u00020\u0007H&\u00a8\u0006\n"}, d2 = {"Lexample/micronaut/autentificacao/usuario/UserRepository;", "Lio/micronaut/data/repository/CrudRepository;", "Lexample/micronaut/autentificacao/usuario/User;", "", "existsByEmail", "", "email", "", "findByEmail", "Ljava/util/Optional;", "default"})
public abstract interface UserRepository extends io.micronaut.data.repository.CrudRepository<example.micronaut.autentificacao.usuario.User, java.lang.Long> {
    
    @org.jetbrains.annotations.NotNull()
    public abstract java.util.Optional<example.micronaut.autentificacao.usuario.User> findByEmail(@org.jetbrains.annotations.NotNull()
    java.lang.String email);
    
    public abstract boolean existsByEmail(@org.jetbrains.annotations.NotNull()
    java.lang.String email);
}