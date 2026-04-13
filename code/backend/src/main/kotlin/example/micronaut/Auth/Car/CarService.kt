package example.micronaut.autentificacao.car

import jakarta.inject.Singleton

@Singleton
class CarService(
    private val carRepository: CarRepository
) {
    fun listarTodos(): List<Car> = carRepository.findAll().toList()
}