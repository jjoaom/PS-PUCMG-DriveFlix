package example.micronaut.pedido

import example.micronaut.autentificacao.car.CarRepository
import jakarta.inject.Singleton

@Singleton
class PedidoService(
    private val pedidoRepository: PedidoRepository,
    private val carRepository: CarRepository
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

    fun listarPorCliente(clientId: Long): List<FiltarPedidoDTO> {
        return pedidoRepository.findByClientId(clientId).mapNotNull { pedido ->

            val carro = carRepository.findById(pedido.carId).orElse(null)
                ?: return@mapNotNull null

            FiltarPedidoDTO(
                id = pedido.id,
                dataPedido = pedido.dataCriacao.toString(),
                status = pedido.status,
                carId = carro.id,
                marca = carro.marca,
                modelo = carro.modelo,
                placa = carro.placa,
                imagemUrl = carro.imagemUrl
            )
        }
    }
}