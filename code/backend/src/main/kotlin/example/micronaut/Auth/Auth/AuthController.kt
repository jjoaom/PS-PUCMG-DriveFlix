package example.micronaut.autentificacao.auth

import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Post
import io.micronaut.http.server.cors.CrossOrigin

@Controller("/auth")
class AuthController(
    private val authService: AuthService
) {

    @Post("/login")
    fun login(@Body loginDTO: LoginDTO): HttpResponse<Any> {
        return try {
            HttpResponse.ok(authService.login(loginDTO))
        } catch (e: RuntimeException) {
            HttpResponse.badRequest(mapOf("message" to e.message))
        }
    }
}