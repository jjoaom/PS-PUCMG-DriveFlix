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

        val user = User(
            email = userDTO.email,
            password = userDTO.password
        )

        val savedUser = userRepository.save(user)

        return UserDTO(
            id = savedUser.id,
            email = savedUser.email,
            password = savedUser.password
        )
    }

    fun findAll(): List<UserDTO> {
        return userRepository.findAll().map { user ->
            UserDTO(
                id = user.id,
                email = user.email,
                password = user.password
            )
        }
    }

    fun findById(id: Long): UserDTO {
        val user = userRepository.findById(id)
            .orElseThrow { RuntimeException("Usuário não encontrado") }

        return UserDTO(
            id = user.id,
            email = user.email,
            password = user.password
        )
    }

    fun delete(id: Long) {
        if (!userRepository.existsById(id)) {
            throw RuntimeException("Usuário não encontrado")
        }
        userRepository.deleteById(id)
    }

    fun update(id: Long, userDTO: UserDTO): UserDTO {
        val existingUser = userRepository.findById(id)
            .orElseThrow { RuntimeException("Usuário não encontrado") }

        val updatedUser = existingUser.copy(
            email = userDTO.email,
            password = userDTO.password
        )

        val savedUser = userRepository.update(updatedUser)

        return UserDTO(
            id = savedUser.id,
            email = savedUser.email,
            password = savedUser.password
        )
    }
}