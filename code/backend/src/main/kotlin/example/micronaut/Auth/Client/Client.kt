package example.micronaut.autentificacao.cliente

import example.micronaut.autentificacao.usuario.User
import jakarta.persistence.*

@Entity
@Table(name = "clients")
data class Client(

    @Id
    val id: Long? = null,

    var name: String = "",
    var cpf: String = "",
    var rg: String = "",
    var phone: String = "",
    var address: String = "",
    var renda: Double = 0.0,

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    var user: User = User()
)