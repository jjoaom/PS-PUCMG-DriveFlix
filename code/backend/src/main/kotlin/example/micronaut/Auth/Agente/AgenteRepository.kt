package example.micronaut.autentificacao.agente

import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository
import java.util.Optional

@Repository
interface AgenteRepository : CrudRepository<Agente, Long> {

    fun findByCnpj(cnpj: String): Optional<Agente>

    fun existsByCnpj(cnpj: String): Boolean
}