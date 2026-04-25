package example.micronaut.autentificacao.car

import example.micronaut.autentificacao.agente.AgenteRepository
import jakarta.inject.Singleton

@Singleton
class CarService(
    private val carRepository: CarRepository,
    private val agenteRepository: AgenteRepository
) {
    fun listarTodos(): List<CarDTO> {
        return carRepository.findAll().map { car ->
            CarDTO(
                id = car.id,
                marca = car.marca,
                modelo = car.modelo,
                placa = car.placa,
                status = car.status,
                imagemUrl = car.imagemUrl,
                preco = car.preco,
                agentId = car.agente?.id ?: throw RuntimeException("Carro sem agente")
            )
        }
    }

    fun salvar(dto: CarDTO): Car {
        val agente = agenteRepository.findById(dto.agentId)
            .orElseThrow { RuntimeException("Agente não encontrado") }

        val car = Car(
            marca = dto.marca,
            modelo = dto.modelo,
            placa = dto.placa,
            status = dto.status,
            preco = dto.preco,
            imagemUrl = dto.imagemUrl,
            agente = agente
        )

        return carRepository.save(car)
    }

    fun listarPorAgente(agentId: Long): List<CarDTO> {
        return carRepository.findByAgenteId(agentId).map { car ->
            CarDTO(
                id = car.id,
                marca = car.marca,
                modelo = car.modelo,
                placa = car.placa,
                status = car.status,
                imagemUrl = car.imagemUrl,
                preco = car.preco,
                agentId = car.agente?.id ?: throw RuntimeException("Carro sem agente")
            )
        }
    }
}