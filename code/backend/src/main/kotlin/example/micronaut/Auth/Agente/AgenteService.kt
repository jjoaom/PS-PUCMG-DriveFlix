package example.micronaut.autentificacao.agente

import example.micronaut.autentificacao.usuario.User
import example.micronaut.autentificacao.usuario.UserRepository
import jakarta.inject.Singleton
import jakarta.transaction.Transactional

@Singleton
open class AgenteService(
    private val agenteRepository: AgenteRepository,
    private val userRepository: UserRepository
) {

    @Transactional
    open fun criar(dto: AgenteDTO): Agente {
        if (userRepository.existsByEmail(dto.email)) {
            throw RuntimeException("Email já cadastrado")
        }

        if (agenteRepository.existsByCnpj(dto.cnpj)) {
            throw RuntimeException("CNPJ já cadastrado")
        }

        val userSalvo = userRepository.save(
            User(
                email = dto.email,
                password = dto.password
            )
        )

        val agente = Agente(
            id = userSalvo.id,
            tipo = dto.tipo,
            cnpj = dto.cnpj,
            razaoSocial = dto.razaoSocial,
            user = userSalvo
        )

        return agenteRepository.save(agente)
    }

    fun listar(): List<Agente> {
        return agenteRepository.findAll().toList()
    }

    fun buscarPorId(id: Long): Agente {
        return agenteRepository.findById(id)
            .orElseThrow { RuntimeException("Agente não encontrado") }
    }

    fun buscarPorCnpj(cnpj: String): Agente {
        return agenteRepository.findByCnpj(cnpj)
            .orElseThrow { RuntimeException("Agente não encontrado") }
    }

    @Transactional
    open fun atualizar(id: Long, dto: AgenteDTO): Agente {
        val agenteExistente = buscarPorId(id)
        val userExistente = agenteExistente.user

        userExistente.email = dto.email
        userExistente.password = dto.password

        userRepository.update(userExistente)

        agenteExistente.tipo = dto.tipo
        agenteExistente.cnpj = dto.cnpj
        agenteExistente.razaoSocial = dto.razaoSocial

        return agenteRepository.update(agenteExistente)
    }

    @Transactional
    open fun deletar(id: Long) {
        val agente = buscarPorId(id)
        val userId = agente.user.id

        agenteRepository.deleteById(id)

        if (userId != null) {
            userRepository.deleteById(userId)
        }
    }
}