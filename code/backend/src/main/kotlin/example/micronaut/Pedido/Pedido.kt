package example.micronaut.pedido

import io.micronaut.serde.annotation.Serdeable
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime
import java.time.LocalDate

@Serdeable
@Entity
@Table(name = "pedidos")
data class Pedido(

    @field:Id
    @field:GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val dataCriacao: LocalDateTime = LocalDateTime.now(),
    val dataInicio: LocalDate? = null,
    val dataFim: LocalDate? = null,
    val status: String = "",
    val parecerFinanceiro: String = "",
    val clientId: Long = 0,
    val carId: Long = 0
)