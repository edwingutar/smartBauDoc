package com.example.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document("projects")
data class Project(
    @Id val id: String? = null,
    val title: String,
    val task: String,
    val pn: String,
    val address: String,
    val details: String,
    val contact: String,
    val deadline: String
)