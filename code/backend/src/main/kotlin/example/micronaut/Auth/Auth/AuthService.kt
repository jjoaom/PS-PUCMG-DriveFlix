package example.micronaut.autentificacao.auth

import example.micronaut.autentificacao.usuario.UserRepository
import jakarta.inject.Singleton

@Singleton
class AuthService(
    private val userRepository: UserRepository
) {
    fun login(loginDTO: LoginDTO): Map<String, Any?> {
        val user = userRepository.findByEmail(loginDTO.email)
            ?: throw RuntimeException("Usuário não encontrado")

        if (user.password != loginDTO.password) {
            throw RuntimeException("Senha inválida")
        }

        return mapOf(
            "message" to "Login realizado com sucesso",
            "userId" to user.id,
            "email" to user.email
        )
    }
}