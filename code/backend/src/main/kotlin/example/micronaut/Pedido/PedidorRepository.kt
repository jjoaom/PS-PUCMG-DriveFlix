package example.micronaut.pedido

import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository

@Repository
interface PedidoRepository : CrudRepository<Pedido, Long> {
    fun findByClientId(clientId: Long): List<Pedido>
}