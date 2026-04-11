/*
 * Copyright 2026 original authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package example.micronaut.autentificacao.usuario

import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*

@Controller("/users")
class UserController(
    private val userService: UserService
) {

    @Post
    fun create(@Body userDTO: UserDTO): HttpResponse<Any> {
        return try {
            HttpResponse.created(userService.create(userDTO))
        } catch (e: RuntimeException) {
            HttpResponse.badRequest(mapOf("message" to e.message))
        }
    }

    @Get
    fun findAll(): List<UserDTO> {
        return userService.findAll()
    }

    @Get("/{id}")
    fun findById(id: Long): HttpResponse<Any> {
        return try {
            HttpResponse.ok(userService.findById(id))
        } catch (e: RuntimeException) {
            HttpResponse.notFound(mapOf("message" to e.message))
        }
    }

    @Put("/{id}")
    fun update(@PathVariable id: Long, @Body userDTO: UserDTO): HttpResponse<Any> {
        return try {
            HttpResponse.ok(userService.update(id, userDTO))
        } catch (e: RuntimeException) {
            HttpResponse.badRequest(mapOf("message" to e.message))
        }
    }

    @Delete("/{id}")
    fun delete(@PathVariable id: Long): HttpResponse<Any> {
        return try {
            userService.delete(id)
            HttpResponse.ok(mapOf("message" to "Usuário deletado com sucesso"))
        } catch (e: RuntimeException) {
            HttpResponse.notFound(mapOf("message" to e.message))
        }
    }
}