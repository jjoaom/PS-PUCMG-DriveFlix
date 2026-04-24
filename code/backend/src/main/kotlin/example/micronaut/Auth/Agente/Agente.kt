package example.micronaut.autentificacao.agente

import example.micronaut.autentificacao.usuario.User
import jakarta.persistence.*

@Entity
@Table(name = "agentes")
data class Agente(

    @Id
    val id: Long? = null,

    var tipo: String = "",
    var cnpj: String = "",
    var razaoSocial: String = "",

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    var user: User = User()
)