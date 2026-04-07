package example.micronaut.autentificacao.cliente

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable

@Introspected
@Serdeable
data class ClientDTO(
    val id: Long? = null,
    val email: String,
    val password: String,
    val name: String,
    val cpf: String,
    val rg: String,
    val phone: String,
    val address: String
)