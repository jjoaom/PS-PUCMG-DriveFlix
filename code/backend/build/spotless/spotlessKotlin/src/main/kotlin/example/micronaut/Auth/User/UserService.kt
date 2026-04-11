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