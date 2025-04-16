package com.example.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document("projects")
data class Project(
    @Id val id: String? = null,
    val name: String,
    val description: String? = null,
    val createdAt: LocalDateTime = LocalDateTime.now()
)