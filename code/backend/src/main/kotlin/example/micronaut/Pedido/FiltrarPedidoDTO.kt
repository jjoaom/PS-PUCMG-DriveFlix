package example.micronaut.pedido

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable

@Introspected
@Serdeable
data class FiltarPedidoDTO(
    val id: Long?,
    val dataPedido: String,
    val status: String,
    val carId: Long?,
    val marca: String,
    val modelo: String,
    val placa: String,
    val imagemUrl: String
)