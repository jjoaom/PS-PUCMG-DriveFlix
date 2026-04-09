package example.micronaut.autentificacao.usuario

import io.micronaut.core.annotation.Introspected

@Introspected
data class UserDTO(
    val id: Long? = null,
    val email: String,
    val password: String
)