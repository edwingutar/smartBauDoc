package com.example.backend.repository

import com.example.backend.model.Category
import org.springframework.data.mongodb.repository.MongoRepository

interface CategoryRepository : MongoRepository<Category, String> {
    fun findByProjectId(projectId: String): List<Category>
}