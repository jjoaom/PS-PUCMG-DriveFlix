package example.micronaut.user

import jakarta.persistence.*

@Entity
@Table(name = "users")
open class User(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open var id: Long? = null,

    open var name: String = "",
    open var email: String = "",
    open var password: String = ""

) {
    constructor() : this(null, "", "", "")
}