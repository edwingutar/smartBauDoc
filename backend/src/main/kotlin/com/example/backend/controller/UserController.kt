/*
package com.example.backend.controller

import com.example.backend.dto.LoginRequest
import com.example.backend.model.User
import com.example.backend.respository.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class UserController(val userRepository: UserRepository) {

    @PostMapping("/register")
    fun registerUser(@RequestBody user: User): ResponseEntity<User> {
        val saved = userRepository.save(user)
        return ResponseEntity.ok(saved)
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<Map<String, String>> {
        try {
            val users = userRepository.findByEmail(request.email)
            
            // Das ist jetzt korrekt, da users eine Liste ist
            val validUser = users.firstOrNull { it.password == request.password }
            
            return if (validUser != null) {
                ResponseEntity.ok(mapOf("message" to "Login erfolgreich"))
            } else {
                ResponseEntity.status(401).body(mapOf("message" to "Ungültige Anmeldedaten"))
            }
        } catch (e: Exception) {
            e.printStackTrace()
            return ResponseEntity.status(500).body(mapOf("message" to "Serverfehler: ${e.message}"))
        }
    }
}
 */