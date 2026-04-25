package example.micronaut.autentificacao.car

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable


@Introspected
@Serdeable
data class CarDTO(
    val id: Long?,
    val marca: String,
    val modelo: String,
    val placa: String,
    val status: String,
    val imagemUrl: String,
    val preco: Double,
    val agentId: Long
)