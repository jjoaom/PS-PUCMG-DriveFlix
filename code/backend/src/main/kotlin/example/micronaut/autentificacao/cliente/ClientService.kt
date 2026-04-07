package example.micronaut.autentificacao.cliente

import example.micronaut.autentificacao.usuario.User
import example.micronaut.autentificacao.usuario.UserRepository
import jakarta.inject.Singleton

@Singleton
class ClientService(
    private val clientRepository: ClientRepository,
    private val userRepository: UserRepository
) {

    fun register(clientDTO: ClientDTO): ClientDTO {

        if (userRepository.existsByEmail(clientDTO.email)) {
            throw RuntimeException("Email já cadastrado")
        }

        if (clientRepository.existsByCpf(clientDTO.cpf)) {
            throw RuntimeException("CPF já cadastrado")
        }

        val savedUser = userRepository.save(
            User(
                email = clientDTO.email,
                password = clientDTO.password
            )
        )

        val savedClient = clientRepository.save(
            Client(
                name = clientDTO.name,
                cpf = clientDTO.cpf,
                rg = clientDTO.rg,
                phone = clientDTO.phone,
                address = clientDTO.address,
                user = savedUser
            )
        )

        return ClientDTO(
            id = savedClient.id,
            email = savedUser.email,
            password = savedUser.password,
            name = savedClient.name,
            cpf = savedClient.cpf,
            rg = savedClient.rg,
            phone = savedClient.phone,
            address = savedClient.address
        )
    }

    fun findAll(): List<ClientDTO> {
        return clientRepository.findAll().map { client ->
            ClientDTO(
                id = client.id,
                email = client.user.email,
                password = client.user.password,
                name = client.name,
                cpf = client.cpf,
                rg = client.rg,
                phone = client.phone,
                address = client.address
            )
        }
    }

    fun findById(id: Long): ClientDTO {
        val client = clientRepository.findById(id)
            .orElseThrow { RuntimeException("Cliente não encontrado") }

        return ClientDTO(
            id = client.id,
            email = client.user.email,
            password = client.user.password,
            name = client.name,
            cpf = client.cpf,
            rg = client.rg,
            phone = client.phone,
            address = client.address
        )
    }

    fun findByUserId(userId: Long): ClientDTO {
        val client = clientRepository.findByUserId(userId)
            .orElseThrow { RuntimeException("Cliente não encontrado para este usuário") }

        return ClientDTO(
            id = client.id,
            email = client.user.email,
            password = client.user.password,
            name = client.name,
            cpf = client.cpf,
            rg = client.rg,
            phone = client.phone,
            address = client.address
        )
    }

    fun update(id: Long, clientDTO: ClientDTO): ClientDTO {

        val existingClient = clientRepository.findById(id)
            .orElseThrow { RuntimeException("Cliente não encontrado") }

        val existingUser = existingClient.user

        val userWithEmail = userRepository.findByEmail(clientDTO.email)
        if (userWithEmail.isPresent && userWithEmail.get().id != existingUser.id) {
            throw RuntimeException("Email já está em uso")
        }

        val updatedUser = existingUser.copy(
            email = clientDTO.email,
            password = clientDTO.password
        )

        val savedUser = userRepository.update(updatedUser)

        val clientWithCpf = clientRepository.findByCpf(clientDTO.cpf)
        if (clientWithCpf.isPresent && clientWithCpf.get().id != id) {
            throw RuntimeException("CPF já está em uso")
        }

        val updatedClient = existingClient.copy(
            name = clientDTO.name,
            cpf = clientDTO.cpf,
            rg = clientDTO.rg,
            phone = clientDTO.phone,
            address = clientDTO.address,
            user = savedUser
        )

        val savedClient = clientRepository.update(updatedClient)

        return ClientDTO(
            id = savedClient.id,
            email = savedUser.email,
            password = savedUser.password,
            name = savedClient.name,
            cpf = savedClient.cpf,
            rg = savedClient.rg,
            phone = savedClient.phone,
            address = savedClient.address
        )
    }

    fun delete(id: Long) {
        val client = clientRepository.findById(id)
            .orElseThrow { RuntimeException("Cliente não encontrado") }

        clientRepository.deleteById(id)
        userRepository.deleteById(client.user.id!!)
    }
}