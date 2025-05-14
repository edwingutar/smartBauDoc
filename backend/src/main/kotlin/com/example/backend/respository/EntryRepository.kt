package com.example.backend.repository

import com.example.backend.model.Entry
import org.springframework.data.mongodb.repository.MongoRepository

interface EntryRepository : MongoRepository<Entry, String> {
    fun findByProjectIdAndCategoryId(projectId: String, categoryId: String): List<Entry>
}