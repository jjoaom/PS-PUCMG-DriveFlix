package example.micronaut.autentificacao.car

import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository

@Repository
interface CarRepository : CrudRepository<Car, Long>