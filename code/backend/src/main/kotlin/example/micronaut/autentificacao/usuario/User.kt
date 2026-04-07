package example.micronaut.autentificacao.usuario

import io.micronaut.data.annotation.*

@MappedEntity("users")
data class User(

    @field:Id
    @GeneratedValue(GeneratedValue.Type.AUTO)
    val id: Long? = null,

    val email: String,
    val password: String
)