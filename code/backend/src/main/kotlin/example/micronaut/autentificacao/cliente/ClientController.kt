package example.micronaut.autentificacao.cliente

import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*

@Controller("/clients")
class ClientController(
    private val clientService: ClientService
) {

    @Post("/register")
    fun register(@Body clientDTO: ClientDTO): HttpResponse<Any> {
        return try {
            HttpResponse.created(clientService.register(clientDTO))
        } catch (e: RuntimeException) {
            HttpResponse.badRequest(mapOf("message" to e.message))
        }
    }

    @Get
    fun findAll(): List<ClientDTO> {
        return clientService.findAll()
    }

    @Get("/{id}")
    fun findById(id: Long): HttpResponse<Any> {
        return try {
            HttpResponse.ok(clientService.findById(id))
        } catch (e: RuntimeException) {
            HttpResponse.notFound(mapOf("message" to e.message))
        }
    }

    @Get("/user/{userId}")
    fun findByUserId(userId: Long): HttpResponse<Any> {
        return try {
            HttpResponse.ok(clientService.findByUserId(userId))
        } catch (e: RuntimeException) {
            HttpResponse.notFound(mapOf("message" to e.message))
        }
    }

    @Put("/{id}")
    fun update(@PathVariable id: Long, @Body clientDTO: ClientDTO): HttpResponse<Any> {
        return try {
            HttpResponse.ok(clientService.update(id, clientDTO))
        } catch (e: RuntimeException) {
            HttpResponse.badRequest(mapOf("message" to e.message))
        }
    }

    @Delete("/{id}")
    fun delete(@PathVariable id: Long): HttpResponse<Any> {
        return try {
            clientService.delete(id)
            HttpResponse.ok(mapOf("message" to "Cliente deletado com sucesso"))
        } catch (e: RuntimeException) {
            HttpResponse.notFound(mapOf("message" to e.message))
        }
    }
}