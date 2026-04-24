package example.micronaut.autentificacao.agente

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable

@Introspected
@Serdeable
data class AgenteDTO(

    val id: Long? = null,

    val email: String,
    val password: String,

    val tipo: String,
    val cnpj: String,
    val razaoSocial: String
)