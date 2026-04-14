package example.micronaut.pedido

import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*

@Controller("/pedidos")
class PedidoController(
    private val pedidoService: PedidoService
) {

    @Post
    fun criar(@Body dto: PedidoDTO): HttpResponse<Pedido> {
        val pedido = pedidoService.criarPedido(dto)
        return HttpResponse.created(pedido)
    }

    @Get
    fun listarTodos(): List<Pedido> {
        return pedidoService.listarTodos()
    }

    @Get("/cliente/{clientId}")
    fun listarPorCliente(clientId: Long): List<FiltarPedidoDTO> {
        return pedidoService.listarPorCliente(clientId)
    }
}