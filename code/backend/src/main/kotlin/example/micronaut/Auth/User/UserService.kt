package example.micronaut.autentificacao.usuario

import jakarta.inject.Singleton

@Singleton
class UserService(
    private val userRepository: UserRepository
) {

    fun create(userDTO: UserDTO): UserDTO {
        if (userRepository.existsByEmail(userDTO.email)) {
            throw RuntimeException("Email já cadastrado")
        }

        val savedUser = userRepository.save(
            User(
                email = userDTO.email,
                password = userDTO.password
            )
        )

        return toDTO(savedUser)
    }

    fun findAll(): List<UserDTO> {
        return userRepository.findAll().map { user ->
            toDTO(user)
        }
    }

    fun findById(id: Long): UserDTO {
        val user = userRepository.findById(id)
            .orElseThrow { RuntimeException("Usuário não encontrado") }

        return toDTO(user)
    }

    fun update(id: Long, userDTO: UserDTO): UserDTO {
        val existingUser = userRepository.findById(id)
            .orElseThrow { RuntimeException("Usuário não encontrado") }

        val userWithEmail = userRepository.findByEmail(userDTO.email)
        if (userWithEmail != null && userWithEmail.id != id) {
            throw RuntimeException("Email já está em uso")
        }

        existingUser.email = userDTO.email
        existingUser.password = userDTO.password

        val savedUser = userRepository.update(existingUser)

        return toDTO(savedUser)
    }

    fun delete(id: Long) {
        if (!userRepository.existsById(id)) {
            throw RuntimeException("Usuário não encontrado")
        }

        userRepository.deleteById(id)
    }

    private fun toDTO(user: User): UserDTO {
        return UserDTO(
            id = user.id,
            email = user.email,
            password = user.password
        )
    }
}