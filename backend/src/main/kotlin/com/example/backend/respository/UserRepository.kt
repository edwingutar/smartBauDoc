package com.example.backend.repository

import com.example.backend.model.User
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : MongoRepository<User, String> {
    // Ändere den Rückgabetyp zu List<User>
    fun findByEmail(email: String): List<User>
}