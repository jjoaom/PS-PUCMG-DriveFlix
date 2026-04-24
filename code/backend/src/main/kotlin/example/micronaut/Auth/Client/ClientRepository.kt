package example.micronaut.autentificacao.cliente

import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository
import java.util.Optional

@Repository
interface ClientRepository : CrudRepository<Client, Long> {

    fun findByCpf(cpf: String): Optional<Client>

    fun existsByCpf(cpf: String): Boolean
}