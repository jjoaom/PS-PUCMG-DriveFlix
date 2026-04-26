package example.micronaut.pedido

import example.micronaut.autentificacao.car.CarRepository
import jakarta.inject.Singleton
import java.time.temporal.ChronoUnit

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
            carId = dto.carId,
            dataInicio = dto.dataInicio,
            dataFim = dto.dataFim
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

            val valorTotal = if (pedido.dataInicio != null && pedido.dataFim != null)
                ChronoUnit.DAYS.between(pedido.dataInicio, pedido.dataFim) * carro.preco
            else null

            FiltarPedidoDTO(
                id = pedido.id,
                dataPedido = pedido.dataCriacao.toString(),
                dataInicio = pedido.dataInicio,
                dataFim = pedido.dataFim,
                valorTotal = valorTotal,
                status = pedido.status,
                carId = carro.id,
                marca = carro.marca,
                modelo = carro.modelo,
                placa = carro.placa,
                imagemUrl = carro.imagemUrl
            )
        }
    }

    fun buscarPorAgente(agentId: Long): List<PedidoAgenteDTO> {
        val resultados = pedidoRepository.findPedidosComCarro(agentId)
        return resultados.map { linha ->
            PedidoAgenteDTO(
                id = linha[0] as Long,
                status = linha[1] as String?,
                dataCriacao = linha[2] as java.time.LocalDateTime,
                placa = linha[3] as String?,
                imagemUrl = linha[4] as String?
            )
        }
    }
}