package example.micronaut.autentificacao.car

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller("/cars")
class CarController(
    private val carService: CarService
) {
    @Get
    fun listarTodos(): List<Car> = carService.listarTodos()
}