package example.micronaut.autentificacao.usuario
import io.micronaut.serde.annotation.Serdeable
import jakarta.persistence.*

@Entity
@Serdeable
@Table(name = "users")
open class User(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open var id: Long? = null,

    open var email: String = "",

    open var password: String = ""
)