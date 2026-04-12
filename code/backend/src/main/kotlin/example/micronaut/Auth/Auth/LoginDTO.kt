package example.micronaut.autentificacao.auth

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable

@Introspected
@Serdeable
data class LoginDTO(
    val email: String,
    val password: String
)