package example.micronaut.autentificacao.car

import example.micronaut.autentificacao.agente.Agente
import io.micronaut.serde.annotation.Serdeable
import jakarta.persistence.*

@Serdeable
@Entity
@Table(name = "carros")
data class Car(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val marca: String = "",
    val modelo: String = "",
    val placa: String = "",
    val status: String = "",
    val preco: Double = 0.0,

    @Column(name = "imagem_url")
    val imagemUrl: String = "",

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id", nullable = false)
    val agente: Agente? = null
)