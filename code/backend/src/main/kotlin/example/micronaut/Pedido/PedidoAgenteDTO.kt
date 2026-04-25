package example.micronaut.pedido

import java.time.LocalDateTime
import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable

@Introspected
@Serdeable
data class PedidoAgenteDTO(
    val id: Long,
    val status: String?,
    val dataCriacao: LocalDateTime,
    val placa: String?,
    val imagemUrl: String?
)