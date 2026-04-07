package example.micronaut.autentificacao.cliente

import example.micronaut.autentificacao.usuario.User
import jakarta.persistence.*

@Entity
@Table(name = "clients")
data class Client(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val name: String = "",
    val cpf: String = "",
    val rg: String = "",
    val phone: String = "",
    val address: String = "",

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    val user: User = User()
)