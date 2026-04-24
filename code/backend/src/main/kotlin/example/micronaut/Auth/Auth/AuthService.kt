package example.micronaut.autentificacao.auth

import example.micronaut.autentificacao.cliente.ClientRepository
import example.micronaut.autentificacao.usuario.UserRepository
import example.micronaut.autentificacao.agente.AgenteRepository
import jakarta.inject.Singleton

@Singleton
class AuthService(
    private val userRepository: UserRepository,
    private val clientRepository: ClientRepository,
    private val agenteRepository: AgenteRepository
) {

    fun login(loginDTO: LoginDTO): Map<String, Any?> {
    val user = userRepository.findByEmail(loginDTO.email)
        ?: throw RuntimeException("Usuário não encontrado")

    if (user.password != loginDTO.password) {
        throw RuntimeException("Senha inválida")
    }

    return when (loginDTO.tipo.uppercase()) {
        "CLIENTE" -> {
            val client = clientRepository.findById(user.id!!)
                .orElseThrow { RuntimeException("Este usuário não é cliente") }

            mapOf(
                "userId" to user.id,
                "clientId" to client.id,
                "tipo" to "CLIENTE"
            )
        }

        "AGENTE" -> {
            val agente = agenteRepository.findById(user.id!!)
                .orElseThrow { RuntimeException("Este usuário não é agente") }

            mapOf(
                "userId" to user.id,
                "agenteId" to agente.id,
                "tipo" to "AGENTE"
            )
        }

        else -> throw RuntimeException("Tipo de usuário inválido")
    }
}
}