package example.micronaut.autentificacao.auth

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class LoginDTO(
    val email: String,
    val password: String,
    val tipo: String
)