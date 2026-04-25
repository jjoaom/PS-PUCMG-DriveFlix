package example.micronaut.autentificacao.cliente

import example.micronaut.autentificacao.usuario.User
import example.micronaut.autentificacao.usuario.UserRepository
import jakarta.transaction.Transactional
import jakarta.inject.Singleton

@Singleton
open class ClientService(
    private val clientRepository: ClientRepository,
    private val userRepository: UserRepository
) {

    private val clientNotFound = "Cliente não encontrado"

    @Transactional
    open fun register(dto: ClientDTO): Client {
        if (userRepository.existsByEmail(dto.email)) {
            throw RuntimeException("Email já cadastrado")
        }

        if (clientRepository.existsByCpf(dto.cpf)) {
            throw RuntimeException("CPF já cadastrado")
        }

        val userSalvo = userRepository.save(
            User(
                email = dto.email,
                password = dto.password
            )
        )

        val client = Client(
            id = userSalvo.id,
            name = dto.name,
            cpf = dto.cpf,
            rg = dto.rg,
            phone = dto.phone,
            address = dto.address,
            user = userSalvo
        )

        return clientRepository.save(client)
    }

    fun findAll(): List<ClientDTO> {
        return clientRepository.findAll().map { toDTO(it) }
    }

    fun findById(id: Long): ClientDTO {
        val client = clientRepository.findById(id)
            .orElseThrow { RuntimeException(clientNotFound) }

        return toDTO(client)
    }

    fun findByUserId(userId: Long): ClientDTO {
        val client = clientRepository.findById(userId)
            .orElseThrow { RuntimeException("Cliente não encontrado para este usuário") }

        return toDTO(client)
    }

    fun update(id: Long, clientDTO: ClientDTO): ClientDTO {
        val existingClient = clientRepository.findById(id)
            .orElseThrow { RuntimeException(clientNotFound) }

        val existingUser = existingClient.user

        val userWithEmail = userRepository.findByEmail(clientDTO.email)
        if (userWithEmail != null && userWithEmail.id != existingUser.id) {
            throw RuntimeException("Email já está em uso")
        }

        val clientWithCpf = clientRepository.findByCpf(clientDTO.cpf)
        if (clientWithCpf.isPresent && clientWithCpf.get().id != id) {
            throw RuntimeException("CPF já está em uso")
        }

        existingUser.email = clientDTO.email
        existingUser.password = clientDTO.password

        val savedUser = userRepository.update(existingUser)

        existingClient.name = clientDTO.name
        existingClient.cpf = clientDTO.cpf
        existingClient.rg = clientDTO.rg
        existingClient.phone = clientDTO.phone
        existingClient.address = clientDTO.address
        existingClient.renda = clientDTO.renda
        existingClient.user = savedUser

        val savedClient = clientRepository.update(existingClient)

        return toDTO(savedClient)
    }

    fun delete(id: Long) {
        val client = clientRepository.findById(id)
            .orElseThrow { RuntimeException(clientNotFound) }

        clientRepository.deleteById(id)

        client.user.id?.let { userId ->
            userRepository.deleteById(userId)
        }
    }

    private fun toDTO(client: Client): ClientDTO {
        return ClientDTO(
            id = client.id,
            email = client.user.email,
            password = client.user.password,
            name = client.name,
            cpf = client.cpf,
            rg = client.rg,
            phone = client.phone,
            address = client.address,
            renda = client.renda
        )
    }
}