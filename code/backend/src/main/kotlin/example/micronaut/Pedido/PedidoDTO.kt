package example.micronaut.pedido

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable
import java.time.LocalDate

@Introspected
@Serdeable
data class PedidoDTO(
    val clientId: Long,
    val carId: Long,
    val dataInicio: LocalDate,
    val dataFim: LocalDate,
)