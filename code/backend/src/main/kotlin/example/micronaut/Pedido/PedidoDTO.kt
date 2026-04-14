package example.micronaut.pedido

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable

@Introspected
@Serdeable
data class PedidoDTO(
    val clientId: Long,
    val carId: Long
)