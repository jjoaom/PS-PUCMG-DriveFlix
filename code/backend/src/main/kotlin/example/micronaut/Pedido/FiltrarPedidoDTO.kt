package example.micronaut.pedido

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable
import java.time.LocalDate

@Introspected
@Serdeable
data class FiltarPedidoDTO(
    val id: Long?,
    val dataPedido: String,
    val dataInicio: LocalDate?,
    val dataFim: LocalDate?,
    val valorTotal: Double?,
    val status: String,
    val carId: Long?,
    val marca: String,
    val modelo: String,
    val placa: String,
    val imagemUrl: String
)