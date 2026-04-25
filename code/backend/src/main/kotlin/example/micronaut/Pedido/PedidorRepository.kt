package example.micronaut.pedido

import io.micronaut.data.annotation.Query
import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository

@Repository
interface PedidoRepository : CrudRepository<Pedido, Long> {

    fun findByClientId(clientId: Long): List<Pedido>

    @Query(
        """
        SELECT p.id, p.status, p.dataCriacao, c.placa, c.imagemUrl
        FROM Pedido p, example.micronaut.autentificacao.car.Car c
        WHERE p.carId = c.id
        AND c.agente.id = :agentId
        """
    )
    fun findPedidosComCarro(agentId: Long): List<Array<Any?>>
}