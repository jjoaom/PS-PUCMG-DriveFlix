package example.micronaut.pedido

import jakarta.inject.Singleton

@Singleton
class PedidoService(
    private val pedidoRepository: PedidoRepository
) {

    fun criarPedido(dto: PedidoDTO): Pedido {
        val pedido = Pedido(
            status = "PENDENTE",
            parecerFinanceiro = "EM_ANALISE",
            clientId = dto.clientId,
            carId = dto.carId
        )

        return pedidoRepository.save(pedido)
    }

    fun listarTodos(): List<Pedido> {
        return pedidoRepository.findAll().toList()
    }

    fun listarPorCliente(clientId: Long): List<Pedido> {
        return pedidoRepository.findByClientId(clientId)
    }
}