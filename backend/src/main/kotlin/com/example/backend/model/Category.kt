package com.example.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document("categories")
data class Category(
    @Id val id: String? = null,
    val name: String,
    val projectId: String,
    val createdAt: LocalDateTime = LocalDateTime.now()
)