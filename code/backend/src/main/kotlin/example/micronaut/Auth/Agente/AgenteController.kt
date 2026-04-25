package example.micronaut.autentificacao.agente

import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*

@Controller("/agents")
class AgenteController(
    private val agenteService: AgenteService
) {

    @Post
    fun criar(@Body dto: AgenteDTO): HttpResponse<Any> {
        return try {
            HttpResponse.created(agenteService.criar(dto))
        } catch (e: RuntimeException) {
            HttpResponse.badRequest(mapOf("message" to e.message))
        }
    }
    @Get
    fun listar(): HttpResponse<List<Agente>> {
        return HttpResponse.ok(agenteService.listar())
    }

    @Get("/{id}")
    fun buscarPorId(id: Long): HttpResponse<Agente> {
        return HttpResponse.ok(agenteService.buscarPorId(id))
    }

    @Get("/cnpj/{cnpj}")
    fun buscarPorCnpj(cnpj: String): HttpResponse<Agente> {
        return HttpResponse.ok(agenteService.buscarPorCnpj(cnpj))
    }

    @Put("/{id}")
    fun atualizar(id: Long, @Body dto: AgenteDTO): HttpResponse<Agente> {
        return HttpResponse.ok(agenteService.atualizar(id, dto))
    }

    @Delete("/{id}")
    fun deletar(id: Long): HttpResponse<Any> {
        agenteService.deletar(id)
        return HttpResponse.noContent()
    }
}