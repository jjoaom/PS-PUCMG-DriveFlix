import io.micronaut.data.annotation.*
import io.micronaut.data.model.naming.NamingStrategies

@MappedEntity("users")
data class User(
    @field:Id
    @GeneratedValue(GeneratedValue.Type.AUTO)
    val id: Long = 0,

    val name: String = "",
    val email: String = "",
    val password: String = "",
)