package example.micronaut.autentificacao.car

import jakarta.inject.Singleton

@Singleton
class CarService(
    private val carRepository: CarRepository
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
                preco = car.preco
            )
        }
    }
}