package example.micronaut.autentificacao.auth

import example.micronaut.autentificacao.cliente.ClientRepository
import example.micronaut.autentificacao.usuario.UserRepository
import jakarta.inject.Singleton

@Singleton
class AuthService(
    private val userRepository: UserRepository,
    private val clientRepository: ClientRepository
) {
    fun login(loginDTO: LoginDTO): Map<String, Any?> {
        val user = userRepository.findByEmail(loginDTO.email)
            ?: throw RuntimeException("Usuário não encontrado")

        if (user.password != loginDTO.password) {
            throw RuntimeException("Senha inválida")
        }

        val client = clientRepository.findByUserId(user.id!!)
        val clientId = if (client.isPresent) client.get().id else null

        return mapOf(
            "message" to "Login realizado com sucesso",
            "userId" to user.id,
            "clientId" to clientId,
            "email" to user.email
        )
    }
}